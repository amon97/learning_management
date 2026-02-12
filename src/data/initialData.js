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

// ベータ版: 新規ユーザーは空の状態からスタート
export const sampleLogs = [];

export const sampleGoals = [];

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
