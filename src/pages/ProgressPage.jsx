import { useState } from 'react';
import LogEntry from '../components/Progress/LogEntry';
import LogForm from '../components/Progress/LogForm';
import { useDragReorder } from '../hooks/useDragReorder';
import './ProgressPage.css';

const sortOptions = [
    { value: 'manual', label: '手動 (ドラッグ&ドロップ)' },
    { value: 'date-desc', label: '新しい順' },
    { value: 'date-asc', label: '古い順' },
    { value: 'duration-desc', label: '学習時間 長い順' },
    { value: 'duration-asc', label: '学習時間 短い順' },
    { value: 'title-asc', label: 'タイトル A→Z' },
    { value: 'title-desc', label: 'タイトル Z→A' },
];

export default function ProgressPage({ logs, setLogs, categories }) {
    const [showForm, setShowForm] = useState(false);
    const [editingLog, setEditingLog] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const { getDragProps, dragOverIndex } = useDragReorder(logs, setLogs);

    const handleAddLog = (newLog) => {
        setLogs([newLog, ...logs]);
    };

    const handleUpdateLog = (updated) => {
        setLogs(logs.map((l) => (l.id === updated.id ? updated : l)));
        setEditingLog(null);
    };

    const handleDeleteLog = (id) => {
        setLogs(logs.filter((l) => l.id !== id));
    };

    const handleEditLog = (log) => {
        setEditingLog(log);
    };

    const isManualSort = sortBy === 'manual';

    const filteredLogs = filterCategory === 'all'
        ? logs
        : logs.filter((l) => l.categoryId === filterCategory);

    const sortedLogs = isManualSort
        ? filteredLogs
        : [...filteredLogs].sort((a, b) => {
            switch (sortBy) {
                case 'date-desc': return new Date(b.date) - new Date(a.date);
                case 'date-asc': return new Date(a.date) - new Date(b.date);
                case 'duration-desc': return b.duration - a.duration;
                case 'duration-asc': return a.duration - b.duration;
                case 'title-asc': return a.title.localeCompare(b.title, 'ja');
                case 'title-desc': return b.title.localeCompare(a.title, 'ja');
                default: return new Date(b.date) - new Date(a.date);
            }
        });

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

            <div className="progress-controls">
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

                {logs.length > 1 && (
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
                            <span className="drag-hint">↕ ログをドラッグして並び替え</span>
                        )}
                    </div>
                )}
            </div>

            {sortedLogs.length === 0 ? (
                <div className="progress-empty">
                    <div className="progress-empty-icon">📝</div>
                    <p>まだ学習ログがありません。学んだことを記録しましょう！</p>
                </div>
            ) : (
                <div className="progress-log-list">
                    {sortedLogs.map((log, i) => (
                        <div
                            key={log.id}
                            className={`drag-wrapper ${isManualSort ? 'draggable' : ''} ${dragOverIndex === i && isManualSort ? 'drag-over' : ''}`}
                            {...(isManualSort ? getDragProps(i) : {})}
                        >
                            <LogEntry
                                log={log}
                                category={getCategory(log.categoryId)}
                                onDelete={handleDeleteLog}
                                onEdit={handleEditLog}
                                delay={i * 60}
                                isLast={i === sortedLogs.length - 1}
                            />
                        </div>
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

            {editingLog && (
                <LogForm
                    categories={categories}
                    editItem={editingLog}
                    onSubmit={handleUpdateLog}
                    onClose={() => setEditingLog(null)}
                />
            )}
        </div>
    );
}
