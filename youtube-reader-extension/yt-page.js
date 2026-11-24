// Injected into a temporary youtube.com tab by sync.js. It runs in the extension's
// isolated world, not the page's: the page's own scripts (or other extensions injecting
// into it) can neither see these functions nor fake what they return. Requests made from
// here still have the page's origin and carry the user's YouTube session (cookies; the
// SAPISID cookie for the auth header is readable through document.cookie as well).
// Every method returns a plain object: a result, or { error: "notLoggedIn" | message }.

window.__ytReader = (() => {
  // Cut a balanced {...} JSON object out of text starting at index `from`
  function sliceJson(text, from) {
    const start = text.indexOf("{", from);
    if (start < 0) return null;
    let depth = 0;
    let inStr = false;
    for (let i = start; i < text.length; i++) {
      const c = text[i];
      if (inStr) {
        if (c === "\\") i++;
        else if (c === '"') inStr = false;
      } else if (c === '"') inStr = true;
      else if (c === "{") depth++;
      else if (c === "}" && --depth === 0) return text.slice(start, i + 1);
    }
    return null;
  }

  function jsonAfter(text, marker) {
    const i = text.indexOf(marker);
    if (i < 0) return null;
    try {
      return JSON.parse(sliceJson(text, i + marker.length));
    } catch {
      return null;
    }
  }

  function textOf(t) {
    if (!t) return "";
    if (typeof t === "string") return t;
    if (t.simpleText) return t.simpleText;
    if (t.runs) return t.runs.map((r) => r.text).join("");
    if (t.content) return t.content;
    return "";
  }

  function bestThumb(thumb) {
    const list = thumb?.thumbnails || [];
    let url = list.length ? list[list.length - 1].url : "";
    if (url.startsWith("//")) url = "https:" + url;
    return url;
  }

  // Depth-first walk over every object in a JSON tree
  function walk(node, visit) {
    const stack = [node];
    while (stack.length) {
      const n = stack.pop();
      if (!n || typeof n !== "object") continue;
      visit(n);
      for (const k in n) {
        const v = n[k];
        if (v && typeof v === "object") stack.push(v);
      }
    }
  }

  // Fetch /feed/channels and read the InnerTube settings and initial data out of it
  async function loadPage() {
    // Signed out, this page redirects to the Google sign-in page
    const resp = await fetch("/feed/channels", { credentials: "include", redirect: "manual" });
    if (resp.type === "opaqueredirect") return { cfg: { loggedIn: false } };
    const html = await resp.text();
    const loggedIn = (html.match(/"LOGGED_IN"\s*:\s*(true|false)/) || [])[1];
    const cfg = {
      loggedIn: loggedIn !== "false",
      apiKey: (html.match(/"INNERTUBE_API_KEY"\s*:\s*"([^"]+)"/) || [])[1] || "",
      context: jsonAfter(html, '"INNERTUBE_CONTEXT":'),
      sessionIndex: (html.match(/"SESSION_INDEX"\s*:\s*"?(\d+)/) || [])[1] || "0",
      delegatedId: (html.match(/"DELEGATED_SESSION_ID"\s*:\s*"([^"]+)"/) || [])[1] || "",
    };
    const initialData = jsonAfter(html, "var ytInitialData = ") || jsonAfter(html, 'window["ytInitialData"] = ');
    return { cfg, initialData };
  }

  // Authenticated InnerTube requests need a SAPISIDHASH header computed from the SAPISID
  // cookie, the way YouTube's own scripts do.
  async function authHeaders(cfg) {
    const cookies = Object.fromEntries(
      document.cookie.split(/;\s*/).map((c) => {
        const i = c.indexOf("=");
        return [c.slice(0, i), c.slice(i + 1)];
      })
    );
    const sapisid = cookies.SAPISID || cookies["__Secure-3PAPISID"];
    const headers = {
      "Content-Type": "application/json",
      "X-Origin": location.origin,
      "X-Goog-AuthUser": cfg.sessionIndex,
      "X-Youtube-Client-Name": "1",
      "X-Youtube-Client-Version": cfg.context.client?.clientVersion || "",
    };
    if (cfg.delegatedId) headers["X-Goog-PageId"] = cfg.delegatedId;
    if (sapisid) {
      const ts = Math.floor(Date.now() / 1000);
      const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(`${ts} ${sapisid} ${location.origin}`));
      const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
      headers.Authorization = `SAPISIDHASH ${ts}_${hex}`;
    }
    return headers;
  }

  async function innertube(cfg, endpoint, body) {
    const url = `/youtubei/v1/${endpoint}?prettyPrint=false${cfg.apiKey ? `&key=${cfg.apiKey}` : ""}`;
    const resp = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: await authHeaders(cfg),
      body: JSON.stringify({ context: cfg.context, ...body }),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return resp.json();
  }

  async function listSubscriptions() {
    const { cfg, initialData } = await loadPage();
    if (!cfg.loggedIn) return { error: "notLoggedIn" };
    if (!initialData || !cfg.context) return { error: "Could not read the YouTube page" };

    const found = new Map();
    const collect = (data) => {
      const tokens = [];
      walk(data, (n) => {
        const r = n.channelRenderer || n.gridChannelRenderer;
        if (r?.channelId && !found.has(r.channelId)) {
          found.set(r.channelId, { id: r.channelId, title: textOf(r.title), thumbnail: bestThumb(r.thumbnail) });
        }
        const token = n.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
        if (token) tokens.push(token);
      });
      return tokens;
    };

    // The page shows the first batch; the rest comes through continuation requests
    const queue = collect(initialData);
    const seenTokens = new Set();
    for (let page = 0; queue.length && page < 200; page++) {
      const token = queue.shift();
      if (seenTokens.has(token)) continue;
      seenTokens.add(token);
      queue.push(...collect(await innertube(cfg, "browse", { continuation: token })));
    }

    // Fallback: the subscriptions section of the sidebar guide
    if (found.size === 0) {
      const guide = await innertube(cfg, "guide", {});
      walk(guide, (n) => {
        if (!n.guideSubscriptionsSectionRenderer) return;
        walk(n.guideSubscriptionsSectionRenderer, (m) => {
          const e = m.guideEntryRenderer;
          const id = e?.navigationEndpoint?.browseEndpoint?.browseId;
          if (id && /^UC[\w-]{22}$/.test(id) && !found.has(id)) {
            found.set(id, { id, title: textOf(e.formattedTitle), thumbnail: bestThumb(e.thumbnail) });
          }
        });
      });
    }
    return { channels: [...found.values()] };
  }

  // The same request YouTube's own "Unsubscribe" button sends
  async function unsubscribe(channelId) {
    if (!/^UC[\w-]{22}$/.test(channelId)) return { error: "Invalid channel id" };
    const { cfg } = await loadPage();
    if (!cfg.loggedIn) return { error: "notLoggedIn" };
    if (!cfg.context) return { error: "Could not read the YouTube page" };
    const res = await innertube(cfg, "subscription/unsubscribe", { channelIds: [channelId], params: "CgIIAhgA" });
    // The response tells the button its new state; make sure it says "not subscribed"
    let state = null;
    walk(res, (n) => {
      const a = n.updateSubscribeButtonAction;
      if (a && typeof a.subscribed === "boolean" && (!a.channelId || a.channelId === channelId)) state = a.subscribed;
    });
    if (state === true) return { error: "YouTube reported the channel as still subscribed" };
    return { ok: true, confirmed: state === false };
  }

  // A thrown error would reach the extension only as "no result"; return it instead (B10)
  const safe = (fn) => async (...args) => {
    try {
      return await fn(...args);
    } catch (e) {
      return { error: e?.message || String(e) };
    }
  };
  return { listSubscriptions: safe(listSubscriptions), unsubscribe: safe(unsubscribe) };
})();
