import { useState } from 'react';
import { formatDuration, formatRelativeTime } from '../../utils/helpers';
import './CategoryTabs.css';

export default function CategoryTabs({ logs, categories }) {
    const [activeTab, setActiveTab] = useState(null);

    const activeCategory = categories.find((c) => c.id === activeTab);
    const filteredLogs = activeTab
        ? [...logs]
            .filter((l) => l.categoryId === activeTab)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        : [];

    const totalMinutes = filteredLogs.reduce((sum, l) => sum + l.duration, 0);

    return (
        <div className="category-tabs">
            <h3 className="category-tabs-title">📂 カテゴリ別 進捗</h3>

            <div className="category-tabs-bar">
                {categories.map((cat) => {
                    const count = logs.filter((l) => l.categoryId === cat.id).length;
                    return (
                        <button
                            key={cat.id}
                            className={`category-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                            style={{ '--tab-color': cat.color }}
                            onClick={() =>
                                setActiveTab(activeTab === cat.id ? null : cat.id)
                            }
                        >
                            <span className="category-tab-icon">{cat.icon}</span>
                            {cat.name}
                            <span style={{ opacity: 0.5 }}>({count})</span>
                        </button>
                    );
                })}
            </div>

            {activeCategory && (
                <div className="glass-card category-tab-panel" key={activeTab}>
                    <div className="category-tab-panel-header">
                        <div className="category-tab-panel-info">
                            <div
                                className="category-tab-panel-icon"
                                style={{
                                    background: `${activeCategory.color}20`,
                                    color: activeCategory.color,
                                }}
                            >
                                {activeCategory.icon}
                            </div>
                            <div>
                                <div className="category-tab-panel-name">
                                    {activeCategory.name}
                                </div>
                                <div className="category-tab-panel-desc">
                                    {activeCategory.description}
                                </div>
                            </div>
                        </div>
                        <div className="category-tab-panel-stats">
                            <div className="category-tab-stat">
                                <div
                                    className="category-tab-stat-value"
                                    style={{ color: activeCategory.color }}
                                >
                                    {filteredLogs.length}
                                </div>
                                <div className="category-tab-stat-label">ログ数</div>
                            </div>
                            <div className="category-tab-stat">
                                <div
                                    className="category-tab-stat-value"
                                    style={{ color: activeCategory.color }}
                                >
                                    {formatDuration(totalMinutes)}
                                </div>
                                <div className="category-tab-stat-label">合計時間</div>
                            </div>
                        </div>
                    </div>

                    {filteredLogs.length === 0 ? (
                        <div className="category-tab-empty">
                            このカテゴリにはまだ学習ログがありません
                        </div>
                    ) : (
                        <div className="category-tab-logs">
                            {filteredLogs.map((log, i) => (
                                <div
                                    key={log.id}
                                    className="category-tab-log-item"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    <div
                                        className="category-tab-log-dot"
                                        style={{ background: activeCategory.color }}
                                    />
                                    <div className="category-tab-log-content">
                                        <div className="category-tab-log-title">{log.title}</div>
                                        {log.description && (
                                            <div className="category-tab-log-desc">
                                                {log.description}
                                            </div>
                                        )}
                                    </div>
                                    <div className="category-tab-log-meta">
                                        <span>🕒 {formatDuration(log.duration)}</span>
                                        <span>{formatRelativeTime(log.date)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
