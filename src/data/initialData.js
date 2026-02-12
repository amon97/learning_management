// ========================================
// 初期データ・サンプルデータ
// ========================================

export const defaultCategories = [
    {
        id: 'cat-frontend',
        name: 'フロントエンド',
        icon: '🎨',
        color: '#6c5ce7',
        description: 'React, Vue, CSS, HTML, TypeScript',
    },
    {
        id: 'cat-backend',
        name: 'バックエンド',
        icon: '⚙️',
        color: '#00cec9',
        description: 'Node.js, Python, Go, API設計',
    },
    {
        id: 'cat-infrastructure',
        name: 'インフラ・DevOps',
        icon: '☁️',
        color: '#fdcb6e',
        description: 'AWS, Docker, Kubernetes, CI/CD',
    },
    {
        id: 'cat-database',
        name: 'データベース',
        icon: '💾',
        color: '#fd79a8',
        description: 'SQL, NoSQL, Redis, データモデリング',
    },
    {
        id: 'cat-security',
        name: 'セキュリティ',
        icon: '🔒',
        color: '#e17055',
        description: '認証認可, 暗号化, OWASP',
    },
    {
        id: 'cat-algorithm',
        name: 'アルゴリズム',
        icon: '🧮',
        color: '#74b9ff',
        description: 'データ構造, 競プロ, 計算量',
    },
];

export const sampleLogs = [
    {
        id: 'log-1',
        categoryId: 'cat-frontend',
        title: 'React Hooks の復習',
        description: 'useEffect, useMemo, useCallback の使い分けを整理',
        duration: 90,
        date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
        id: 'log-2',
        categoryId: 'cat-backend',
        title: 'REST API 設計パターン',
        description: 'リソース設計とエラーハンドリングのベストプラクティス',
        duration: 60,
        date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    },
    {
        id: 'log-3',
        categoryId: 'cat-infrastructure',
        title: 'Docker Compose 入門',
        description: 'マルチコンテナ環境の構築を学習',
        duration: 120,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
        id: 'log-4',
        categoryId: 'cat-database',
        title: 'SQLのインデックス最適化',
        description: 'B-Treeインデックスの仕組みとクエリチューニング',
        duration: 45,
        date: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    },
    {
        id: 'log-5',
        categoryId: 'cat-frontend',
        title: 'CSS Grid レイアウト実践',
        description: 'レスポンシブダッシュボードのレイアウト構築',
        duration: 75,
        date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
    {
        id: 'log-6',
        categoryId: 'cat-algorithm',
        title: '二分探索木の実装',
        description: '挿入・削除・探索の時間計算量について',
        duration: 60,
        date: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
    },
];

export const sampleGoals = [
    {
        id: 'goal-1',
        title: 'Reactの新しいパターンを3つ学ぶ',
        categoryId: 'cat-frontend',
        completed: true,
        weekStart: getLatestMonday(),
    },
    {
        id: 'goal-2',
        title: 'REST APIのハンズオンを完了',
        categoryId: 'cat-backend',
        completed: false,
        weekStart: getLatestMonday(),
    },
    {
        id: 'goal-3',
        title: 'Dockerの基礎を理解する',
        categoryId: 'cat-infrastructure',
        completed: false,
        weekStart: getLatestMonday(),
    },
    {
        id: 'goal-4',
        title: 'LeetCodeを5問解く',
        categoryId: 'cat-algorithm',
        completed: false,
        weekStart: getLatestMonday(),
    },
];

export const defaultSkills = [
    { categoryId: 'cat-frontend', level: 72 },
    { categoryId: 'cat-backend', level: 58 },
    { categoryId: 'cat-infrastructure', level: 35 },
    { categoryId: 'cat-database', level: 50 },
    { categoryId: 'cat-security', level: 28 },
    { categoryId: 'cat-algorithm', level: 45 },
];

function getLatestMonday() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString();
}
