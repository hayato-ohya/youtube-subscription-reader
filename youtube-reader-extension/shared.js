// Code shared by the reader page and the background service worker (importScripts).
// Nothing here may use the DOM: the service worker has none.

const FEED_FETCH_CONCURRENCY = 6;
const FEED_TIMEOUT_MS = 15000;
const MAX_KEPT_UNWATCHED_PER_CHANNEL = 60;

// ===== YouTube channel feed =====
function channelFeedUrl(channelId) {
  return `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
}

function decodeXmlEntities(s) {
  return (s || "").replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (m, e) => {
    const k = e.toLowerCase();
    if (k === "amp") return "&";
    if (k === "lt") return "<";
    if (k === "gt") return ">";
    if (k === "quot") return '"';
    if (k === "apos") return "'";
    const code = k.startsWith("#x") ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10);
    try {
      return String.fromCodePoint(code);
    } catch {
      return m;
    }
  });
}

function xmlTag(block, tag) {
  const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  return m ? decodeXmlEntities(m[1]).trim() : "";
}

function xmlAttr(block, tag, attr) {
  const m = block.match(new RegExp(`<${tag}\\b[^>]*\\b${attr}="([^"]*)"`));
  return m ? decodeXmlEntities(m[1]) : "";
}

// Parse the Atom feed YouTube serves at /feeds/videos.xml. The format is fixed and
// machine-generated, so a regex parser is enough (and works in the service worker,
// which has no DOMParser).
function parseYouTubeFeed(xml) {
  if (!/<feed\b/.test(xml)) throw new Error("Not a YouTube feed");
  const firstEntry = xml.indexOf("<entry>");
  const head = firstEntry >= 0 ? xml.slice(0, firstEntry) : xml;
  const result = { title: xmlTag(head, "title"), videos: [] };
  for (const block of xml.split("<entry>").slice(1)) {
    const id = xmlTag(block, "yt:videoId");
    if (!id) continue;
    const link = xmlAttr(block, "link", "href") || `https://www.youtube.com/watch?v=${id}`;
    const views = parseInt(xmlAttr(block, "media:statistics", "views"), 10);
    result.videos.push({
      id,
      title: xmlTag(block, "title"),
      link,
      published: Date.parse(xmlTag(block, "published")) || null,
      isShort: link.includes("/shorts/"),
      views: isNaN(views) ? null : views,
    });
  }
  return result;
}

// Fetch and parse one channel's feed. YouTube sometimes answers a burst of feed requests
// with a 404 / 5xx that succeeds a moment later, so those are retried once.
async function fetchChannelFeed(channelId) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt) await new Promise((r) => setTimeout(r, 1500));
    try {
      const resp = await fetch(channelFeedUrl(channelId), {
        cache: "no-cache",
        credentials: "omit",
        signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return parseYouTubeFeed(await resp.text());
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}

// Run fn over items with a fixed number of parallel workers. Stops early when
// shouldStop() returns true.
async function runPool(items, concurrency, fn, shouldStop = () => false) {
  let next = 0;
  async function worker() {
    while (!shouldStop() && next < items.length) {
      const item = items[next++];
      await fn(item);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
}

// ===== Merging =====
// The feed only has a channel's newest 15 uploads. Videos that drop out of it are kept
// while they are in "Watch later" (always) or unwatched (newest N only, so storage can't
// grow without bound).
function mergeVideos(existing, incoming, isWatched, isLater) {
  const now = Date.now();
  const prevById = new Map((existing || []).map((v) => [v.id, v]));
  const merged = incoming.map((v) => {
    const prev = prevById.get(v.id);
    return { ...pickDetails(prev), ...v, firstSeen: prev?.firstSeen || now };
  });
  const incomingIds = new Set(incoming.map((v) => v.id));
  const gone = (existing || []).filter((v) => !incomingIds.has(v.id));
  const later = gone.filter((v) => isLater(v.id));
  const unwatched = gone
    .filter((v) => !isLater(v.id) && !isWatched(v.id))
    .sort((a, b) => videoTime(b) - videoTime(a))
    .slice(0, MAX_KEPT_UNWATCHED_PER_CHANNEL);
  return [...merged, ...later, ...unwatched];
}

// ===== Video details (length, live) =====
// The feed has no video length. YouTube's player endpoint has it in ~10 KB per video.
// It rejects requests that carry an extension's Origin header, so background.js
// registers a rule that drops that header from this extension's requests to it.
const PLAYER_URL = "https://www.youtube.com/youtubei/v1/player?prettyPrint=false";
const DETAILS_CONCURRENCY = 4;
const DETAIL_KEYS = ["duration", "live", "upcoming", "detailsAt", "detailsFailedAt"];

// The player endpoint wants a current web client version and stops answering requests
// that name one that is too old. The version is read from YouTube's own pages (on a sync,
// or from the home page once it is a week old) and kept in storage; the constant is only
// a last resort for when none could be read.
const FALLBACK_CLIENT_VERSION = "2.20251120.01.00";
const CLIENT_VERSION_MAX_AGE_MS = 7 * 86400000;
const CLIENT_VERSION_RE = /^\d+\.\d{8}\.\d+\.\d+$/;
let clientVersionPromise = null;
let clientVersionLookedUpAt = 0;
let clientVersionForced = false;

async function saveClientVersion(version) {
  if (!CLIENT_VERSION_RE.test(version || "")) return;
  clientVersionPromise = Promise.resolve(version);
  clientVersionLookedUpAt = Date.now();
  await chrome.storage.local.set({ ytClientVersion: { version, at: Date.now() } });
}

async function scrapeClientVersion() {
  const resp = await fetch("https://www.youtube.com/", {
    credentials: "omit",
    cache: "no-cache",
    signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const html = await resp.text();
  const m = html.match(/"INNERTUBE_CLIENT_VERSION"\s*:\s*"([^"]+)"/) || html.match(/"clientVersion"\s*:\s*"(2\.[^"]+)"/);
  if (!m || !CLIENT_VERSION_RE.test(m[1])) throw new Error("No client version");
  return m[1];
}

// Concurrent callers share one lookup. force (used after the endpoint refused a request)
// skips a stored value older than an hour; parallel forced calls share one lookup too.
function getPlayerClientVersion(force = false) {
  // The reader page stays open for days, so the in-memory answer is rechecked hourly
  const fresh = clientVersionPromise && Date.now() - clientVersionLookedUpAt < 3600000;
  if (fresh && (!force || clientVersionForced)) return clientVersionPromise;
  clientVersionLookedUpAt = Date.now();
  clientVersionForced = force;
  clientVersionPromise = (async () => {
    const { ytClientVersion: stored } = await chrome.storage.local.get("ytClientVersion");
    const age = stored ? Date.now() - stored.at : Infinity;
    const valid = stored && CLIENT_VERSION_RE.test(stored.version || "");
    if (valid && age < (force ? 3600000 : CLIENT_VERSION_MAX_AGE_MS)) return stored.version;
    try {
      const version = await scrapeClientVersion();
      await chrome.storage.local.set({ ytClientVersion: { version, at: Date.now() } });
      return version;
    } catch (e) {
      console.warn("Could not read YouTube's client version", e);
      // Try again on a later call rather than for every video now
      if (stored) await chrome.storage.local.set({ ytClientVersion: { ...stored, at: Date.now() - CLIENT_VERSION_MAX_AGE_MS + 3600000 } });
      return valid ? stored.version : FALLBACK_CLIENT_VERSION;
    }
  })();
  // A failed lookup must not stick for the life of the page
  clientVersionPromise.catch(() => (clientVersionPromise = null));
  return clientVersionPromise;
}

function pickDetails(v) {
  const out = {};
  if (v) for (const k of DETAIL_KEYS) if (v[k] !== undefined) out[k] = v[k];
  return out;
}

async function requestPlayer(id, clientVersion) {
  return fetch(PLAYER_URL, {
    method: "POST",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      context: { client: { clientName: "WEB", clientVersion, hl: "en" } },
      videoId: id,
    }),
    signal: AbortSignal.timeout(10000),
  });
}

async function fetchVideoDetails(id) {
  const version = await getPlayerClientVersion();
  let resp = await requestPlayer(id, version);
  // A 400/403 usually means the client version went stale: look it up again and retry once
  if (resp.status === 400 || resp.status === 403) {
    const fresh = await getPlayerClientVersion(true);
    if (fresh !== version) resp = await requestPlayer(id, fresh);
  }
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const vd = (await resp.json()).videoDetails;
  if (!vd) throw new Error("No video details");
  return { duration: parseInt(vd.lengthSeconds, 10) || 0, live: !!vd.isLive, upcoming: !!vd.isUpcoming };
}

// Whether a video's details should be (re)fetched. Lengths never change, but a live
// stream or an upcoming premiere becomes a normal video later, so those are rechecked.
function needsDetails(v, now = Date.now()) {
  if (v.isShort) return false;
  if (v.detailsFailedAt && now - v.detailsFailedAt < 3600000) return false;
  if (!v.detailsAt) return true;
  return (v.live || v.upcoming) && now - v.detailsAt > 30 * 60000;
}

function applyDetails(v, d) {
  if (d.error) {
    v.detailsFailedAt = Date.now();
    return;
  }
  Object.assign(v, d, { detailsAt: Date.now() });
  delete v.detailsFailedAt;
}

function formatDuration(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = String(sec % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

// Apply a fetch result to a channel object in place
function applyFeedResult(channel, result, isWatched, isLater) {
  // A feed that suddenly lists nothing is almost always a glitch on YouTube's side; merging
  // it would drop every watched video from the channel (B1).
  if (!result.error && !result.videos.length && (channel.videos || []).length) {
    result = { error: "Empty feed" };
  }
  if (result.error) {
    channel.error = result.error;
    return;
  }
  channel.videos = mergeVideos(channel.videos, result.videos, isWatched, isLater);
  if (!channel.title && result.title) channel.title = result.title;
  channel.lastUpdated = Date.now();
  delete channel.error;
}

function videoTime(v) {
  return v.published || v.firstSeen || 0;
}

// ===== Filtering / counting =====
// A video is "new" (counted, shown under All videos) if it is within the age window,
// is not a Short when Shorts are hidden, and has not been watched.
function isWithinAge(video, maxAgeDays, now = Date.now()) {
  return !maxAgeDays || now - videoTime(video) <= maxAgeDays * 86400000;
}

function countUnwatched(channel, opts) {
  let n = 0;
  const now = Date.now();
  for (const v of channel.videos || []) {
    if (opts.watched.has(v.id)) continue;
    if (opts.hideShorts && v.isShort) continue;
    if (!isWithinAge(v, opts.maxAgeDays, now)) continue;
    n++;
  }
  return n;
}

// ===== Watched state =====
// Stored as { videoId: time marked watched }. A watched id is kept for a long while after
// its video leaves storage: YouTube sometimes serves an older copy of a feed, and a video
// that comes back must not turn up as new again (B1). Older stores kept a plain array.
const WATCHED_RETENTION_MS = 180 * 86400000;

function toWatchedMap(raw) {
  if (Array.isArray(raw)) {
    const now = Date.now();
    return new Map(raw.map((id) => [id, now]));
  }
  return new Map(Object.entries(raw || {}));
}

function pruneWatched(watchedMap, channels, now = Date.now()) {
  const present = new Set();
  channels.forEach((c) => (c.videos || []).forEach((v) => present.add(v.id)));
  for (const [id, at] of watchedMap) {
    if (!present.has(id) && now - at > WATCHED_RETENTION_MS) watchedMap.delete(id);
  }
  return watchedMap;
}

const DEFAULT_SETTINGS = {
  darkMode: false,
  language: "ja",
  isCardView: true,
  hideWatched: true,
  hideShorts: false,
  markWatchedOnOpen: true,
  autoplayOnYouTube: true,
  markWatchedOnScroll: true,
  maxAgeDays: 30,
  autoRefreshMinutes: 30,
  backgroundRefresh: true,
  showBadge: true,
};

async function loadSettings() {
  const data = await chrome.storage.local.get("settings");
  const s = { ...DEFAULT_SETTINGS, ...(data.settings || {}) };
  // v2: "mark as watched on scroll" became the default, as in the RSS reader. Settings
  // saved before that hold the old default, so switch it on once.
  if ((s.version || 1) < 2) {
    s.markWatchedOnScroll = true;
    s.version = 2;
    if (data.settings) await chrome.storage.local.set({ settings: s });
  }
  return s;
}
