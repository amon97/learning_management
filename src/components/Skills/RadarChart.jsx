import { useRef, useEffect } from 'react';
import './RadarChart.css';

export default function RadarChart({ skills, categories, onSkillChange }) {
    const canvasRef = useRef(null);

    const getCategory = (categoryId) =>
        categories.find((c) => c.id === categoryId) || { name: '不明', icon: '📌', color: '#666' };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || skills.length === 0) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const size = 340;
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

        // Draw grid circles
        for (let i = 1; i <= 5; i++) {
            const r = (maxRadius / 5) * i;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, 2 * Math.PI);
            ctx.strokeStyle = `rgba(108, 92, 231, ${0.08 + i * 0.03})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Draw axis lines
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

        // Draw data polygon
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

        // Draw data points and labels
        skills.forEach((skill, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const r = (skill.level / 100) * maxRadius;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);

            // Data point
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#6c5ce7';
            ctx.fill();
            ctx.strokeStyle = '#a29bfe';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label
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
        <div className="glass-card radar-chart-container">
            <h3 className="radar-chart-title">🎯 スキルレーダー</h3>
            <canvas ref={canvasRef} className="radar-chart-canvas" />

            <div className="skill-level-list">
                {skills.map((skill) => {
                    const cat = getCategory(skill.categoryId);
                    return (
                        <div key={skill.categoryId} className="skill-level-row">
                            <div className="skill-level-label">
                                {cat.icon} {cat.name}
                            </div>
                            <input
                                type="range"
                                className="skill-level-slider"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) =>
                                    onSkillChange(skill.categoryId, Number(e.target.value))
                                }
                            />
                            <div className="skill-level-value" style={{ color: cat.color }}>
                                {skill.level}%
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
