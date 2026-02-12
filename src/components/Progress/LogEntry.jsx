import { formatRelativeTime, formatDuration } from '../../utils/helpers';
import './LogEntry.css';

export default function LogEntry({ log, category, onDelete, delay = 0, isLast = false }) {
    const cat = category || { icon: '📌', name: '不明', color: '#666' };

    return (
        <div className="log-entry" style={{ animationDelay: `${delay}ms` }}>
            <div className="log-entry-timeline">
                <div className="log-entry-dot" style={{ background: cat.color }} />
                {!isLast && <div className="log-entry-line" />}
            </div>
            <div className="log-entry-content">
                <div className="log-entry-header">
                    <div className="log-entry-title">{log.title}</div>
                    <button
                        className="log-entry-delete"
                        onClick={() => onDelete(log.id)}
                        title="削除"
                    >
                        ✕
                    </button>
                </div>
                {log.description && (
                    <div className="log-entry-desc">{log.description}</div>
                )}
                <div className="log-entry-meta">
                    <span
                        className="log-entry-category-badge"
                        style={{ background: `${cat.color}20`, color: cat.color }}
                    >
                        {cat.icon} {cat.name}
                    </span>
                    <span>🕒 {formatDuration(log.duration)}</span>
                    <span>{formatRelativeTime(log.date)}</span>
                </div>
            </div>
        </div>
    );
}
