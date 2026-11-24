importScripts("shared.js"); // fetchChannelFeed, applyFeedResult, countUnwatched, ...

// Open the reader, or focus it if a tab already has it open: each reader tab keeps its
// own copy of the state, so a second tab would overwrite the first one's changes.
chrome.action.onClicked.addListener(async () => {
  const readerUrl = chrome.runtime.getURL("reader.html");
  try {
    const contexts = await chrome.runtime.getContexts({ contextTypes: ["TAB"] });
    const open = contexts.find((c) => c.tabId >= 0 && (c.documentUrl || "").startsWith(readerUrl));
    if (open) {
      await chrome.tabs.update(open.tabId, { active: true });
      await chrome.windows.update(open.windowId, { focused: true });
      return;
    }
  } catch (e) {
    // fall through and open a new tab
  }
  chrome.tabs.create({ url: readerUrl });
});

// ===== Alarm =====
// The service worker restarts often (every storage write wakes it), so only touch the
// alarm when it is missing or its period changed; re-creating it on every start would
// keep postponing it.
async function setupAlarm() {
  const s = await loadSettings();
  const wanted = s.backgroundRefresh && s.autoRefreshMinutes > 0 ? s.autoRefreshMinutes : 0;
  const existing = await chrome.alarms.get("updateChannels");
  if (!wanted) {
    if (existing) await chrome.alarms.clear("updateChannels");
    return;
  }
  if (existing && existing.periodInMinutes === wanted) return;
  await chrome.alarms.clear("updateChannels");
  chrome.alarms.create("updateChannels", { delayInMinutes: wanted, periodInMinutes: wanted });
}

setupAlarm();
updateBadge();
setupPlayerRule();

// Drop the Origin header from this extension's own requests to YouTube's player
// endpoint (see fetchVideoDetails in shared.js). Limited to requests this extension
// makes, so YouTube's pages are unaffected.
async function setupPlayerRule() {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        priority: 1,
        action: { type: "modifyHeaders", requestHeaders: [{ header: "origin", operation: "remove" }] },
        condition: {
          initiatorDomains: [chrome.runtime.id],
          requestDomains: ["www.youtube.com"],
          urlFilter: "/youtubei/v1/player",
          resourceTypes: ["xmlhttprequest", "other"],
        },
      },
    ],
  });
}

// ===== Toolbar icon (black for light themes, white for dark) =====
// A service worker can't see the OS color scheme, so the reader page records it in
// prefersDarkIcon and the icon is restored from that after a browser restart.
function setIconFromPreference(isDark) {
  const folder = isDark ? "icons/dark" : "icons";
  chrome.action.setIcon({
    path: { 16: `${folder}/icon16.png`, 48: `${folder}/icon48.png`, 128: `${folder}/icon128.png` },
  });
}

async function restoreIcon() {
  const { prefersDarkIcon = false } = await chrome.storage.local.get("prefersDarkIcon");
  setIconFromPreference(prefersDarkIcon);
}

async function onBrowserStart() {
  await restoreIcon();
  await updateBadge();
}

chrome.runtime.onStartup.addListener(onBrowserStart);
chrome.runtime.onInstalled.addListener(onBrowserStart);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "updateChannels") updateAllChannels();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.prefersDarkIcon) setIconFromPreference(changes.prefersDarkIcon.newValue);
  if (changes.settings) setupAlarm();
  if (changes.settings || changes.channels || changes.watchedVideos) scheduleBadgeUpdate();
});

// ===== Badge (number of new videos) =====
let badgeTimer = null;
function scheduleBadgeUpdate() {
  clearTimeout(badgeTimer);
  badgeTimer = setTimeout(updateBadge, 500);
}

async function updateBadge() {
  const s = await loadSettings();
  if (!s.showBadge) {
    await chrome.action.setBadgeText({ text: "" });
    return;
  }
  const { channels = [], watchedVideos = {} } = await chrome.storage.local.get(["channels", "watchedVideos"]);
  const opts = { watched: toWatchedMap(watchedVideos), hideShorts: s.hideShorts, maxAgeDays: s.maxAgeDays };
  const total = channels.reduce((n, c) => n + countUnwatched(c, opts), 0);
  await chrome.action.setBadgeBackgroundColor({ color: "#cc0000" });
  await chrome.action.setBadgeText({ text: total === 0 ? "" : total > 999 ? "999+" : String(total) });
}

// ===== Background refresh =====
async function isReaderOpen() {
  try {
    const ctx = await chrome.runtime.getContexts({ contextTypes: ["TAB"] });
    return ctx.length > 0;
  } catch (e) {
    return false; // when in doubt, refresh
  }
}

let updating = false; // resets with the service worker, so a killed run can't leave it stuck

async function updateAllChannels() {
  if (updating) return; // a slow run must not overlap the next alarm
  updating = true;
  try {
    await runChannelUpdate();
  } finally {
    updating = false;
  }
}

async function runChannelUpdate() {
  // Skip while the reader tab is open: it refreshes on its own timer.
  if (await isReaderOpen()) return;

  const { channels: snapshot = [] } = await chrome.storage.local.get("channels");
  if (snapshot.length === 0) return;

  // Results are saved as they arrive rather than once at the end, so a run cut short by
  // the service worker's idle limit keeps what it got; each save is also an extension API
  // call, which resets that limit.
  const pending = new Map();
  let aborted = false;
  let saving = Promise.resolve();

  // Saves are chained so concurrent workers never interleave their read-modify-write.
  const flush = () => {
    saving = saving
      .then(async () => {
        if (aborted || pending.size === 0) return;
        // If the reader was opened meanwhile it owns the data now
        if (await isReaderOpen()) {
          aborted = true;
          return;
        }
        const results = new Map(pending);
        pending.clear();
        // Re-read right before writing so edits made meanwhile are preserved
        const { channels = [], watchedVideos = {}, laterVideos = [] } = await chrome.storage.local.get([
          "channels",
          "watchedVideos",
          "laterVideos",
        ]);
        const watched = toWatchedMap(watchedVideos);
        const later = new Set(laterVideos);
        for (const ch of channels) {
          const r = results.get(ch.id);
          if (r) applyFeedResult(ch, r, (id) => watched.has(id), (id) => later.has(id));
        }
        await chrome.storage.local.set({ channels });
      })
      .catch((e) => console.warn("Failed to save channels", e));
    return saving;
  };

  const ids = [...new Set(snapshot.map((c) => c.id))];
  await runPool(
    ids,
    FEED_FETCH_CONCURRENCY,
    async (id) => {
      let result;
      try {
        result = await fetchChannelFeed(id);
      } catch (e) {
        result = { error: e.message || String(e) };
      }
      pending.set(id, result);
      // Saving every few results keeps the worker alive without writing hundreds of times
      if (pending.size >= 10) await flush();
    },
    () => aborted
  );
  await flush();
  await saving;
  if (aborted) return;
  await chrome.storage.local.set({ lastRefreshAt: Date.now() });
  await prefetchDetails();
}

// Fetch lengths for the newest videos that lack one, so they are there when the reader
// opens. Saved every few results (which also keeps the service worker alive).
const DETAILS_PREFETCH_MAX = 120;

async function prefetchDetails() {
  const s = await loadSettings();
  const { channels = [], watchedVideos = {} } = await chrome.storage.local.get(["channels", "watchedVideos"]);
  const watched = toWatchedMap(watchedVideos);
  const now = Date.now();
  const targets = channels
    .flatMap((c) => c.videos || [])
    .filter((v) => (!watched.has(v.id) || v.live || v.upcoming) && isWithinAge(v, s.maxAgeDays, now) && needsDetails(v, now))
    .sort((a, b) => videoTime(b) - videoTime(a))
    .slice(0, DETAILS_PREFETCH_MAX)
    .map((v) => v.id);
  if (!targets.length) return;

  const results = new Map();
  let aborted = false;
  const save = async () => {
    if (!results.size || aborted) return;
    if (await isReaderOpen()) {
      aborted = true;
      return;
    }
    const batch = new Map(results);
    results.clear();
    const { channels: latest = [] } = await chrome.storage.local.get("channels");
    for (const c of latest) for (const v of c.videos || []) if (batch.has(v.id)) applyDetails(v, batch.get(v.id));
    await chrome.storage.local.set({ channels: latest });
  };
  let saving = Promise.resolve();
  await runPool(
    targets,
    DETAILS_CONCURRENCY,
    async (id) => {
      results.set(id, await fetchVideoDetails(id).catch((e) => ({ error: e.message })));
      if (results.size >= 10) await (saving = saving.then(save));
    },
    () => aborted
  );
  await (saving = saving.then(save));
}
