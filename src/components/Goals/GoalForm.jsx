import { useState } from 'react';
import { generateId } from '../../utils/helpers';
import './GoalForm.css';

export default function GoalForm({ categories, onSubmit, onClose, editItem }) {
    const [title, setTitle] = useState(editItem?.title || '');
    const [categoryId, setCategoryId] = useState(editItem?.categoryId || categories[0]?.id || '');

    const isEdit = !!editItem;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({
            id: isEdit ? editItem.id : generateId(),
            title: title.trim(),
            categoryId,
            completed: isEdit ? editItem.completed : false,
            weekStart: isEdit ? editItem.weekStart : getLatestMonday(),
        });
        onClose();
    };

    return (
        <div className="goal-form-overlay" onClick={onClose}>
            <form
                className="goal-form"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <h3 className="goal-form-title">
                    {isEdit ? '✏️ ゴールを編集' : '🏆 新しいゴール'}
                </h3>

                <div className="goal-form-group">
                    <label className="goal-form-label">目標</label>
                    <input
                        className="input-field"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="例: TypeScript の型システムを理解する"
                        required
                    />
                </div>

                <div className="goal-form-group">
                    <label className="goal-form-label">カテゴリ</label>
                    <select
                        className="input-field"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.icon} {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="goal-form-actions">
                    <button type="button" className="btn-secondary" onClick={onClose}>
                        キャンセル
                    </button>
                    <button type="submit" className="btn-primary">
                        {isEdit ? '更新する' : '追加する'}
                    </button>
                </div>
            </form>
        </div>
    );
}

function getLatestMonday() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString();
}
