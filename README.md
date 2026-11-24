# YouTube Subscription Reader - Chrome Extension / YouTube登録チャンネルリーダー Chrome拡張機能

[English](#english) | [日本語](#日本語)

---

## 日本語

YouTube の登録チャンネルの新着動画を、RSS リーダーのように一覧で確認できる Chromium 系ブラウザ拡張機能です。
各チャンネルの動画は YouTube 公式の RSS フィード（`/feeds/videos.xml`）から取得するため、API キーや Google Cloud の設定は不要です。

### 導入方法

1. このリポジトリをクローンまたはダウンロードします
2. Chrome（または Edge 等の Chromium 系ブラウザ）で `chrome://extensions` を開きます
3. 右上の「**デベロッパーモード**」を有効にします
4. 「**パッケージ化されていない拡張機能を読み込む**」をクリックします
5. `youtube-reader-extension` フォルダを選択します
6. ツールバーのアイコンをクリックすると、新しいタブでリーダーが開きます
7. 「**YouTubeと同期**」を押すと、登録チャンネルが読み込まれます（ブラウザで YouTube にログインしている必要があります）

### 機能一覧

#### チャンネル管理
- 「YouTubeと同期」で登録チャンネルを一括読み込み（ログイン中のセッションを利用。バックグラウンドで YouTube のタブを一時的に開きます）
- 同期時、YouTube で登録解除したチャンネルの削除（確認あり）
- URL / @ハンドル / チャンネルID / 動画URL からチャンネルを個別に追加
- 右クリックメニューの「YouTubeで登録解除」で、YouTube の登録を解除（確認あり）
- フォルダによる整理（ドラッグ＆ドロップ、右クリックメニュー対応）
- チャンネル名の絞り込み
- Google テイクアウトの `subscriptions.csv`、OPML のインポート
- OPML エクスポート（`simple-rss-reader` など一般的な RSS リーダーで読み込めます）
- 完全バックアップ: チャンネル・動画・フォルダ・視聴済み・後で見る・設定を JSON ファイルに書き出し、そこから復元（復元は今のデータを置き換え）

#### チャンネル統計
- サイドバーの「📊 チャンネル統計」の数字が登録チャンネル数
- 開くと、登録チャンネル数（YouTube同期 / 手動追加の内訳）、30日以内に投稿があったチャンネル数、半年以上投稿がないチャンネル数、全体の投稿ペースを表示
- チャンネルごとの最終投稿、投稿頻度（週 / 月 / 年あたりの本数）、平均投稿間隔、直近30日の投稿数、未視聴数を一覧表示（見出しクリックで並べ替え、半年以上投稿のないチャンネルは薄く表示）
- 投稿頻度は RSS で取得できる各チャンネルの最新15本から推定

#### 動画の閲覧
- サムネイルのカード表示 / リスト表示の切り替え
- サムネイル右下に動画の長さ（ライブ配信は「ライブ」、プレミア公開前は「公開予定」）を表示
- すべての動画・フォルダ・チャンネルごとの表示
- 動画の検索（タイトル・チャンネル名）
- Shorts の表示 / 非表示の切り替え
- クリックで YouTube の動画ページを新しいタブで開き、自動で再生を開始（中央クリック / ⌘・Ctrl+クリックならバックグラウンドで開き、タブを表示したときに再生。設定でオフにできます）

#### 視聴管理
- 開いた動画を自動的に視聴済みにする
- 視聴済み動画の非表示（一時的に表示するボタン付き）
- 手動での視聴済み / 未視聴の切り替え、表示中の動画を一括で視聴済みに
- スクロールで画面上部から消えた動画を視聴済みにする（デフォルトで有効。最後の動画までスクロールできるよう、一覧の下に余白を表示）
- 「後で見る」リスト
- 新着として扱う期間の設定（7日 / 14日 / 30日 / 90日 / 無制限）

#### キーボード操作
- j / k で動画を選択、o / Enter で開く（Shift+O でバックグラウンド）、m で視聴済みの切り替え、l で後で見る、/ で検索、r で更新、? でショートカット一覧

#### 自動更新
- 自動更新間隔の設定（オフ / 15分 / 30分 / 60分 / 180分、デフォルト 30分）
- ページを閉じていても Service Worker によりバックグラウンドで更新
- ツールバーのアイコンに新着動画数をバッジ表示

#### カスタマイズ
- ダークモード
- 日本語・英語の切り替え

### 注意事項

- YouTube の RSS フィードには各チャンネルの最新 15 本までしか含まれません。それより古い動画は、取得済みのもの（未視聴・後で見る）のみ保持されます。
- 「YouTubeと同期」と「YouTubeで登録解除」は YouTube の内部 API を利用しているため、YouTube 側の仕様変更で動かなくなる可能性があります。その場合は Google テイクアウトの `subscriptions.csv` をインポートしてください。
- メンバー限定動画や限定公開の動画は RSS フィードに含まれません。
- 動画の長さは RSS に含まれないため、YouTube の内部 API から動画ごとに取得します（約 10KB / 本、一度取得したものは保存）。この API は拡張機能からのリクエストに付く Origin ヘッダーを拒否するため、この拡張機能自身のこの API へのリクエストに限り、Origin ヘッダーを外すルールを登録しています。

### 必要な環境

- Chrome 116 以降、または Manifest V3 をサポートする Chromium 系ブラウザ（Edge、Brave、Vivaldi 等）

---

## English

A Chromium extension that shows new videos from your YouTube subscriptions in an RSS-reader-style list.
Videos are fetched from YouTube's official per-channel RSS feeds (`/feeds/videos.xml`), so no API key or Google Cloud setup is needed.

### Installation

1. Clone or download this repository
2. Open `chrome://extensions` in Chrome (or any Chromium-based browser such as Edge)
3. Enable **Developer mode** in the top-right corner
4. Click **Load unpacked**
5. Select the `youtube-reader-extension` folder
6. Click the toolbar icon to open the reader in a new tab
7. Click **Sync with YouTube** to load your subscriptions (you must be signed in to YouTube in this browser)

### Features

#### Channel Management
- "Sync with YouTube" imports all your subscriptions using your signed-in session (it briefly opens a YouTube tab in the background)
- Channels you unsubscribed from on YouTube are removed on sync (after confirmation)
- Add individual channels by URL, @handle, channel ID, or a video URL
- "Unsubscribe on YouTube" in the right-click menu unsubscribes your YouTube account (after confirmation)
- Organize channels into folders (drag-and-drop and right-click menu)
- Filter the channel list by name
- Import Google Takeout `subscriptions.csv` or OPML
- Export OPML (readable by `simple-rss-reader` and other RSS readers)
- Full backup: export channels, videos, folders, watched state, Watch later and settings to a JSON file, and restore from it (restoring replaces the current data)

#### Channel Stats
- The number next to "📊 Channel Stats" in the sidebar is your subscription count
- Open it to see the subscription count (synced / added manually), how many channels uploaded in the last 30 days, how many have not uploaded for 6+ months, and the total upload pace
- A table of each channel's last upload, upload frequency (per week / month / year), average interval, uploads in the last 30 days and unwatched count (click a heading to sort; channels inactive for 6+ months are dimmed)
- Frequency is estimated from each channel's latest 15 uploads, which is what the RSS feed provides

#### Watching
- Card view with thumbnails / list view
- Video length at the bottom right of each thumbnail ("LIVE" for live streams, "Upcoming" for premieres)
- View all videos, a folder, or a single channel
- Search videos by title or channel name
- Show / hide Shorts
- Click a video to open its YouTube page in a new tab and start playback automatically (middle-click or Cmd/Ctrl-click opens it in the background and it starts when you switch to it; can be turned off in Settings)

#### Watched Status
- Videos are marked as watched when opened
- Hide watched videos (with a button to temporarily show them)
- Toggle watched / unwatched manually, or mark everything shown as watched
- Videos that scroll out of the top of the view are marked as watched (on by default; blank space below the list lets the last videos scroll out too)
- "Watch Later" list
- Configurable "new" window (7 / 14 / 30 / 90 days / unlimited)

#### Keyboard
- j / k select videos, o / Enter open (Shift+O in the background), m toggles watched, l Watch later, / search, r refresh, ? shows the list of shortcuts

#### Auto-refresh
- Configurable interval (Off / 15 / 30 / 60 / 180 min, default 30 min)
- Background updates via Service Worker even when the reader page is closed
- New-video count badge on the toolbar icon

#### Customization
- Dark mode
- Japanese / English

### Notes

- YouTube's RSS feeds only contain each channel's latest 15 uploads. Older videos are kept only if they were already fetched (unwatched or in Watch Later).
- "Sync with YouTube" and "Unsubscribe on YouTube" use YouTube's internal API and may break if YouTube changes it. If that happens, import `subscriptions.csv` from Google Takeout instead.
- Members-only and unlisted videos are not included in the RSS feeds.
- Video lengths are not in the RSS feeds, so they are fetched per video from YouTube's internal API (about 10 KB each, stored once fetched). That API rejects requests carrying an extension's Origin header, so the extension registers a rule that removes the Origin header from its own requests to that API only.

### Requirements

- Chrome 116 or later, or any Chromium-based browser supporting Manifest V3 (Edge, Brave, Vivaldi, etc.)
