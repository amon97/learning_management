// ========================================
// ユーティリティ関数
// ========================================

/**
 * 日付をフォーマット (YYYY-MM-DD)
 */
export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

/**
 * 日付を相対的な表示に変換（例: "3時間前", "昨日"）
 */
export function formatRelativeTime(date) {
    const now = new Date();
    const d = new Date(date);
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'たった今';
    if (diffMins < 60) return `${diffMins}分前`;
    if (diffHours < 24) return `${diffHours}時間前`;
    if (diffDays === 1) return '昨日';
    if (diffDays < 7) return `${diffDays}日前`;
    return formatDate(date);
}

/**
 * 時間をフォーマット（分 → 時間h 分m）
 */
export function formatDuration(minutes) {
    if (minutes < 60) return `${minutes}分`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}時間${mins}分` : `${hours}時間`;
}

/**
 * ユニークIDを生成
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * 今週の開始日（月曜日）を取得
 */
export function getWeekStart() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(now.setDate(diff));
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
}

/**
 * 今週の学習ログをフィルタ
 */
export function getThisWeekLogs(logs) {
    const weekStart = getWeekStart();
    return logs.filter((log) => new Date(log.date) >= weekStart);
}

/**
 * カテゴリID別にログを集計
 */
export function aggregateByCategory(logs, categories) {
    const result = {};
    categories.forEach((cat) => {
        result[cat.id] = {
            ...cat,
            totalMinutes: 0,
            logCount: 0,
        };
    });

    logs.forEach((log) => {
        if (result[log.categoryId]) {
            result[log.categoryId].totalMinutes += log.duration;
            result[log.categoryId].logCount += 1;
        }
    });

    return Object.values(result);
}

/**
 * 数値にカンマ区切りを追加
 */
export function formatNumber(num) {
    return num.toLocaleString('ja-JP');
}

/**
 * パーセンテージを計算
 */
export function calcPercentage(value, total) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}
