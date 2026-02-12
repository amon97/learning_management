# 📚 Learning Management

エンジニア専用の学習進捗管理アプリ

![Version](https://img.shields.io/badge/version-0.1.0--beta-blueviolet)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 機能

| 機能 | 説明 |
|------|------|
| 🏠 ダッシュボード | 学習時間・ログ数・ゴール達成率を一覧表示 |
| 📂 カテゴリ管理 | フロントエンド、バックエンド等のカテゴリを自由に追加・削除 |
| 📝 学習ログ | 日々の学習を記録、カテゴリ別にフィルタリング |
| 🎯 スキルマップ | レーダーチャートでスキルレベルを可視化 |
| 🏆 ウィークリーゴール | 週ごとの学習目標を設定・追跡 |
| 🔗 公開プロフィール | 認証不要でスキル・進捗を共有可能 (`/profile`) |
| 🔐 Google認証 | Firebase Authentication によるログイン |

## 🛠 技術スタック

- **フレームワーク**: React 19 + Vite 7
- **ルーティング**: React Router v7
- **認証**: Firebase Authentication (Google)
- **ホスティング**: Firebase Hosting
- **スタイリング**: CSS (ダークテーマ, グラスモーフィズム)
- **データ保存**: localStorage

## 🚀 セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/amon97/learning_management.git
cd learning_management

# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

→ `http://localhost:5173/` でアクセス

## 📦 デプロイ

```bash
# Firebase CLIをインストール（初回のみ）
npm install -g firebase-tools
firebase login

# ビルド & デプロイ
npm run deploy
```

## 📁 プロジェクト構成

```
src/
├── components/
│   ├── Layout/       # Sidebar, Header
│   ├── Dashboard/    # StatsCard, ProgressChart, ActivityFeed, CategoryTabs
│   ├── Categories/   # CategoryCard, CategoryForm
│   ├── Progress/     # LogEntry, LogForm
│   ├── Skills/       # RadarChart
│   └── Goals/        # GoalItem, GoalForm
├── pages/            # Dashboard, Categories, Progress, Skills, Goals, Login, PublicProfile
├── contexts/         # AuthContext
├── hooks/            # useLocalStorage
├── utils/            # storage, helpers
└── data/             # initialData
```

## 🗺 ロードマップ

- [ ] Firestore によるクラウドデータ保存
- [ ] ユーザー別の公開プロフィールURL
- [ ] 学習時間のグラフ表示（週次・月次）
- [ ] PWA対応（オフライン・ホーム画面追加）
- [ ] ダークモード / ライトモード切替

## 📝 ライセンス

MIT
