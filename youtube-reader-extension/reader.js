// ===== i18n =====
const translations = {
  ja: {
    appTitle: "YouTube登録チャンネルリーダー",
    appShortTitle: "登録チャンネル",
    refresh: "更新",
    settings: "設定",
    addFolder: "フォルダを追加",
    addChannel: "チャンネルを追加",
    syncSubscriptions: "YouTubeと同期",
    filterChannels: "チャンネルを絞り込み...",
    search: "動画を検索...",
    listView: "リスト表示",
    cardView: "カード表示",
    hideShorts: "Shortsを非表示にする",
    showShorts: "Shortsを表示する",
    showWatched: "視聴済みの動画を表示",
    hideWatchedNow: "視聴済みの動画を隠す",
    markAllWatched: "表示中の動画をすべて視聴済みにする",
    markAllConfirm: "表示中の未視聴 ${n} 本を視聴済みにしますか？",
    allVideos: "すべての動画",
    watchLater: "後で見る",
    noChannels: "チャンネルが登録されていません",
    noChannelsHint: "「YouTubeと同期」で登録チャンネルを読み込むか、「チャンネルを追加」から追加してください。",
    noVideos: "動画がありません",
    noVideosHint: "新しい動画はありません。",
    loadMore: "さらに表示 (残り ${n} 本)",
    addToLater: "後で見る",
    removeFromLater: "後で見るから外す",
    markWatched: "視聴済みにする",
    markUnwatched: "未視聴に戻す",
    short: "ショート",
    channelStats: "チャンネル統計",
    statChannels: "登録チャンネル数",
    statChannelsSub: "YouTube同期 ${synced} / 手動追加 ${manual}",
    statActive30: "30日以内に投稿あり",
    statDormant: "半年以上投稿なし",
    statTotalRate: "全体の投稿ペース",
    statsNote: "投稿頻度は各チャンネルの最新15本（RSSで取得できる範囲）から推定しています。「直近30日」が「15+」のチャンネルは実際にはそれ以上投稿しています。見出しをクリックすると並べ替え、行をクリックするとそのチャンネルを表示します。",
    colChannel: "チャンネル",
    colLast: "最終投稿",
    colRate: "投稿頻度",
    colInterval: "平均間隔",
    colLast30: "直近30日",
    colUnwatched: "未視聴",
    perWeek: "週 ${n} 本",
    perMonth: "月 ${n} 本",
    perYear: "年 ${n} 本",
    intervalDays: "${n} 日",
    intervalHours: "${n} 時間",
    live: "ライブ",
    upcoming: "公開予定",
    channelInputLabel: "チャンネルのURL / @ハンドル / チャンネルID",
    channelInputHint: "例: https://www.youtube.com/@example、@example、UCxxxxxxxx、動画のURL",
    channelExists: "このチャンネルは登録済みです",
    channelNotFound: "チャンネルが見つかりませんでした",
    invalidInput: "URLまたはハンドルを正しく入力してください",
    enterChannel: "URLまたはハンドルを入力してください",
    resolving: "確認中...",
    folderName: "フォルダ名",
    enterFolderName: "フォルダ名を入力してください",
    cancel: "キャンセル",
    add: "追加",
    close: "閉じる",
    openOnYouTube: "YouTubeでチャンネルを開く",
    refreshChannel: "このチャンネルを更新",
    markChannelWatched: "すべて視聴済みにする",
    moveToFolder: "フォルダに移動",
    removeFromFolder: "フォルダから外す",
    folderNone: "なし",
    deleteChannel: "チャンネルを削除",
    deleteChannelConfirm: "「${name}」を削除しますか？\n（YouTubeでの登録は解除されません。次回の同期で再び追加されます）",
    unsubscribe: "YouTubeで登録解除",
    unsubscribeConfirm: "YouTubeで「${name}」の登録を解除しますか？\n\nあなたのYouTubeアカウントの登録が解除され、このリーダーからも削除されます（通知設定も消えます）。元に戻すにはYouTubeで再登録してください。",
    unsubscribing: "「${name}」の登録を解除中...",
    unsubscribeDone: "「${name}」の登録を解除しました",
    unsubscribeError: "登録解除に失敗しました: ",
    renameFolder: "名前を変更",
    deleteFolder: "フォルダを削除",
    deleteFolderConfirm: "フォルダ「${name}」を削除しますか？（中のチャンネルは残ります）",
    newFolderName: "新しいフォルダ名:",
    syncing: "YouTubeから登録チャンネルを読み込み中...",
    syncDone: "同期完了: ${added} チャンネルを追加、${removed} チャンネルを削除しました（登録チャンネル ${total} 件）。",
    syncEmpty: "登録チャンネルが見つかりませんでした。YouTubeにログインしているか確認してください。",
    syncNotLoggedIn: "YouTubeにログインしていません。このブラウザでYouTubeにログインしてから、もう一度お試しください。",
    syncError: "登録チャンネルの読み込みに失敗しました: ",
    syncRemoveConfirm: "YouTubeで登録が解除された ${n} チャンネルを削除しますか？\n\n${names}",
    refreshing: "更新中 ${done}/${total}",
    lastUpdated: "最終更新: ${time}",
    neverUpdated: "未更新",
    errorCount: "⚠ ${n} チャンネルで取得エラー",
    justNow: "たった今",
    minutesAgo: "${n} 分前",
    hoursAgo: "${n} 時間前",
    daysAgo: "${n} 日前",
    weeksAgo: "${n} 週間前",
    monthsAgo: "${n} か月前",
    yearsAgo: "${n} 年前",
    views: "${n} 回視聴",
    language: "言語 / Language",
    darkMode: "ダークモード",
    hideWatched: "視聴済みの動画を隠す",
    markWatchedOnOpen: "動画を開いたら視聴済みにする",
    autoplayOnYouTube: "開いた動画を自動再生する",
    markWatchedOnScroll: "スクロールで視聴済みにする",
    maxAge: "新着として扱う期間",
    days: "${n} 日",
    unlimited: "無制限",
    autoRefresh: "自動更新間隔",
    off: "オフ",
    minutes: "${n} 分",
    backgroundRefresh: "バックグラウンド更新",
    showBadge: "アイコンに新着数を表示",
    importFile: "インポート (CSV / OPML)",
    exportOpml: "OPMLエクスポート",
    importHint: "Google テイクアウトの subscriptions.csv や、RSSリーダーの OPML を読み込めます。",
    importDone: "インポート完了: ${n} チャンネルを追加しました。",
    importNone: "読み込めるチャンネルが見つかりませんでした。",
    importError: "インポートに失敗しました: ",
    opmlTitle: "YouTube登録チャンネル",
    fetchError: "取得エラー: ",
    defaultFolder: "フォルダ",
  },
  en: {
    appTitle: "YouTube Subscription Reader",
    appShortTitle: "Subscriptions",
    refresh: "Refresh",
    settings: "Settings",
    addFolder: "Add Folder",
    addChannel: "Add Channel",
    syncSubscriptions: "Sync with YouTube",
    filterChannels: "Filter channels...",
    search: "Search videos...",
    listView: "List View",
    cardView: "Card View",
    hideShorts: "Hide Shorts",
    showShorts: "Show Shorts",
    showWatched: "Show watched videos",
    hideWatchedNow: "Hide watched videos",
    markAllWatched: "Mark all shown videos as watched",
    markAllConfirm: "Mark the ${n} unwatched video(s) in this view as watched?",
    allVideos: "All Videos",
    watchLater: "Watch Later",
    noChannels: "No channels yet",
    noChannelsHint: "Use \"Sync with YouTube\" to load your subscriptions, or \"Add Channel\" to add one.",
    noVideos: "No videos",
    noVideosHint: "No new videos.",
    loadMore: "Show more (${n} left)",
    addToLater: "Watch later",
    removeFromLater: "Remove from Watch Later",
    markWatched: "Mark as watched",
    markUnwatched: "Mark as unwatched",
    short: "Short",
    channelStats: "Channel Stats",
    statChannels: "Subscribed channels",
    statChannelsSub: "${synced} synced / ${manual} added manually",
    statActive30: "Uploaded in last 30 days",
    statDormant: "No uploads for 6+ months",
    statTotalRate: "Total upload pace",
    statsNote: "Upload frequency is estimated from each channel's latest 15 uploads (what the RSS feed provides). A \"15+\" in Last 30 days means the channel uploaded at least that many. Click a heading to sort, or a row to open the channel.",
    colChannel: "Channel",
    colLast: "Last upload",
    colRate: "Frequency",
    colInterval: "Avg. interval",
    colLast30: "Last 30 days",
    colUnwatched: "Unwatched",
    perWeek: "${n}/week",
    perMonth: "${n}/month",
    perYear: "${n}/year",
    intervalDays: "${n} days",
    intervalHours: "${n} hours",
    live: "LIVE",
    upcoming: "Upcoming",
    channelInputLabel: "Channel URL / @handle / channel ID",
    channelInputHint: "e.g. https://www.youtube.com/@example, @example, UCxxxxxxxx, or a video URL",
    channelExists: "This channel is already added",
    channelNotFound: "Channel not found",
    invalidInput: "Please enter a valid URL or handle",
    enterChannel: "Please enter a URL or handle",
    resolving: "Checking...",
    folderName: "Folder Name",
    enterFolderName: "Please enter a folder name",
    cancel: "Cancel",
    add: "Add",
    close: "Close",
    openOnYouTube: "Open channel on YouTube",
    refreshChannel: "Refresh this channel",
    markChannelWatched: "Mark all as watched",
    moveToFolder: "Move to Folder",
    removeFromFolder: "Remove from Folder",
    folderNone: "None",
    deleteChannel: "Delete Channel",
    deleteChannelConfirm: "Delete \"${name}\"?\n(This does not unsubscribe on YouTube; the next sync will add it again.)",
    unsubscribe: "Unsubscribe on YouTube",
    unsubscribeConfirm: "Unsubscribe from \"${name}\" on YouTube?\n\nThis unsubscribes your YouTube account and also removes the channel from this reader (its notification setting is lost too). To undo it, subscribe again on YouTube.",
    unsubscribing: "Unsubscribing from \"${name}\"...",
    unsubscribeDone: "Unsubscribed from \"${name}\"",
    unsubscribeError: "Failed to unsubscribe: ",
    renameFolder: "Rename",
    deleteFolder: "Delete Folder",
    deleteFolderConfirm: "Delete folder \"${name}\"? (Its channels are kept.)",
    newFolderName: "New folder name:",
    syncing: "Loading subscriptions from YouTube...",
    syncDone: "Sync complete: ${added} added, ${removed} removed (${total} subscriptions).",
    syncEmpty: "No subscriptions found. Make sure you are signed in to YouTube.",
    syncNotLoggedIn: "You are not signed in to YouTube. Sign in to YouTube in this browser and try again.",
    syncError: "Failed to load subscriptions: ",
    syncRemoveConfirm: "Remove the ${n} channel(s) you unsubscribed from on YouTube?\n\n${names}",
    refreshing: "Refreshing ${done}/${total}",
    lastUpdated: "Updated ${time}",
    neverUpdated: "Not updated yet",
    errorCount: "⚠ ${n} channel(s) failed to load",
    justNow: "just now",
    minutesAgo: "${n}m ago",
    hoursAgo: "${n}h ago",
    daysAgo: "${n}d ago",
    weeksAgo: "${n}w ago",
    monthsAgo: "${n}mo ago",
    yearsAgo: "${n}y ago",
    views: "${n} views",
    language: "Language / 言語",
    darkMode: "Dark mode",
    hideWatched: "Hide watched videos",
    markWatchedOnOpen: "Mark as watched when opened",
    autoplayOnYouTube: "Autoplay videos you open",
    markWatchedOnScroll: "Mark as watched on scroll",
    maxAge: "Treat videos as new for",
    days: "${n} days",
    unlimited: "Unlimited",
    autoRefresh: "Auto-refresh interval",
    off: "Off",
    minutes: "${n} min",
    backgroundRefresh: "Background refresh",
    showBadge: "Show new-video count on icon",
    importFile: "Import (CSV / OPML)",
    exportOpml: "Export OPML",
    importHint: "Accepts subscriptions.csv from Google Takeout or an OPML file from an RSS reader.",
    importDone: "Import complete: ${n} channel(s) added.",
    importNone: "No channels found in the file.",
    importError: "Import failed: ",
    opmlTitle: "YouTube Subscriptions",
    fetchError: "Fetch error: ",
    defaultFolder: "Folder",
  },
};

function t(key, params) {
  const str = (translations[settings.language] || translations.ja)[key] ?? key;
  if (!params) return str;
  return str.replace(/\$\{(\w+)\}/g, (_, k) => params[k] ?? "");
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// ===== State =====
let settings = { ...DEFAULT_SETTINGS };
let channels = []; // { id, title, thumbnail, folderId, source, videos, error, lastUpdated }
let folders = []; // { id, name, collapsed }
let watched = new Set(); // video ids
let later = new Set(); // video ids
let selection = { type: "all" }; // all | later | folder {id} | channel {id}
let searchQuery = "";
let channelFilter = "";
let tempShowWatched = false;
let keepVisible = new Set(); // watched during this view; stay on screen until it changes
let lastRefreshAt = 0;
let refreshing = false;
let refreshProgress = null;
let autoRefreshTimer = null;
let lastSavedChannelsJson = null;
let renderLimit = 0;
let currentList = [];
const PAGE_SIZE = 150;
// Timestamps used to tell user scrolling apart from scrolls we trigger ourselves
let lastUserScrollAt = -Infinity;
let lastProgrammaticScrollAt = -Infinity;
const USER_SCROLL_WINDOW_MS = 1500;

function setScrollTop(top) {
  lastProgrammaticScrollAt = performance.now();
  videoListEl.scrollTop = top;
}

const $ = (id) => document.getElementById(id);
const navListEl = $("nav-list");
const channelListEl = $("channel-list");
const videoListEl = $("video-list");
const statusBarEl = $("status-bar");

function channelById(id) {
  return channels.find((c) => c.id === id);
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", async () => {
  await loadState();
  selection = selectionFromHash(location.hash); // a reload stays on the same view
  history.replaceState({ sel: selection, scroll: 0 }, "", selectionHash(selection));
  updateActionIcon();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateActionIcon);
  bindEvents();
  renderAll();
  startAutoRefresh();
  if (isStale()) refreshAll();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && isStale()) refreshAll();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes.channels && !refreshing) {
      const incoming = changes.channels.newValue || [];
      if (JSON.stringify(incoming) !== lastSavedChannelsJson) {
        channels = incoming;
        renderAll();
      }
    }
    if (changes.watchedVideos) {
      let added = false;
      for (const id of changes.watchedVideos.newValue || []) {
        if (!watched.has(id)) {
          watched.add(id);
          added = true;
        }
      }
      if (added) renderAll();
    }
  });
});

// Match the toolbar icon and the tab's favicon to the OS color scheme
function updateActionIcon() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const folder = isDark ? "icons/dark" : "icons";
  chrome.storage.local.set({ prefersDarkIcon: isDark }); // background.js restores it on restart
  chrome.action.setIcon({
    path: { 16: `${folder}/icon16.png`, 48: `${folder}/icon48.png`, 128: `${folder}/icon128.png` },
  });
  $("favicon").href = `${folder}/icon48.png`;
}

async function loadState() {
  const data = await chrome.storage.local.get(["channels", "folders", "watchedVideos", "laterVideos", "lastRefreshAt"]);
  settings = await loadSettings();
  channels = data.channels || [];
  folders = data.folders || [];
  watched = new Set(data.watchedVideos || []);
  later = new Set(data.laterVideos || []);
  lastRefreshAt = data.lastRefreshAt || 0;
  applySettings();
}

function isStale() {
  if (!channels.length || !settings.autoRefreshMinutes) return false;
  return Date.now() - lastRefreshAt > settings.autoRefreshMinutes * 60000;
}

async function saveChannels() {
  lastSavedChannelsJson = JSON.stringify(channels);
  await chrome.storage.local.set({ channels });
}

async function saveFolders() {
  await chrome.storage.local.set({ folders });
}

let watchedSaveTimer = null;
function saveWatchedSoon() {
  clearTimeout(watchedSaveTimer);
  watchedSaveTimer = setTimeout(() => {
    watched = new Set(pruneWatched([...watched], channels));
    chrome.storage.local.set({ watchedVideos: [...watched] });
  }, 300);
}

async function saveLater() {
  await chrome.storage.local.set({ laterVideos: [...later] });
}

async function saveSettings() {
  await chrome.storage.local.set({ settings });
}

// ===== Settings =====
function applySettings() {
  document.documentElement.classList.toggle("dark", settings.darkMode);
  document.documentElement.lang = settings.language;
  document.title = t("appTitle");
  applyI18n();
  $("btn-view-list").classList.toggle("active", !settings.isCardView);
  $("btn-view-card").classList.toggle("active", settings.isCardView);
  const shortsBtn = $("btn-toggle-shorts");
  shortsBtn.classList.toggle("off", settings.hideShorts);
  shortsBtn.title = settings.hideShorts ? t("showShorts") : t("hideShorts");
  const watchedBtn = $("btn-toggle-watched");
  watchedBtn.classList.toggle("hidden", !settings.hideWatched);
  watchedBtn.classList.toggle("active", tempShowWatched);
  watchedBtn.title = tempShowWatched ? t("hideWatchedNow") : t("showWatched");
  videoListEl.classList.toggle("card-view", settings.isCardView);
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-title]").forEach((el) => (el.title = t(el.dataset.i18nTitle)));
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => (el.placeholder = t(el.dataset.i18nPlaceholder)));
  document.querySelectorAll("[data-i18n-days]").forEach((el) => (el.textContent = t("days", { n: el.dataset.i18nDays })));
  document.querySelectorAll("[data-i18n-minutes]").forEach((el) => (el.textContent = t("minutes", { n: el.dataset.i18nMinutes })));
}

async function updateSetting(key, value) {
  settings[key] = value;
  await saveSettings();
  applySettings();
  if (key === "autoRefreshMinutes") startAutoRefresh();
  if (["hideShorts", "hideWatched", "maxAgeDays", "language", "markWatchedOnScroll", "isCardView"].includes(key)) {
    renderAll();
  }
}

function startAutoRefresh() {
  clearInterval(autoRefreshTimer);
  if (settings.autoRefreshMinutes > 0) {
    autoRefreshTimer = setInterval(refreshAll, settings.autoRefreshMinutes * 60000);
  }
}

// ===== Events =====
function bindEvents() {
  bindAutoplay();
  $("btn-refresh").addEventListener("click", () => refreshAll());
  $("btn-sync").addEventListener("click", syncSubscriptions);
  $("btn-add-channel").addEventListener("click", () => openModal("channel-modal"));
  $("btn-add-folder").addEventListener("click", () => openModal("folder-modal"));
  $("btn-settings").addEventListener("click", openSettings);
  $("btn-view-list").addEventListener("click", () => updateSetting("isCardView", false));
  $("btn-view-card").addEventListener("click", () => updateSetting("isCardView", true));
  $("btn-toggle-shorts").addEventListener("click", () => updateSetting("hideShorts", !settings.hideShorts));
  $("btn-toggle-watched").addEventListener("click", () => {
    tempShowWatched = !tempShowWatched;
    applySettings();
    renderVideos();
  });
  $("btn-mark-all").addEventListener("click", markAllShownWatched);

  $("search-input").addEventListener("input", (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderVideos();
  });
  $("channel-filter").addEventListener("input", (e) => {
    channelFilter = e.target.value.trim().toLowerCase();
    renderSidebar();
  });

  // Only scrolling the user did may mark videos watched
  videoListEl.addEventListener(
    "scroll",
    () => {
      if (performance.now() - lastProgrammaticScrollAt > 300) lastUserScrollAt = performance.now();
    },
    { passive: true }
  );

  // Modals
  for (const overlay of document.querySelectorAll(".modal-overlay")) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
    overlay.querySelector(".btn-cancel")?.addEventListener("click", () => closeModal(overlay.id));
  }
  $("channel-modal").querySelector(".btn-ok").addEventListener("click", addChannelFromModal);
  $("folder-modal").querySelector(".btn-ok").addEventListener("click", addFolderFromModal);
  $("channel-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.isComposing) addChannelFromModal();
  });
  $("folder-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.isComposing) addFolderFromModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeContextMenu();
    document.querySelectorAll(".modal-overlay:not(.hidden)").forEach((o) => closeModal(o.id));
  });

  // Settings controls
  for (const el of document.querySelectorAll("[data-setting]")) {
    el.addEventListener("change", () => {
      const key = el.dataset.setting;
      const value = el.type === "checkbox" ? el.checked : "number" in el.dataset ? Number(el.value) : el.value;
      updateSetting(key, value);
    });
  }
  $("btn-import").addEventListener("click", () => $("import-file-input").click());
  $("import-file-input").addEventListener("change", handleImport);
  $("btn-export").addEventListener("click", exportOpml);

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".context-menu")) closeContextMenu();
  });

  // Dropping a channel on the empty part of the list takes it out of its folder
  channelListEl.addEventListener("dragover", (e) => e.preventDefault());
  channelListEl.addEventListener("drop", (e) => {
    if (e.target !== channelListEl) return;
    e.preventDefault();
    moveChannelToFolder(e.dataTransfer.getData("text/plain"), null);
  });
}

// ===== Rendering =====
function renderAll() {
  renderSidebar();
  renderVideos();
}

function countOpts() {
  return { watched, hideShorts: settings.hideShorts, maxAgeDays: settings.maxAgeDays };
}

function sortedChannels(list) {
  return [...list].sort((a, b) => (a.title || a.id).localeCompare(b.title || b.id, undefined, { sensitivity: "base" }));
}

function renderSidebar() {
  const opts = countOpts();
  const counts = new Map(channels.map((c) => [c.id, countUnwatched(c, opts)]));
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  const isSel = (type, id) => selection.type === type && (id === undefined || selection.id === id);

  navListEl.innerHTML = "";
  channelListEl.innerHTML = "";
  navListEl.append(
    navItem("▶", t("allVideos"), total, isSel("all"), () => select({ type: "all" })),
    navItem("🕒", t("watchLater"), later.size, isSel("later"), () => select({ type: "later" })),
    // Its count is the number of subscribed channels
    navItem("📊", t("channelStats"), channels.length, isSel("stats"), () => select({ type: "stats" }))
  );

  const matches = (c) => !channelFilter || (c.title || "").toLowerCase().includes(channelFilter);
  const folderIds = new Set(folders.map((f) => f.id));

  for (const folder of folders) {
    const inside = sortedChannels(channels.filter((c) => c.folderId === folder.id));
    const shown = inside.filter(matches);
    if (channelFilter && !shown.length) continue;
    const li = document.createElement("li");
    li.className = "folder-item" + (isSel("folder", folder.id) ? " active" : "");
    li.innerHTML = `
      <span class="folder-toggle">${folder.collapsed && !channelFilter ? "▸" : "▾"}</span>
      <span class="item-name">${esc(folder.name)}</span>
      <span class="item-count">${inside.reduce((n, c) => n + counts.get(c.id), 0) || ""}</span>`;
    li.querySelector(".folder-toggle").addEventListener("click", (e) => {
      e.stopPropagation();
      folder.collapsed = !folder.collapsed;
      saveFolders();
      renderSidebar();
    });
    li.addEventListener("click", () => select({ type: "folder", id: folder.id }));
    li.addEventListener("contextmenu", (e) => showFolderMenu(e, folder));
    li.addEventListener("dragover", (e) => {
      e.preventDefault();
      li.classList.add("drag-over");
    });
    li.addEventListener("dragleave", () => li.classList.remove("drag-over"));
    li.addEventListener("drop", (e) => {
      e.preventDefault();
      li.classList.remove("drag-over");
      moveChannelToFolder(e.dataTransfer.getData("text/plain"), folder.id);
    });
    channelListEl.appendChild(li);
    if (!folder.collapsed || channelFilter) {
      shown.forEach((c) => channelListEl.appendChild(channelItem(c, counts.get(c.id), true)));
    }
  }

  sortedChannels(channels.filter((c) => (!c.folderId || !folderIds.has(c.folderId)) && matches(c))).forEach((c) =>
    channelListEl.appendChild(channelItem(c, counts.get(c.id), false))
  );

  renderStatus();
}

function navItem(icon, label, count, active, onClick) {
  const li = document.createElement("li");
  li.className = "nav-item" + (active ? " active" : "");
  li.innerHTML = `<span class="nav-icon">${icon}</span><span class="item-name">${esc(label)}</span><span class="item-count">${count || ""}</span>`;
  li.addEventListener("click", onClick);
  return li;
}

function channelItem(c, count, inFolder) {
  const li = document.createElement("li");
  li.className = "channel-item" + (inFolder ? " in-folder" : "") + (selection.type === "channel" && selection.id === c.id ? " active" : "");
  li.draggable = true;
  li.innerHTML = `
    ${avatarHtml(c, "avatar")}
    <span class="item-name">${esc(c.title || c.id)}</span>
    ${c.error ? `<span class="item-error" title="${esc(t("fetchError") + c.error)}">⚠</span>` : ""}
    <span class="item-count">${count || ""}</span>`;
  li.addEventListener("click", () => select({ type: "channel", id: c.id }));
  li.addEventListener("contextmenu", (e) => showChannelMenu(e, c));
  li.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", c.id));
  return li;
}

function avatarHtml(c, cls) {
  if (c?.thumbnail) return `<img class="${cls}" src="${esc(c.thumbnail)}" alt="" loading="lazy" referrerpolicy="no-referrer">`;
  const letter = (c?.title || "?").trim().charAt(0).toUpperCase();
  return `<span class="${cls} avatar-fallback">${esc(letter)}</span>`;
}

function renderStatus() {
  const errors = channels.filter((c) => c.error).length;
  let text;
  if (transientStatus) text = transientStatus;
  else if (refreshProgress) text = t("refreshing", refreshProgress);
  else {
    const latest = Math.max(lastRefreshAt, ...channels.map((c) => c.lastUpdated || 0));
    text = latest ? t("lastUpdated", { time: relativeTime(latest) }) : channels.length ? t("neverUpdated") : "";
  }
  statusBarEl.innerHTML = `<div>${esc(text)}</div>${errors && !refreshProgress ? `<div class="status-error">${esc(t("errorCount", { n: errors }))}</div>` : ""}`;
  $("btn-refresh").classList.toggle("spinning", refreshing);
}

// Switch the view. Each switch is a browser history entry (the view is in the URL hash),
// so back / forward move between views and a reload stays on the same one.
function select(sel, { fromHistory = false, scrollTop = 0 } = {}) {
  if (!fromHistory) {
    // Remember where the current view was scrolled, for when the user comes back to it
    history.replaceState({ sel: selection, scroll: videoListEl.scrollTop }, "", selectionHash(selection));
    if (selectionHash(sel) !== selectionHash(selection)) history.pushState({ sel, scroll: 0 }, "", selectionHash(sel));
  }
  selection = sel;
  tempShowWatched = false;
  keepVisible = new Set();
  applySettings();
  renderSidebar();
  renderVideos();
  restoreScroll(scrollTop);
}

function selectionHash(sel) {
  if (sel.type === "channel" || sel.type === "folder") return `#${sel.type}/${encodeURIComponent(sel.id)}`;
  return `#${sel.type}`;
}

// A selection from a URL hash or a history entry, or "all" if what it names is gone
function validSelection(sel) {
  if (!sel || typeof sel !== "object") return { type: "all" };
  if (["all", "later", "stats"].includes(sel.type)) return { type: sel.type };
  if (sel.type === "channel" && channelById(sel.id)) return { type: "channel", id: sel.id };
  if (sel.type === "folder" && folders.some((f) => f.id === sel.id)) return { type: "folder", id: sel.id };
  return { type: "all" };
}

function selectionFromHash(hash) {
  const m = (hash || "").match(/^#(\w+)(?:\/(.*))?$/);
  if (!m) return { type: "all" };
  return validSelection({ type: m[1], id: m[2] ? decodeURIComponent(m[2]) : undefined });
}

// Scroll the list back to where it was; load further pages if the spot is beyond them
function restoreScroll(top) {
  for (let i = 0; i < 50 && top > videoListEl.scrollHeight - videoListEl.clientHeight && $("load-more"); i++) {
    $("load-more").click();
  }
  setScrollTop(top);
}

window.addEventListener("popstate", (e) => {
  const sel = validSelection(e.state?.sel || selectionFromHash(location.hash));
  // Correct the URL when it named something that no longer exists
  if (selectionHash(sel) !== location.hash) history.replaceState({ sel, scroll: 0 }, "", selectionHash(sel));
  select(sel, { fromHistory: true, scrollTop: e.state?.scroll || 0 });
});

function selectionTitle() {
  if (selection.type === "later") return t("watchLater");
  if (selection.type === "stats") return t("channelStats");
  if (selection.type === "folder") return folders.find((f) => f.id === selection.id)?.name || "";
  if (selection.type === "channel") return channelById(selection.id)?.title || selection.id;
  return t("allVideos");
}

// The videos the current view shows, newest first
function collectVideos() {
  let chans = channels;
  if (selection.type === "channel") chans = channels.filter((c) => c.id === selection.id);
  else if (selection.type === "folder") chans = channels.filter((c) => c.folderId === selection.id);

  const now = Date.now();
  const showWatched = !settings.hideWatched || tempShowWatched;
  const list = [];
  for (const c of chans) {
    for (const v of c.videos || []) {
      if (selection.type === "later") {
        if (!later.has(v.id)) continue;
      } else {
        if (settings.hideShorts && v.isShort) continue;
        // A single channel's page shows everything stored; the merged views only new videos
        if (selection.type !== "channel" && !isWithinAge(v, settings.maxAgeDays, now)) continue;
        if (!showWatched && watched.has(v.id) && !keepVisible.has(v.id)) continue;
      }
      if (searchQuery && !`${v.title} ${c.title}`.toLowerCase().includes(searchQuery)) continue;
      list.push({ v, c });
    }
  }
  return list.sort((a, b) => videoTime(b.v) - videoTime(a.v));
}

function renderVideos() {
  $("view-title").textContent = selectionTitle();
  renderChannelBar();
  const isStats = selection.type === "stats";
  $("content-actions").classList.toggle("hidden", isStats);
  if (isStats) {
    currentList = [];
    disconnectScrollObserver();
    videoListEl.classList.remove("scroll-mark");
    renderStats();
    return;
  }
  currentList = collectVideos();
  renderLimit = PAGE_SIZE;
  videoListEl.innerHTML = "";
  disconnectScrollObserver();
  // A blank screen's worth of space below the list, so that the last videos can scroll
  // past the top too (as in the RSS reader)
  videoListEl.classList.toggle("scroll-mark", scrollMarkActive() && currentList.length > 0);

  if (!channels.length) {
    videoListEl.innerHTML = `<div class="empty"><div class="empty-title">${esc(t("noChannels"))}</div><div>${esc(t("noChannelsHint"))}</div></div>`;
    return;
  }
  if (!currentList.length) {
    videoListEl.innerHTML = `<div class="empty"><div class="empty-title">${esc(t("noVideos"))}</div><div>${esc(t("noVideosHint"))}</div></div>`;
    return;
  }
  const container = document.createElement("div");
  container.id = "video-container";
  videoListEl.appendChild(container);
  appendVideos(0, renderLimit);
}

function appendVideos(from, to) {
  const container = $("video-container");
  $("load-more")?.remove();
  const frag = document.createDocumentFragment();
  const page = currentList.slice(from, to);
  page.forEach(({ v, c }) => frag.appendChild(videoElement(v, c)));
  container.appendChild(frag);
  queueDetails(page.map(({ v }) => v));
  if (currentList.length > to) {
    const more = document.createElement("button");
    more.id = "load-more";
    more.textContent = t("loadMore", { n: currentList.length - to });
    const loadNext = () => {
      if (!more.isConnected) return;
      renderLimit += PAGE_SIZE;
      appendVideos(to, renderLimit);
    };
    more.addEventListener("click", loadNext);
    videoListEl.appendChild(more);
    // Load the next page by itself as the user nears the end
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          loadNext();
        }
      },
      { root: videoListEl, rootMargin: "0px 0px 800px 0px" }
    );
    io.observe(more);
  }
  observeForScrollMark();
}

function videoElement(v, c) {
  const el = document.createElement("div");
  el.className = "video" + (watched.has(v.id) ? " watched" : "");
  el.dataset.id = v.id;
  const meta = [relativeTime(videoTime(v))];
  if (v.views != null) meta.push(t("views", { n: formatCount(v.views) }));
  const isLater = later.has(v.id);
  el.innerHTML = `
    <a class="thumb" href="${esc(v.link)}" target="_blank" rel="noopener">
      <img src="https://i.ytimg.com/vi/${esc(v.id)}/mqdefault.jpg" alt="" loading="lazy">
      ${thumbBadgeHtml(v)}
    </a>
    <div class="info">
      ${avatarHtml(c, "video-avatar")}
      <div class="text">
        <a class="title" href="${esc(v.link)}" target="_blank" rel="noopener" title="${esc(v.title)}">${esc(v.title)}</a>
        <div class="meta">
          <span class="channel-link">${esc(c.title || c.id)}</span><span class="dot">·</span><span>${esc(meta.join(" · "))}</span>
        </div>
      </div>
      <div class="actions">
        <button class="btn-later${isLater ? " on" : ""}" title="${esc(isLater ? t("removeFromLater") : t("addToLater"))}">🕒</button>
        <button class="btn-watched" title="${esc(watched.has(v.id) ? t("markUnwatched") : t("markWatched"))}">✓</button>
      </div>
    </div>`;

  // Open the video on YouTube ourselves rather than letting the link do it, so that we
  // know the new tab and can start playback in it. Middle / ctrl / cmd-click opens it in
  // the background, as a link would.
  const onOpen = (e) => {
    if (e.type === "auxclick" && e.button !== 1) return;
    if (e.shiftKey || e.altKey) return; // new window / download: leave to the browser
    e.preventDefault();
    const background = e.button === 1 || e.ctrlKey || e.metaKey;
    openVideoTab(v.link, background);
    if (settings.markWatchedOnOpen) setWatched(v.id, true);
  };
  el.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", onOpen);
    a.addEventListener("auxclick", onOpen);
  });
  el.querySelector(".channel-link").addEventListener("click", () => select({ type: "channel", id: c.id }));
  el.querySelector(".btn-watched").addEventListener("click", () => setWatched(v.id, !watched.has(v.id)));
  el.querySelector(".btn-later").addEventListener("click", (e) => toggleLater(v.id, e.currentTarget));
  return el;
}

// ===== Channel statistics (upload frequency) =====
// The feed holds a channel's newest 15 uploads, so frequency is estimated from those:
// uploads per week = n / (now - oldest of the n). Counting up to now (not only up to
// the newest upload) makes a channel that has gone quiet come out as infrequent.
const FEED_SIZE = 15;
let statsSort = { key: "rate", dir: -1 };

function channelStats(c, now = Date.now()) {
  const recent = (c.videos || [])
    .filter((v) => v.published)
    .sort((a, b) => b.published - a.published)
    .slice(0, FEED_SIZE);
  const stats = { channel: c, count: recent.length, last: null, rate: null, interval: null, last30: 0, capped: false, shorts: 0 };
  if (!recent.length) return stats;
  const oldest = recent[recent.length - 1].published;
  stats.last = recent[0].published;
  stats.rate = recent.length / (Math.max(now - oldest, 86400000) / (7 * 86400000));
  if (recent.length > 1) stats.interval = (recent[0].published - oldest) / (recent.length - 1) / 86400000;
  stats.last30 = recent.filter((v) => now - v.published <= 30 * 86400000).length;
  // All 15 within 30 days: the real number may be higher than the feed can show
  stats.capped = recent.length === FEED_SIZE && stats.last30 === FEED_SIZE;
  stats.shorts = recent.filter((v) => v.isShort).length;
  return stats;
}

function formatRate(perWeek) {
  if (perWeek == null) return "—";
  const n = (x) => (x >= 10 ? Math.round(x) : Math.round(x * 10) / 10);
  if (perWeek >= 1) return t("perWeek", { n: n(perWeek) });
  if (perWeek * 30 / 7 >= 1) return t("perMonth", { n: n((perWeek * 30) / 7) });
  return t("perYear", { n: n((perWeek * 365) / 7) });
}

function formatInterval(days) {
  if (days == null) return "—";
  if (days < 1) return t("intervalHours", { n: Math.max(1, Math.round(days * 24)) });
  return t("intervalDays", { n: days >= 10 ? Math.round(days) : Math.round(days * 10) / 10 });
}

function renderStats() {
  const now = Date.now();
  const rows = channels.map((c) => channelStats(c, now));
  const day = 86400000;
  const synced = channels.filter((c) => c.source === "youtube").length;
  const active30 = rows.filter((r) => r.last && now - r.last <= 30 * day).length;
  const dormant = rows.filter((r) => r.last && now - r.last > 180 * day).length;
  const totalRate = rows.reduce((n, r) => n + (r.rate || 0), 0);

  const keyOf = {
    name: (r) => (r.channel.title || r.channel.id).toLowerCase(),
    last: (r) => r.last ?? -Infinity,
    rate: (r) => r.rate ?? -Infinity,
    interval: (r) => r.interval ?? Infinity,
    last30: (r) => r.last30,
    unwatched: (r) => r.unwatched,
  };
  const opts = countOpts();
  rows.forEach((r) => (r.unwatched = countUnwatched(r.channel, opts)));
  const key = keyOf[statsSort.key];
  rows.sort((a, b) => {
    const x = key(a);
    const y = key(b);
    return (x < y ? -1 : x > y ? 1 : 0) * statsSort.dir;
  });

  const card = (label, value, sub = "") =>
    `<div class="stat-card"><div class="stat-value">${esc(value)}</div><div class="stat-label">${esc(label)}</div>${
      sub ? `<div class="stat-sub">${esc(sub)}</div>` : ""
    }</div>`;
  const th = (k, label, cls = "") =>
    `<th class="${cls}${statsSort.key === k ? " sorted" : ""}" data-key="${k}">${esc(label)}${
      statsSort.key === k ? (statsSort.dir < 0 ? " ▼" : " ▲") : ""
    }</th>`;

  videoListEl.innerHTML = `
    <div class="stats">
      <div class="stat-cards">
        ${card(t("statChannels"), String(channels.length), t("statChannelsSub", { synced, manual: channels.length - synced }))}
        ${card(t("statActive30"), String(active30))}
        ${card(t("statDormant"), String(dormant))}
        ${card(t("statTotalRate"), formatRate(totalRate))}
      </div>
      <div class="hint stats-note">${esc(t("statsNote"))}</div>
      <table class="stats-table">
        <thead><tr>
          ${th("name", t("colChannel"))}
          ${th("last", t("colLast"), "num")}
          ${th("rate", t("colRate"), "num")}
          ${th("interval", t("colInterval"), "num")}
          ${th("last30", t("colLast30"), "num")}
          ${th("unwatched", t("colUnwatched"), "num")}
        </tr></thead>
        <tbody>
          ${rows
            .map((r) => {
              const c = r.channel;
              const dormantRow = r.last && now - r.last > 180 * day;
              return `<tr data-id="${esc(c.id)}" class="${dormantRow ? "dormant" : ""}">
                <td><div class="name">${avatarHtml(c, "avatar")}<span>${esc(c.title || c.id)}</span>${
                  c.error ? `<span class="item-error" title="${esc(t("fetchError") + c.error)}">⚠</span>` : ""
                }</div></td>
                <td class="num">${r.last ? esc(relativeTime(r.last)) : "—"}</td>
                <td class="num">${esc(formatRate(r.rate))}</td>
                <td class="num">${esc(formatInterval(r.interval))}</td>
                <td class="num">${r.count ? esc(r.last30 + (r.capped ? "+" : "")) : "—"}</td>
                <td class="num">${r.unwatched || ""}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>`;

  videoListEl.querySelectorAll("th[data-key]").forEach((el) =>
    el.addEventListener("click", () => {
      const k = el.dataset.key;
      // Names sort A→Z first; numbers biggest first (interval: shortest first)
      if (statsSort.key === k) statsSort.dir *= -1;
      else statsSort = { key: k, dir: k === "name" || k === "interval" ? 1 : -1 };
      renderStats();
    })
  );
  videoListEl.querySelectorAll("tbody tr").forEach((tr) => {
    const c = channelById(tr.dataset.id);
    tr.addEventListener("click", () => select({ type: "channel", id: c.id }));
    tr.addEventListener("contextmenu", (e) => showChannelMenu(e, c));
  });
}

// The badge at the bottom right of a thumbnail: length, LIVE, upcoming, or Short
function thumbBadgeHtml(v) {
  if (v.isShort) return `<span class="thumb-badge short">${esc(t("short"))}</span>`;
  if (v.live) return `<span class="thumb-badge live">${esc(t("live"))}</span>`;
  if (v.upcoming) return `<span class="thumb-badge">${esc(t("upcoming"))}</span>`;
  if (v.duration > 0) return `<span class="thumb-badge">${formatDuration(v.duration)}</span>`;
  return "";
}

// Fetch lengths for the videos on screen that lack one, a few at a time
const detailsQueue = [];
const detailsQueued = new Set();
let detailsActive = 0;
let detailsSaveTimer = null;

function queueDetails(videos) {
  const now = Date.now();
  for (const v of videos) {
    if (detailsQueued.has(v.id) || !needsDetails(v, now)) continue;
    detailsQueued.add(v.id);
    detailsQueue.push(v.id);
  }
  pumpDetails();
}

function pumpDetails() {
  while (detailsActive < DETAILS_CONCURRENCY && detailsQueue.length) {
    const id = detailsQueue.shift();
    detailsActive++;
    fetchVideoDetails(id)
      .catch((e) => ({ error: e.message }))
      .then((d) => {
        // Apply to the stored object (the list may have been re-rendered meanwhile)
        for (const c of channels) {
          const v = (c.videos || []).find((x) => x.id === id);
          if (!v) continue;
          applyDetails(v, d);
          const thumb = videoListEl.querySelector(`.video[data-id="${CSS.escape(id)}"] .thumb`);
          if (thumb && !d.error) {
            thumb.querySelector(".thumb-badge")?.remove();
            thumb.insertAdjacentHTML("beforeend", thumbBadgeHtml(v));
          }
        }
        if (!detailsSaveTimer) detailsSaveTimer = setTimeout(() => ((detailsSaveTimer = null), saveChannels()), 2000);
      })
      .finally(() => {
        detailsActive--;
        detailsQueued.delete(id);
        pumpDetails();
      });
  }
}

// ===== Watched / Watch later =====
function setWatched(id, value) {
  if (value === watched.has(id)) return;
  if (value) watched.add(id);
  else watched.delete(id);
  keepVisible.add(id);
  const el = videoListEl.querySelector(`.video[data-id="${CSS.escape(id)}"]`);
  if (el) {
    el.classList.toggle("watched", value);
    el.querySelector(".btn-watched").title = value ? t("markUnwatched") : t("markWatched");
  }
  saveWatchedSoon();
  renderSidebar();
}

function toggleLater(id, btn) {
  if (later.has(id)) later.delete(id);
  else later.add(id);
  const on = later.has(id);
  btn.classList.toggle("on", on);
  btn.title = on ? t("removeFromLater") : t("addToLater");
  saveLater();
  renderSidebar();
}

function markAllShownWatched() {
  const ids = currentList.map(({ v }) => v.id).filter((id) => !watched.has(id));
  if (!ids.length) return;
  if (!confirm(t("markAllConfirm", { n: ids.length }))) return;
  ids.forEach((id) => watched.add(id));
  saveWatchedSoon();
  keepVisible = new Set();
  renderAll();
}

// Mark videos watched once they scroll off the top, but only for scrolling the user did
let scrollObserver = null;
function disconnectScrollObserver() {
  scrollObserver?.disconnect();
  scrollObserver = null;
}

function scrollMarkActive() {
  return settings.markWatchedOnScroll && selection.type !== "later";
}

function observeForScrollMark() {
  disconnectScrollObserver();
  if (!scrollMarkActive()) return;
  // An observer's first callback for an element only reports where it is now; it never
  // means the user scrolled past it, so it must not mark anything.
  const firstNotification = new Set();
  scrollObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const initial = firstNotification.delete(e.target);
        if (initial || e.isIntersecting || !e.rootBounds) continue;
        if (e.boundingClientRect.bottom > e.rootBounds.top) continue; // below, not above
        // Videos can also move above the view without scrolling (resize, reflow)
        if (performance.now() - lastUserScrollAt > USER_SCROLL_WINDOW_MS) continue;
        setWatched(e.target.dataset.id, true);
        scrollObserver?.unobserve(e.target);
      }
    },
    { root: videoListEl, threshold: 0 }
  );
  videoListEl.querySelectorAll(".video:not(.watched)").forEach((el) => {
    firstNotification.add(el);
    scrollObserver.observe(el);
  });
}

// ===== Refresh =====
async function refreshAll(onlyIds) {
  if (refreshing) return;
  const ids = Array.isArray(onlyIds) ? onlyIds : channels.map((c) => c.id);
  if (!ids.length) return;
  refreshing = true;
  refreshProgress = { done: 0, total: ids.length };
  renderStatus();

  let saveTimer = null;
  const saveSoon = () => {
    if (!saveTimer) saveTimer = setTimeout(() => ((saveTimer = null), saveChannels()), 2000);
  };
  let sidebarTimer = null;
  const isW = (id) => watched.has(id);
  const isL = (id) => later.has(id);

  try {
    await runPool(ids, FEED_FETCH_CONCURRENCY, async (id) => {
      let result;
      try {
        result = await fetchChannelFeed(id);
      } catch (e) {
        result = { error: e.message || String(e) };
      }
      const ch = channelById(id);
      if (ch) applyFeedResult(ch, result, isW, isL);
      refreshProgress.done++;
      saveSoon();
      if (!sidebarTimer) sidebarTimer = setTimeout(() => ((sidebarTimer = null), renderSidebar()), 400);
    });
  } finally {
    clearTimeout(saveTimer);
    clearTimeout(sidebarTimer);
    if (!Array.isArray(onlyIds)) {
      lastRefreshAt = Date.now();
      await chrome.storage.local.set({ lastRefreshAt });
    }
    await saveChannels();
    refreshing = false;
    refreshProgress = null;
    const top = videoListEl.scrollTop;
    renderAll();
    setScrollTop(top);
  }
}

// ===== Sync with YouTube =====
async function syncSubscriptions() {
  const btn = $("btn-sync");
  if (btn.disabled) return;
  btn.disabled = true;
  btn.textContent = t("syncing");
  let subs;
  try {
    subs = await fetchSubscriptionsFromYouTube();
  } catch (e) {
    alert(e.code === "notLoggedIn" ? t("syncNotLoggedIn") : t("syncError") + (e.message || e));
    return;
  } finally {
    btn.disabled = false;
    btn.textContent = t("syncSubscriptions");
  }
  if (!subs.length) {
    alert(t("syncEmpty"));
    return;
  }

  const subIds = new Set(subs.map((s) => s.id));
  const added = [];
  for (const s of subs) {
    const existing = channelById(s.id);
    if (existing) {
      existing.title = s.title || existing.title;
      existing.thumbnail = s.thumbnail || existing.thumbnail;
      existing.source = "youtube";
    } else {
      channels.push({ id: s.id, title: s.title, thumbnail: s.thumbnail, source: "youtube", folderId: null, videos: [] });
      added.push(s.id);
    }
  }
  // Channels that came from an earlier sync but are no longer subscribed
  const gone = channels.filter((c) => c.source === "youtube" && !subIds.has(c.id));
  let removed = 0;
  if (gone.length) {
    const names = gone.slice(0, 20).map((c) => "・" + (c.title || c.id)).join("\n") + (gone.length > 20 ? "\n…" : "");
    if (confirm(t("syncRemoveConfirm", { n: gone.length, names }))) {
      const goneIds = new Set(gone.map((c) => c.id));
      channels = channels.filter((c) => !goneIds.has(c.id));
      removed = gone.length;
      if (selection.type === "channel" && goneIds.has(selection.id)) selection = { type: "all" };
    }
  }
  await saveChannels();
  renderAll();
  alert(t("syncDone", { added: added.length, removed, total: subs.length }));
  if (added.length) refreshAll(added);
}

// ===== Add channel / folder =====
function openModal(id) {
  const overlay = $(id);
  overlay.classList.remove("hidden");
  overlay.querySelector(".modal-error")?.classList.add("hidden");
  const input = overlay.querySelector("input[type=text]");
  if (input) {
    input.value = "";
    input.focus();
  }
}

function closeModal(id) {
  $(id).classList.add("hidden");
}

function showModalError(id, msg) {
  const el = $(id).querySelector(".modal-error");
  el.textContent = msg;
  el.classList.remove("hidden");
}

async function addChannelFromModal() {
  const input = $("channel-input");
  const okBtn = $("channel-modal").querySelector(".btn-ok");
  if (okBtn.disabled) return;
  const value = input.value.trim();
  if (!value) return showModalError("channel-modal", t("enterChannel"));
  okBtn.disabled = true;
  okBtn.textContent = t("resolving");
  try {
    const info = await resolveChannel(value);
    if (channelById(info.id)) return showModalError("channel-modal", t("channelExists"));
    // Confirm the feed works before adding, and take the title from it if needed
    const feed = await fetchChannelFeed(info.id);
    const ch = { id: info.id, title: info.title || feed.title, thumbnail: info.thumbnail, source: "manual", folderId: null, videos: [] };
    applyFeedResult(ch, feed, (id) => watched.has(id), (id) => later.has(id));
    channels.push(ch);
    await saveChannels();
    closeModal("channel-modal");
    select({ type: "channel", id: ch.id });
  } catch (e) {
    const msg =
      e.code === "invalid" ? t("invalidInput") : e.code === "notFound" ? t("channelNotFound") : t("fetchError") + (e.message || e);
    showModalError("channel-modal", msg);
  } finally {
    okBtn.disabled = false;
    okBtn.textContent = t("add");
  }
}

async function addFolderFromModal() {
  const name = $("folder-input").value.trim();
  if (!name) return showModalError("folder-modal", t("enterFolderName"));
  folders.push({ id: "f" + Date.now().toString(36), name, collapsed: false });
  await saveFolders();
  closeModal("folder-modal");
  renderSidebar();
  renderChannelBar();
}

async function moveChannelToFolder(channelId, folderId) {
  const ch = channelById(channelId);
  if (!ch || (ch.folderId || null) === folderId) return;
  ch.folderId = folderId;
  await saveChannels();
  renderSidebar();
  renderChannelBar();
  if (selection.type === "folder") renderVideos();
}

// ===== Opening videos on YouTube (with autoplay) =====
const autoplayTabs = new Set(); // tabs we opened whose video should start once loaded

async function openVideoTab(url, background) {
  const tab = await chrome.tabs.create({ url, active: !background });
  if (settings.autoplayOnYouTube) autoplayTabs.add(tab.id);
}

function bindAutoplay() {
  chrome.tabs.onUpdated.addListener((tabId, info) => {
    if (info.status !== "complete" || !autoplayTabs.has(tabId)) return;
    autoplayTabs.delete(tabId);
    chrome.scripting
      .executeScript({ target: { tabId }, world: "MAIN", func: ytAutoplay })
      .catch((e) => console.warn("Autoplay injection failed", e));
  });
  chrome.tabs.onRemoved.addListener((tabId) => autoplayTabs.delete(tabId));
}

// Runs in the YouTube watch page (MAIN world, serialized: self-contained). Starts the
// video once the tab is visible. If the browser's autoplay policy refuses playback with
// sound, it plays muted instead (the user can unmute in the player).
function ytAutoplay() {
  const start = () => {
    let tries = 0;
    let triedMuted = false;
    const timer = setInterval(async () => {
      tries++;
      const video = document.querySelector("#movie_player video, #shorts-player video, video");
      if (tries > 40 || (video && !video.paused && !video.ended)) {
        clearInterval(timer);
        return;
      }
      if (!video || video.readyState < 1) return;
      const player = document.getElementById("movie_player");
      try {
        await video.play();
      } catch (e) {
        if (e.name !== "NotAllowedError" || triedMuted) return;
        triedMuted = true;
        if (player?.mute) player.mute();
        else video.muted = true;
        if (player?.playVideo) player.playVideo();
        else video.play().catch(() => {});
      }
    }, 500);
  };
  // Background tabs: browsers hold media until the tab is shown, so wait for that
  if (document.visibilityState === "visible") start();
  else {
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onVisible);
      start();
    };
    document.addEventListener("visibilitychange", onVisible);
  }
}

// ===== Context menus =====
function closeContextMenu() {
  document.querySelectorAll(".context-menu").forEach((m) => m.remove());
}

// items: { label, action, danger } | { header } | "sep"
function showContextMenu(e, items) {
  e.preventDefault();
  e.stopPropagation();
  closeContextMenu();
  const menu = document.createElement("div");
  menu.className = "context-menu";
  for (const item of items) {
    const div = document.createElement("div");
    if (item === "sep") div.className = "menu-sep";
    else if (item.header) {
      div.className = "menu-header";
      div.textContent = item.header;
    } else {
      div.className = "menu-item" + (item.danger ? " danger" : "") + (item.sub ? " sub" : "");
      div.textContent = item.label;
      div.addEventListener("click", () => {
        closeContextMenu();
        item.action();
      });
    }
    menu.appendChild(div);
  }
  document.body.appendChild(menu);
  const r = menu.getBoundingClientRect();
  menu.style.left = Math.min(e.clientX, window.innerWidth - r.width - 4) + "px";
  menu.style.top = Math.max(4, Math.min(e.clientY, window.innerHeight - r.height - 4)) + "px";
}

// What can be done to a channel: shared by its right-click menu and the bar shown above
// its videos
function channelActions(c) {
  return {
    open: () => chrome.tabs.create({ url: `https://www.youtube.com/channel/${c.id}/videos` }),
    refresh: () => refreshAll([c.id]),
    markAll: () => {
      (c.videos || []).forEach((v) => watched.add(v.id));
      saveWatchedSoon();
      renderAll();
    },
    unsubscribe: () => unsubscribeChannel(c),
    remove: async () => {
      if (!confirm(t("deleteChannelConfirm", { name: c.title || c.id }))) return;
      channels = channels.filter((x) => x.id !== c.id);
      if (selection.type === "channel" && selection.id === c.id) selection = { type: "all" };
      await saveChannels();
      renderAll();
    },
  };
}

function showChannelMenu(e, c) {
  const act = channelActions(c);
  const items = [
    { label: t("openOnYouTube"), action: act.open },
    { label: t("refreshChannel"), action: act.refresh },
    { label: t("markChannelWatched"), action: act.markAll },
  ];
  if (folders.length) {
    items.push("sep", { header: t("moveToFolder") });
    folders
      .filter((f) => f.id !== c.folderId)
      .forEach((f) => items.push({ label: f.name, sub: true, action: () => moveChannelToFolder(c.id, f.id) }));
    if (c.folderId) items.push({ label: t("removeFromFolder"), sub: true, action: () => moveChannelToFolder(c.id, null) });
  }
  items.push(
    "sep",
    { label: t("unsubscribe"), danger: true, action: act.unsubscribe },
    { label: t("deleteChannel"), danger: true, action: act.remove }
  );
  showContextMenu(e, items);
}

// The channel's actions as buttons above its videos, while a channel is selected
function renderChannelBar() {
  const bar = $("channel-bar");
  const c = selection.type === "channel" ? channelById(selection.id) : null;
  bar.classList.toggle("hidden", !c);
  bar.innerHTML = "";
  if (!c) return;
  const act = channelActions(c);
  const button = (label, onClick, cls = "") => {
    const b = document.createElement("button");
    b.textContent = label;
    if (cls) b.className = cls;
    b.addEventListener("click", onClick);
    return b;
  };
  const left = document.createElement("div");
  left.className = "bar-group";
  left.append(
    button("↗ " + t("openOnYouTube"), act.open),
    button("⟳ " + t("refreshChannel"), act.refresh),
    button("✓ " + t("markChannelWatched"), act.markAll)
  );
  if (folders.length) {
    const sel = document.createElement("select");
    sel.title = t("moveToFolder");
    sel.innerHTML =
      `<option value="">📁 ${esc(t("moveToFolder"))}: ${esc(t("folderNone"))}</option>` +
      folders.map((f) => `<option value="${esc(f.id)}">📁 ${esc(t("moveToFolder"))}: ${esc(f.name)}</option>`).join("");
    sel.value = folders.some((f) => f.id === c.folderId) ? c.folderId : "";
    sel.addEventListener("change", () => moveChannelToFolder(c.id, sel.value || null));
    left.append(sel);
  }
  const right = document.createElement("div");
  right.className = "bar-group";
  right.append(button(t("unsubscribe"), act.unsubscribe, "danger"), button(t("deleteChannel"), act.remove, "danger"));
  bar.append(left, right);
}

// Unsubscribe on YouTube, then drop the channel here too
let unsubscribingIds = new Set();
async function unsubscribeChannel(c) {
  const name = c.title || c.id;
  if (unsubscribingIds.has(c.id) || !confirm(t("unsubscribeConfirm", { name }))) return;
  unsubscribingIds.add(c.id);
  setTransientStatus(t("unsubscribing", { name }));
  try {
    await unsubscribeOnYouTube(c.id);
  } catch (e) {
    setTransientStatus(null);
    alert(e.code === "notLoggedIn" ? t("syncNotLoggedIn") : t("unsubscribeError") + (e.message || e));
    return;
  } finally {
    unsubscribingIds.delete(c.id);
  }
  channels = channels.filter((x) => x.id !== c.id);
  if (selection.type === "channel" && selection.id === c.id) selection = { type: "all" };
  await saveChannels();
  renderAll();
  setTransientStatus(t("unsubscribeDone", { name }), 6000);
}

// A message shown in the status bar instead of the usual text, for `ms` (or until cleared)
let transientStatus = null;
let transientTimer = null;
function setTransientStatus(text, ms) {
  clearTimeout(transientTimer);
  transientStatus = text;
  if (text && ms) transientTimer = setTimeout(() => setTransientStatus(null), ms);
  renderStatus();
}

function showFolderMenu(e, folder) {
  showContextMenu(e, [
    {
      label: t("renameFolder"),
      action: async () => {
        const name = prompt(t("newFolderName"), folder.name);
        if (!name?.trim()) return;
        folder.name = name.trim();
        await saveFolders();
        renderAll();
      },
    },
    {
      label: t("deleteFolder"),
      danger: true,
      action: async () => {
        if (!confirm(t("deleteFolderConfirm", { name: folder.name }))) return;
        folders = folders.filter((f) => f.id !== folder.id);
        channels.forEach((c) => {
          if (c.folderId === folder.id) c.folderId = null;
        });
        if (selection.type === "folder" && selection.id === folder.id) selection = { type: "all" };
        await Promise.all([saveFolders(), saveChannels()]);
        renderAll();
      },
    },
  ]);
}

// ===== Settings modal / import / export =====
function openSettings() {
  for (const el of document.querySelectorAll("[data-setting]")) {
    const v = settings[el.dataset.setting];
    if (el.type === "checkbox") el.checked = !!v;
    else el.value = String(v);
  }
  $("settings-modal").classList.remove("hidden");
}

async function handleImport(e) {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  try {
    const found = parseImportFile(await file.text());
    if (!found.length) return alert(t("importNone"));
    const added = found.filter((f) => !channelById(f.id));
    added.forEach((f) => channels.push({ ...f, source: "manual", folderId: null, videos: [] }));
    await saveChannels();
    renderAll();
    alert(t("importDone", { n: added.length }));
    if (added.length) refreshAll(added.map((f) => f.id));
  } catch (err) {
    alert(t("importError") + (err.message || err));
  }
}

function exportOpml() {
  const blob = new Blob([buildOpml(sortedChannels(channels), folders, t("opmlTitle"))], { type: "text/xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "youtube-subscriptions.opml";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ===== Formatting =====
function relativeTime(ts) {
  if (!ts) return "";
  const s = Math.max(0, (Date.now() - ts) / 1000);
  if (s < 60) return t("justNow");
  if (s < 3600) return t("minutesAgo", { n: Math.floor(s / 60) });
  if (s < 86400) return t("hoursAgo", { n: Math.floor(s / 3600) });
  if (s < 86400 * 7) return t("daysAgo", { n: Math.floor(s / 86400) });
  if (s < 86400 * 30) return t("weeksAgo", { n: Math.floor(s / (86400 * 7)) });
  if (s < 86400 * 365) return t("monthsAgo", { n: Math.floor(s / (86400 * 30)) });
  return t("yearsAgo", { n: Math.floor(s / (86400 * 365)) });
}

function formatCount(n) {
  return new Intl.NumberFormat(settings.language === "ja" ? "ja-JP" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

// Keep "x minutes ago" in the status bar current
setInterval(() => {
  if (!refreshing) renderStatus();
}, 60000);
