import './StatsCard.css';

export default function StatsCard({ icon, label, value, trend, trendLabel, variant = 'purple', delay = 0 }) {
    return (
        <div
            className={`glass-card stats-card ${variant}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="stats-card-header">
                <div className="stats-card-icon">{icon}</div>
                {trend !== undefined && (
                    <span className={`stats-card-trend ${trend >= 0 ? 'up' : 'down'}`}>
                        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel || ''}
                    </span>
                )}
            </div>
            <div className="stats-card-value">{value}</div>
            <div className="stats-card-label">{label}</div>
        </div>
    );
}
