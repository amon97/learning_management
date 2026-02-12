import { useState } from 'react';
import { generateId } from '../../utils/helpers';
import './CategoryForm.css';

const iconOptions = ['📚', '💻', '🎨', '⚙️', '☁️', '🔒', '💾', '🧮', '🌐', '📱', '🤖', '📊'];
const colorOptions = ['#6c5ce7', '#00cec9', '#fdcb6e', '#fd79a8', '#e17055', '#74b9ff', '#00b894', '#a29bfe'];

export default function CategoryForm({ onSubmit, onClose }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('📚');
    const [color, setColor] = useState('#6c5ce7');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit({
            id: generateId(),
            name: name.trim(),
            description: description.trim(),
            icon,
            color,
        });
        onClose();
    };

    return (
        <div className="category-form-overlay" onClick={onClose}>
            <form
                className="category-form"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <h3 className="category-form-title">📂 新しいカテゴリ</h3>

                <div className="category-form-group">
                    <label className="category-form-label">カテゴリ名</label>
                    <input
                        className="input-field"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="例: Machine Learning"
                        required
                    />
                </div>

                <div className="category-form-group">
                    <label className="category-form-label">説明</label>
                    <input
                        className="input-field"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="例: TensorFlow, PyTorch, scikit-learn"
                    />
                </div>

                <div className="category-form-group">
                    <label className="category-form-label">アイコン</label>
                    <div className="category-form-icon-picker">
                        {iconOptions.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                className={`category-form-icon-option ${icon === opt ? 'selected' : ''}`}
                                onClick={() => setIcon(opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="category-form-group">
                    <label className="category-form-label">カラー</label>
                    <div className="category-form-color-picker">
                        {colorOptions.map((c) => (
                            <button
                                key={c}
                                type="button"
                                className={`category-form-color-option ${color === c ? 'selected' : ''}`}
                                style={{ backgroundColor: c, color: c }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </div>
                </div>

                <div className="category-form-actions">
                    <button type="button" className="btn-secondary" onClick={onClose}>
                        キャンセル
                    </button>
                    <button type="submit" className="btn-primary">
                        追加する
                    </button>
                </div>
            </form>
        </div>
    );
}
