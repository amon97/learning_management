import { formatDuration } from '../../utils/helpers';
import './ProgressChart.css';

export default function ProgressChart({ logs, categories }) {
    const categoryStats = categories.map((cat) => {
        const catLogs = logs.filter((l) => l.categoryId === cat.id);
        const totalMinutes = catLogs.reduce((sum, l) => sum + l.duration, 0);
        return { ...cat, totalMinutes };
    });

    const maxMinutes = Math.max(...categoryStats.map((c) => c.totalMinutes), 1);

    return (
        <div className="glass-card progress-chart">
            <h3 className="progress-chart-title">📈 カテゴリ別学習時間</h3>
            <div className="progress-chart-bars">
                {categoryStats.map((cat) => {
                    const percentage = (cat.totalMinutes / maxMinutes) * 100;
                    return (
                        <div key={cat.id} className="progress-bar-row">
                            <div className="progress-bar-label">
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                            </div>
                            <div className="progress-bar-track">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${percentage}%`,
                                        background: `linear-gradient(90deg, ${cat.color}, ${cat.color}aa)`,
                                    }}
                                />
                            </div>
                            <div className="progress-bar-value">
                                {formatDuration(cat.totalMinutes)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
