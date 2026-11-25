// Talking to YouTube with the user's signed-in session (subscription list, unsubscribe),
// and resolving a channel URL / handle to a channel id. Used by the reader page.
//
// There is no official API for this without OAuth setup, so a youtube.com tab is opened
// in the background, yt-page.js is injected into it (in the extension's isolated world:
// requests still carry the user's cookies and YouTube's own origin, but the page can't
// tamper with the code or its results), one of its methods is called, and the tab is
// closed.

const YT_PAGE_URL = "https://www.youtube.com/feed/channels";

async function runInYouTubeTab(method, args = []) {
  const tab = await chrome.tabs.create({ url: YT_PAGE_URL, active: false });
  try {
    await waitForTabComplete(tab.id, 30000);
    // Signed out, /feed/channels redirects to accounts.google.com (or to the consent page
    // in some regions). The url is only visible to us while the tab is on youtube.com.
    const loaded = await chrome.tabs.get(tab.id);
    if (!(loaded.url || "").startsWith("https://www.youtube.com/")) {
      throw Object.assign(new Error("notLoggedIn"), { code: "notLoggedIn" });
    }
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, world: "ISOLATED", files: ["yt-page.js"] });
    const [injection] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: "ISOLATED",
      func: (m, a) => window.__ytReader[m](...a),
      args: [method, args],
    });
    const res = injection?.result;
    if (!res) throw new Error("No result from YouTube page");
    if (res.error) throw Object.assign(new Error(res.error), { code: res.error });
    return res;
  } finally {
    chrome.tabs.remove(tab.id).catch(() => {});
  }
}

async function fetchSubscriptionsFromYouTube() {
  const res = await runInYouTubeTab("listSubscriptions");
  // The signed-in page carries YouTube's current web client version: keep it for the
  // player requests that fetch video lengths (see getPlayerClientVersion in shared.js).
  await saveClientVersion(res.clientVersion);
  return res.channels;
}

async function unsubscribeOnYouTube(channelId) {
  await runInYouTubeTab("unsubscribe", [channelId]);
}

function waitForTabComplete(tabId, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Timed out loading YouTube"));
    }, timeoutMs);
    const onUpdated = (id, info) => {
      if (id === tabId && info.status === "complete") {
        cleanup();
        resolve();
      }
    };
    const onRemoved = (id) => {
      if (id === tabId) {
        cleanup();
        reject(new Error("The YouTube tab was closed"));
      }
    };
    function cleanup() {
      clearTimeout(timer);
      chrome.tabs.onUpdated.removeListener(onUpdated);
      chrome.tabs.onRemoved.removeListener(onRemoved);
    }
    chrome.tabs.onUpdated.addListener(onUpdated);
    chrome.tabs.onRemoved.addListener(onRemoved);
    // It may already be complete
    chrome.tabs.get(tabId).then((t) => {
      if (t.status === "complete") {
        cleanup();
        resolve();
      }
    }, () => {});
  });
}


// ===== Resolving user input to a channel =====
const CHANNEL_ID_RE = /^UC[\w-]{22}$/;

// Accepts a channel id, a /channel/UC... URL, a feed URL, an @handle (with or without a
// URL), or a /c/ or /user/ URL. Returns { id, title, thumbnail }.
async function resolveChannel(input) {
  const s = input.trim();
  if (!s) throw new Error("empty");
  let m;
  if (CHANNEL_ID_RE.test(s)) return lookupChannelPage(`https://www.youtube.com/channel/${s}`, s);
  if ((m = s.match(/[?&]channel_id=(UC[\w-]{22})/))) return lookupChannelPage(`https://www.youtube.com/channel/${m[1]}`, m[1]);
  if ((m = s.match(/youtube\.com\/channel\/(UC[\w-]{22})/))) return lookupChannelPage(`https://www.youtube.com/channel/${m[1]}`, m[1]);
  if (/^@[^\s/]+$/.test(s)) return lookupChannelPage(`https://www.youtube.com/${s}`);
  if ((m = s.match(/^(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com(\/(?:@[^/?#]+|c\/[^/?#]+|user\/[^/?#]+))/))) {
    return lookupChannelPage(`https://www.youtube.com${m[1]}`);
  }
  // A video URL: look the channel up from the watch page
  if ((m = s.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/live\/|\/embed\/)([\w-]{11})/))) {
    return lookupChannelPage(`https://www.youtube.com/watch?v=${m[1]}`);
  }
  throw Object.assign(new Error("invalid"), { code: "invalid" });
}

// Read a channel (or watch) page for the channel id, name and avatar. When the id is
// already known, a failure here is not fatal: the feed has the name.
async function lookupChannelPage(url, knownId) {
  try {
    const resp = await fetch(url, { credentials: "omit", signal: AbortSignal.timeout(15000) });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const html = await resp.text();
    const pick = (re) => {
      const m = html.match(re);
      return m ? decodeXmlEntities(m[1]) : "";
    };
    const isWatch = url.includes("/watch?");
    const id = knownId ||
      (isWatch
        ? pick(/<meta itemprop="channelId" content="(UC[\w-]{22})"/) || pick(/"channelId":"(UC[\w-]{22})"/)
        : pick(/<meta itemprop="identifier" content="(UC[\w-]{22})"/) ||
          pick(/"externalId":"(UC[\w-]{22})"/) ||
          pick(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/));
    if (!id) throw Object.assign(new Error("notFound"), { code: "notFound" });
    if (isWatch) return lookupChannelPage(`https://www.youtube.com/channel/${id}`, id);
    return {
      id,
      title: pick(/<meta property="og:title" content="([^"]*)"/),
      // og:image is 900px; the sidebar needs a small one
      thumbnail: pick(/<meta property="og:image" content="([^"]*)"/).replace(/=s\d+-/, "=s88-"),
    };
  } catch (e) {
    if (knownId) return { id: knownId, title: "", thumbnail: "" };
    throw e;
  }
}

// ===== Import / export =====
// Google Takeout's subscriptions.csv ("Channel Id,Channel Url,Channel Title") or an OPML
// file of YouTube channel feeds (e.g. exported from an RSS reader).
function parseImportFile(text) {
  const out = new Map();
  const add = (id, title) => {
    if (CHANNEL_ID_RE.test(id) && !out.has(id)) out.set(id, { id, title: title || "", thumbnail: "" });
  };
  if (/<opml\b/i.test(text)) {
    const doc = new DOMParser().parseFromString(text, "text/xml");
    for (const o of doc.querySelectorAll("outline[xmlUrl], outline[xmlurl]")) {
      const url = o.getAttribute("xmlUrl") || o.getAttribute("xmlurl") || "";
      const m = url.match(/channel_id=(UC[\w-]{22})/);
      if (m) add(m[1], o.getAttribute("title") || o.getAttribute("text"));
    }
  } else {
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*"?(UC[\w-]{22})"?\s*,\s*"?[^,]*"?\s*,\s*(.*)$/);
      if (m) add(m[1], m[2].replace(/^"|"$/g, "").replace(/""/g, '"').trim());
    }
  }
  return [...out.values()];
}

function escapeXml(s) {
  return String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);
}

function buildOpml(channels, folders, title) {
  const outline = (c) =>
    `      <outline type="rss" text="${escapeXml(c.title)}" title="${escapeXml(c.title)}" xmlUrl="${escapeXml(
      channelFeedUrl(c.id)
    )}" htmlUrl="https://www.youtube.com/channel/${c.id}"/>`;
  const lines = [];
  for (const f of folders) {
    const inside = channels.filter((c) => c.folderId === f.id);
    if (!inside.length) continue;
    lines.push(`    <outline text="${escapeXml(f.name)}" title="${escapeXml(f.name)}">`);
    inside.forEach((c) => lines.push(outline(c)));
    lines.push("    </outline>");
  }
  const folderIds = new Set(folders.map((f) => f.id));
  channels.filter((c) => !c.folderId || !folderIds.has(c.folderId)).forEach((c) => lines.push(outline(c).slice(2)));
  return `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head><title>${escapeXml(title)}</title></head>
  <body>
${lines.join("\n")}
  </body>
</opml>
`;
}
