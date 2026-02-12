import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Sidebar.css';

const navItems = [
    { path: '/', icon: '📊', label: 'ダッシュボード' },
    { path: '/categories', icon: '📂', label: 'カテゴリ' },
    { path: '/progress', icon: '📝', label: '学習ログ' },
    { path: '/skills', icon: '🎯', label: 'スキルマップ' },
    { path: '/goals', icon: '🏆', label: 'ウィークリーゴール' },
];

export default function Sidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <button
                className="sidebar-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="メニューを開く"
            >
                ☰
            </button>

            {mobileOpen && (
                <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
            )}

            <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">🚀</div>
                    <div className="sidebar-logo-text">
                        <span>Learning Management</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-nav-item ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setMobileOpen(false)}
                            end={item.path === '/'}
                        >
                            <span className="sidebar-nav-icon">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <p className="sidebar-footer-text">Learning Management v1.0</p>
                </div>
            </aside>
        </>
    );
}
