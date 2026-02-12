import { useState } from 'react';
import { generateId } from '../../utils/helpers';
import './LogForm.css';

export default function LogForm({ categories, onSubmit, onClose, editItem }) {
    const [title, setTitle] = useState(editItem?.title || '');
    const [description, setDescription] = useState(editItem?.description || '');
    const [categoryId, setCategoryId] = useState(editItem?.categoryId || categories[0]?.id || '');
    const [duration, setDuration] = useState(editItem?.duration || 30);

    const isEdit = !!editItem;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !categoryId) return;
        onSubmit({
            id: isEdit ? editItem.id : generateId(),
            title: title.trim(),
            description: description.trim(),
            categoryId,
            duration: Number(duration),
            date: isEdit ? editItem.date : new Date().toISOString(),
        });
        onClose();
    };

    return (
        <div className="log-form-overlay" onClick={onClose}>
            <form
                className="log-form"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <h3 className="log-form-title">
                    {isEdit ? '✏️ ログを編集' : '📝 学習ログを追加'}
                </h3>

                <div className="log-form-group">
                    <label className="log-form-label">タイトル</label>
                    <input
                        className="input-field"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="例: React Server Components の学習"
                        required
                    />
                </div>

                <div className="log-form-row">
                    <div className="log-form-group">
                        <label className="log-form-label">カテゴリ</label>
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

                    <div className="log-form-group">
                        <label className="log-form-label">学習時間（分）</label>
                        <input
                            className="input-field"
                            type="number"
                            min="1"
                            max="480"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>
                </div>

                <div className="log-form-group">
                    <label className="log-form-label">メモ（任意）</label>
                    <textarea
                        className="input-field"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="学習した内容のメモ..."
                    />
                </div>

                <div className="log-form-actions">
                    <button type="button" className="btn-secondary" onClick={onClose}>
                        キャンセル
                    </button>
                    <button type="submit" className="btn-primary">
                        {isEdit ? '更新する' : '記録する'}
                    </button>
                </div>
            </form>
        </div>
    );
}
