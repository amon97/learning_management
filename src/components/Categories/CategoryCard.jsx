import { formatDuration } from '../../utils/helpers';
import './CategoryCard.css';

export default function CategoryCard({ category, logs, onDelete, onEdit, delay = 0 }) {
    const catLogs = logs.filter((l) => l.categoryId === category.id);
    const totalMinutes = catLogs.reduce((sum, l) => sum + l.duration, 0);

    return (
        <div
            className="glass-card category-card"
            style={{
                animationDelay: `${delay}ms`,
                '--card-color': category.color,
            }}
        >
            <style>{`
        .category-card[style*="${category.color}"]::before {
          background: ${category.color};
        }
      `}</style>
            <div className="category-card-header">
                <div
                    className="category-card-icon"
                    style={{ background: `${category.color}20`, color: category.color }}
                >
                    {category.icon}
                </div>
                <div className="category-card-actions">
                    <button
                        className="category-card-action-btn edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(category);
                        }}
                        title="編集"
                    >
                        ✏️
                    </button>
                    <button
                        className="category-card-action-btn delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(category.id);
                        }}
                        title="削除"
                    >
                        🗑
                    </button>
                </div>
            </div>
            <div className="category-card-name">{category.name}</div>
            <div className="category-card-desc">{category.description}</div>
            <div className="category-card-stats">
                <span>📝 {catLogs.length}件のログ</span>
                <span>🕒 {formatDuration(totalMinutes)}</span>
            </div>
        </div>
    );
}
