import StatsCard from '../components/Dashboard/StatsCard';
import ActivityFeed from '../components/Dashboard/ActivityFeed';
import ProgressChart from '../components/Dashboard/ProgressChart';
import { formatDuration, getThisWeekLogs, calcPercentage } from '../utils/helpers';
import './DashboardPage.css';

export default function DashboardPage({ logs, categories, goals }) {
    const thisWeekLogs = getThisWeekLogs(logs);
    const totalMinutes = logs.reduce((sum, l) => sum + l.duration, 0);
    const weekMinutes = thisWeekLogs.reduce((sum, l) => sum + l.duration, 0);
    const completedGoals = goals.filter((g) => g.completed).length;
    const goalPercentage = goals.length > 0 ? calcPercentage(completedGoals, goals.length) : 0;

    return (
        <div className="dashboard-page">
            <h1 className="page-title gradient-text">ダッシュボード</h1>
            <p className="page-subtitle">学習の全体像を把握しましょう</p>

            <div className="dashboard-stats">
                <StatsCard
                    icon="🕒"
                    label="総学習時間"
                    value={formatDuration(totalMinutes)}
                    variant="purple"
                    delay={0}
                />
                <StatsCard
                    icon="📅"
                    label="今週の学習時間"
                    value={formatDuration(weekMinutes)}
                    trend={12}
                    trendLabel="先週比"
                    variant="cyan"
                    delay={80}
                />
                <StatsCard
                    icon="📝"
                    label="学習ログ数"
                    value={`${logs.length}件`}
                    variant="warm"
                    delay={160}
                />
                <StatsCard
                    icon="🏆"
                    label="ゴール達成率"
                    value={`${goalPercentage}%`}
                    variant="green"
                    delay={240}
                />
            </div>

            <div className="dashboard-grid">
                <ProgressChart logs={logs} categories={categories} />
                <ActivityFeed logs={logs} categories={categories} />
            </div>
        </div>
    );
}
