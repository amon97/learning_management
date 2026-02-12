import { useState } from 'react';
import CategoryCard from '../components/Categories/CategoryCard';
import CategoryForm from '../components/Categories/CategoryForm';
import './CategoriesPage.css';

export default function CategoriesPage({ categories, setCategories, logs }) {
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

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

            {categories.length === 0 ? (
                <div className="categories-empty">
                    <div className="categories-empty-icon">📂</div>
                    <p>カテゴリがありません。追加してみましょう！</p>
                </div>
            ) : (
                <div className="categories-grid">
                    {categories.map((cat, i) => (
                        <CategoryCard
                            key={cat.id}
                            category={cat}
                            logs={logs}
                            onDelete={handleDeleteCategory}
                            onEdit={handleEditCategory}
                            delay={i * 80}
                        />
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
