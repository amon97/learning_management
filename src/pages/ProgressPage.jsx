import { useState } from 'react';
import LogEntry from '../components/Progress/LogEntry';
import LogForm from '../components/Progress/LogForm';
import './ProgressPage.css';

export default function ProgressPage({ logs, setLogs, categories }) {
    const [showForm, setShowForm] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');

    const handleAddLog = (newLog) => {
        setLogs([newLog, ...logs]);
    };

    const handleDeleteLog = (id) => {
        setLogs(logs.filter((l) => l.id !== id));
    };

    const filteredLogs = filterCategory === 'all'
        ? logs
        : logs.filter((l) => l.categoryId === filterCategory);

    const sortedLogs = [...filteredLogs].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const getCategory = (categoryId) =>
        categories.find((c) => c.id === categoryId);

    return (
        <div className="progress-page">
            <div className="progress-page-header">
                <div>
                    <h1 className="page-title gradient-text">学習ログ</h1>
                    <p className="page-subtitle">あなたの学びの記録</p>
                </div>
                <button className="btn-primary" onClick={() => setShowForm(true)}>
                    ＋ ログを追加
                </button>
            </div>

            <div className="progress-page-filters">
                <button
                    className={`progress-filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterCategory('all')}
                >
                    すべて
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`progress-filter-btn ${filterCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setFilterCategory(cat.id)}
                    >
                        {cat.icon} {cat.name}
                    </button>
                ))}
            </div>

            {sortedLogs.length === 0 ? (
                <div className="progress-empty">
                    <div className="progress-empty-icon">📝</div>
                    <p>まだ学習ログがありません。学んだことを記録しましょう！</p>
                </div>
            ) : (
                <div className="progress-log-list">
                    {sortedLogs.map((log, i) => (
                        <LogEntry
                            key={log.id}
                            log={log}
                            category={getCategory(log.categoryId)}
                            onDelete={handleDeleteLog}
                            delay={i * 60}
                            isLast={i === sortedLogs.length - 1}
                        />
                    ))}
                </div>
            )}

            {showForm && (
                <LogForm
                    categories={categories}
                    onSubmit={handleAddLog}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
}
