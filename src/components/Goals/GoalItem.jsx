import './GoalItem.css';

export default function GoalItem({ goal, category, onToggle, onDelete, delay = 0 }) {
    const cat = category || { icon: '📌', name: '不明' };

    return (
        <div
            className={`goal-item ${goal.completed ? 'completed' : ''}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <button
                className="goal-item-check"
                onClick={() => onToggle(goal.id)}
                title={goal.completed ? '未完了に戻す' : '完了にする'}
            >
                ✓
            </button>
            <div className="goal-item-content">
                <div className="goal-item-title">{goal.title}</div>
                <div className="goal-item-category">
                    {cat.icon} {cat.name}
                </div>
            </div>
            <button
                className="goal-item-delete"
                onClick={() => onDelete(goal.id)}
                title="削除"
            >
                ✕
            </button>
        </div>
    );
}
