import { useState } from 'react';
import GoalItem from '../components/Goals/GoalItem';
import GoalForm from '../components/Goals/GoalForm';
import { calcPercentage } from '../utils/helpers';
import './GoalsPage.css';

export default function GoalsPage({ goals, setGoals, categories }) {
    const [showForm, setShowForm] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    const completedCount = goals.filter((g) => g.completed).length;
    const percentage = calcPercentage(completedCount, goals.length);

    const handleAddGoal = (newGoal) => {
        setGoals([...goals, newGoal]);
    };

    const handleUpdateGoal = (updated) => {
        setGoals(goals.map((g) => (g.id === updated.id ? updated : g)));
        setEditingGoal(null);
    };

    const handleToggleGoal = (id) => {
        setGoals(
            goals.map((g) =>
                g.id === id ? { ...g, completed: !g.completed } : g
            )
        );
    };

    const handleDeleteGoal = (id) => {
        setGoals(goals.filter((g) => g.id !== id));
    };

    const handleEditGoal = (goal) => {
        setEditingGoal(goal);
    };

    const getCategory = (categoryId) =>
        categories.find((c) => c.id === categoryId);

    return (
        <div className="goals-page">
            <div className="goals-page-header">
                <div>
                    <h1 className="page-title gradient-text">ウィークリーゴール</h1>
                    <p className="page-subtitle">今週の学習目標を管理しましょう</p>
                </div>
                <button className="btn-primary" onClick={() => setShowForm(true)}>
                    ＋ ゴールを追加
                </button>
            </div>

            <div className="goals-summary">
                <div className="glass-card goals-summary-card">
                    <div className="goals-summary-value" style={{ color: 'var(--color-primary-light)' }}>
                        {goals.length}
                    </div>
                    <div className="goals-summary-label">目標数</div>
                </div>
                <div className="glass-card goals-summary-card">
                    <div className="goals-summary-value" style={{ color: 'var(--color-accent-green)' }}>
                        {completedCount}
                    </div>
                    <div className="goals-summary-label">達成済み</div>
                </div>
                <div className="glass-card goals-summary-card">
                    <div className="goals-summary-value" style={{ color: 'var(--color-accent-orange)' }}>
                        {goals.length - completedCount}
                    </div>
                    <div className="goals-summary-label">残り</div>
                </div>
            </div>

            {goals.length > 0 && (
                <div className="goals-progress-bar">
                    <div className="goals-progress-header">
                        <span>達成率</span>
                        <span style={{ color: 'var(--color-accent-green)', fontWeight: 700 }}>
                            {percentage}%
                        </span>
                    </div>
                    <div className="goals-progress-track">
                        <div
                            className="goals-progress-fill"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
            )}

            {goals.length === 0 ? (
                <div className="goals-empty">
                    <div className="goals-empty-icon">🏆</div>
                    <p>ゴールがありません。今週の目標を設定しましょう！</p>
                </div>
            ) : (
                <div className="goals-list">
                    {goals.map((goal, i) => (
                        <GoalItem
                            key={goal.id}
                            goal={goal}
                            category={getCategory(goal.categoryId)}
                            onToggle={handleToggleGoal}
                            onDelete={handleDeleteGoal}
                            onEdit={handleEditGoal}
                            delay={i * 60}
                        />
                    ))}
                </div>
            )}

            {showForm && (
                <GoalForm
                    categories={categories}
                    onSubmit={handleAddGoal}
                    onClose={() => setShowForm(false)}
                />
            )}

            {editingGoal && (
                <GoalForm
                    categories={categories}
                    editItem={editingGoal}
                    onSubmit={handleUpdateGoal}
                    onClose={() => setEditingGoal(null)}
                />
            )}
        </div>
    );
}
