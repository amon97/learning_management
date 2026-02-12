import { useRef, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultCategories, sampleLogs, defaultSkills } from '../data/initialData';
import { formatDuration, formatRelativeTime } from '../utils/helpers';
import './PublicProfilePage.css';

export default function PublicProfilePage() {
    const [categories] = useLocalStorage('ag_categories', defaultCategories);
    const [logs] = useLocalStorage('ag_logs', sampleLogs);
    const [skills] = useLocalStorage('ag_skills', defaultSkills);

    // Read saved profile from localStorage
    const profileRaw = localStorage.getItem('ag_profile');
    const profile = profileRaw
        ? JSON.parse(profileRaw)
        : { displayName: '', photoURL: '', email: '' };
    const userName = profile.displayName || 'Engineer';

    const canvasRef = useRef(null);

    const getCategory = (id) =>
        categories.find((c) => c.id === id) || { icon: '📌', name: '不明', color: '#666' };

    const totalMinutes = logs.reduce((sum, l) => sum + l.duration, 0);
    const recentLogs = [...logs]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);

    const categoryStats = categories.map((cat) => {
        const catLogs = logs.filter((l) => l.categoryId === cat.id);
        return {
            ...cat,
            logCount: catLogs.length,
            totalMinutes: catLogs.reduce((sum, l) => sum + l.duration, 0),
        };
    });

    // Draw radar chart
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || skills.length === 0) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const size = 320;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        ctx.scale(dpr, dpr);

        const cx = size / 2;
        const cy = size / 2;
        const maxRadius = size / 2 - 40;
        const n = skills.length;
        const angleStep = (2 * Math.PI) / n;

        ctx.clearRect(0, 0, size, size);

        // Grid circles
        for (let i = 1; i <= 5; i++) {
            const r = (maxRadius / 5) * i;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, 2 * Math.PI);
            ctx.strokeStyle = `rgba(108, 92, 231, ${0.08 + i * 0.03})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Axis lines
        for (let i = 0; i < n; i++) {
            const angle = angleStep * i - Math.PI / 2;
            const x = cx + maxRadius * Math.cos(angle);
            const y = cy + maxRadius * Math.sin(angle);
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(108, 92, 231, 0.12)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Data polygon
        ctx.beginPath();
        skills.forEach((skill, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const r = (skill.level / 100) * maxRadius;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
        gradient.addColorStop(0, 'rgba(108, 92, 231, 0.35)');
        gradient.addColorStop(1, 'rgba(162, 155, 254, 0.15)');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(108, 92, 231, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Data points & labels
        skills.forEach((skill, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const r = (skill.level / 100) * maxRadius;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#6c5ce7';
            ctx.fill();
            ctx.strokeStyle = '#a29bfe';
            ctx.lineWidth = 2;
            ctx.stroke();

            const cat = getCategory(skill.categoryId);
            const labelR = maxRadius + 22;
            const lx = cx + labelR * Math.cos(angle);
            const ly = cy + labelR * Math.sin(angle);
            ctx.fillStyle = '#a0a0c0';
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${cat.icon} ${cat.name}`, lx, ly);
        });
    }, [skills, categories]);

    return (
        <div className="public-profile">
            <div className="public-profile-container">
                {/* Header */}
                <div className="glass-card public-header">
                    {profile.photoURL ? (
                        <img
                            className="public-header-avatar"
                            src={profile.photoURL}
                            alt={userName}
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="public-header-logo">📚</div>
                    )}
                    <h1 className="public-header-title gradient-text">
                        {userName}
                    </h1>
                    <p className="public-header-subtitle">
                        エンジニア スキル & 学習進捗
                    </p>
                    <div className="public-header-badge">
                        🟢 アクティブに学習中 ・ {logs.length}件のログ
                    </div>
                </div>

                {/* Stats */}
                <div className="public-stats">
                    <div className="glass-card public-stat-card" style={{ animationDelay: '0ms' }}>
                        <div className="public-stat-value" style={{ color: 'var(--color-primary-light)' }}>
                            {formatDuration(totalMinutes)}
                        </div>
                        <div className="public-stat-label">総学習時間</div>
                    </div>
                    <div className="glass-card public-stat-card" style={{ animationDelay: '80ms' }}>
                        <div className="public-stat-value" style={{ color: 'var(--color-accent-cyan)' }}>
                            {logs.length}
                        </div>
                        <div className="public-stat-label">学習ログ数</div>
                    </div>
                    <div className="glass-card public-stat-card" style={{ animationDelay: '160ms' }}>
                        <div className="public-stat-value" style={{ color: 'var(--color-accent-green)' }}>
                            {categories.length}
                        </div>
                        <div className="public-stat-label">学習カテゴリ</div>
                    </div>
                </div>

                {/* Skill Radar */}
                <div className="public-radar-section">
                    <h2 className="public-section-title">🎯 スキルマップ</h2>
                    <div className="glass-card public-radar-card">
                        <canvas ref={canvasRef} />
                        <div className="public-skill-bars">
                            {skills.map((skill) => {
                                const cat = getCategory(skill.categoryId);
                                return (
                                    <div key={skill.categoryId} className="public-skill-row">
                                        <div className="public-skill-label">
                                            {cat.icon} {cat.name}
                                        </div>
                                        <div className="public-skill-track">
                                            <div
                                                className="public-skill-fill"
                                                style={{
                                                    width: `${skill.level}%`,
                                                    background: `linear-gradient(90deg, ${cat.color}, ${cat.color}aa)`,
                                                }}
                                            />
                                        </div>
                                        <div className="public-skill-value" style={{ color: cat.color }}>
                                            {skill.level}%
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Category Progress */}
                <div className="public-progress-section">
                    <h2 className="public-section-title">📊 カテゴリ別 学習進捗</h2>
                    <div className="public-category-progress">
                        {categoryStats.map((cat, i) => (
                            <div
                                key={cat.id}
                                className="glass-card public-category-card"
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <div className="public-category-card-header">
                                    <div
                                        className="public-category-card-icon"
                                        style={{ background: `${cat.color}20`, color: cat.color }}
                                    >
                                        {cat.icon}
                                    </div>
                                    <div className="public-category-card-name">{cat.name}</div>
                                </div>
                                <div className="public-category-card-stats">
                                    <span>📝 {cat.logCount}件</span>
                                    <span>🕒 {formatDuration(cat.totalMinutes)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="public-section-title">📝 最近の学習ログ</h2>
                    <div className="public-recent-logs">
                        {recentLogs.map((log, i) => {
                            const cat = getCategory(log.categoryId);
                            return (
                                <div
                                    key={log.id}
                                    className="public-log-item"
                                    style={{ animationDelay: `${i * 40}ms` }}
                                >
                                    <div className="public-log-dot" style={{ background: cat.color }} />
                                    <div className="public-log-content">
                                        <div className="public-log-title">{log.title}</div>
                                        <div className="public-log-meta">
                                            <span
                                                className="public-log-category-badge"
                                                style={{ background: `${cat.color}20`, color: cat.color }}
                                            >
                                                {cat.icon} {cat.name}
                                            </span>
                                            <span>🕒 {formatDuration(log.duration)}</span>
                                            <span>{formatRelativeTime(log.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="public-footer">
                    Powered by <a href="/">Learning Management</a> — エンジニア専用 学習進捗管理
                </div>
            </div>
        </div>
    );
}
