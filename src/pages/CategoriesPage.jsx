import { useState } from 'react';
import CategoryCard from '../components/Categories/CategoryCard';
import CategoryForm from '../components/Categories/CategoryForm';
import { useDragReorder } from '../hooks/useDragReorder';
import './CategoriesPage.css';

const sortOptions = [
    { value: 'default', label: '手動 (ドラッグ&ドロップ)' },
    { value: 'name-asc', label: '名前 A→Z' },
    { value: 'name-desc', label: '名前 Z→A' },
    { value: 'logs-desc', label: 'ログ数 多い順' },
    { value: 'logs-asc', label: 'ログ数 少ない順' },
    { value: 'time-desc', label: '学習時間 多い順' },
    { value: 'time-asc', label: '学習時間 少ない順' },
];

export default function CategoriesPage({ categories, setCategories, logs }) {
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [sortBy, setSortBy] = useState('default');
    const { getDragProps, dragOverIndex } = useDragReorder(categories, setCategories);

    const handleAddCategory = (newCat) => {
        setCategories([...categories, newCat]);
    };

    const handleUpdateCategory = (updated) => {
        setCategories(
            categories.map((c) => (c.id === updated.id ? updated : c))
        );
        setEditingCategory(null);
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('このカテゴリを削除してもよろしいですか？')) {
            setCategories(categories.filter((c) => c.id !== id));
        }
    };

    const handleEditCategory = (cat) => {
        setEditingCategory(cat);
    };

    const getCatLogs = (catId) => logs.filter((l) => l.categoryId === catId);
    const getCatTime = (catId) => getCatLogs(catId).reduce((s, l) => s + l.duration, 0);

    const isManualSort = sortBy === 'default';

    const sortedCategories = isManualSort
        ? categories
        : [...categories].sort((a, b) => {
            switch (sortBy) {
                case 'name-asc': return a.name.localeCompare(b.name, 'ja');
                case 'name-desc': return b.name.localeCompare(a.name, 'ja');
                case 'logs-desc': return getCatLogs(b.id).length - getCatLogs(a.id).length;
                case 'logs-asc': return getCatLogs(a.id).length - getCatLogs(b.id).length;
                case 'time-desc': return getCatTime(b.id) - getCatTime(a.id);
                case 'time-asc': return getCatTime(a.id) - getCatTime(b.id);
                default: return 0;
            }
        });

    return (
        <div className="categories-page">
            <div className="categories-page-header">
                <div>
                    <h1 className="page-title gradient-text">カテゴリ</h1>
                    <p className="page-subtitle">学習分野を管理しましょう</p>
                </div>
                <button className="btn-primary" onClick={() => setShowForm(true)}>
                    ＋ 新しいカテゴリ
                </button>
            </div>

            {categories.length > 1 && (
                <div className="sort-bar">
                    <span className="sort-bar-label">🔀 並び替え</span>
                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        {sortOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {isManualSort && (
                        <span className="drag-hint">↕ カードをドラッグして並び替え</span>
                    )}
                </div>
            )}

            {categories.length === 0 ? (
                <div className="categories-empty">
                    <div className="categories-empty-icon">📂</div>
                    <p>カテゴリがありません。追加してみましょう！</p>
                </div>
            ) : (
                <div className="categories-grid">
                    {sortedCategories.map((cat, i) => (
                        <div
                            key={cat.id}
                            className={`drag-wrapper ${isManualSort ? 'draggable' : ''} ${dragOverIndex === i && isManualSort ? 'drag-over' : ''}`}
                            {...(isManualSort ? getDragProps(i) : {})}
                        >
                            <CategoryCard
                                category={cat}
                                logs={logs}
                                onDelete={handleDeleteCategory}
                                onEdit={handleEditCategory}
                                delay={i * 80}
                            />
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <CategoryForm
                    onSubmit={handleAddCategory}
                    onClose={() => setShowForm(false)}
                />
            )}

            {editingCategory && (
                <CategoryForm
                    editItem={editingCategory}
                    onSubmit={handleUpdateCategory}
                    onClose={() => setEditingCategory(null)}
                />
            )}
        </div>
    );
}
