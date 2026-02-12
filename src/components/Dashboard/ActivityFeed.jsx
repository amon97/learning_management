import { formatRelativeTime, formatDuration } from '../../utils/helpers';
import './ActivityFeed.css';

export default function ActivityFeed({ logs, categories }) {
    const recentLogs = [...logs]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    const getCategoryInfo = (categoryId) => {
        return categories.find((c) => c.id === categoryId) || { icon: '📌', name: '不明', color: '#666' };
    };

    return (
        <div className="glass-card activity-feed">
            <h3 className="activity-feed-title">⚡ 最近のアクティビティ</h3>
            {recentLogs.length === 0 ? (
                <div className="activity-feed-empty">
                    まだ学習ログがありません。<br />最初の学習を記録しましょう！
                </div>
            ) : (
                <div className="activity-feed-list">
                    {recentLogs.map((log) => {
                        const cat = getCategoryInfo(log.categoryId);
                        return (
                            <div key={log.id} className="activity-feed-item">
                                <div
                                    className="activity-feed-item-icon"
                                    style={{ background: `${cat.color}20`, color: cat.color }}
                                >
                                    {cat.icon}
                                </div>
                                <div className="activity-feed-item-content">
                                    <div className="activity-feed-item-title">{log.title}</div>
                                    <div className="activity-feed-item-meta">
                                        <span>{cat.name}</span>
                                        <span>🕒 {formatDuration(log.duration)}</span>
                                        <span>{formatRelativeTime(log.date)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
