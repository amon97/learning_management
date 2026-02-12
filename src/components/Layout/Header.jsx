import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

export default function Header() {
    const { user, signOut } = useAuth();

    const now = new Date();
    const dateStr = now.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
    });

    const hour = now.getHours();
    let greeting = 'おはようございます';
    if (hour >= 12 && hour < 18) greeting = 'こんにちは';
    else if (hour >= 18) greeting = 'こんばんは';

    const displayName = user?.displayName || 'ユーザー';
    const initials = displayName.slice(0, 2);

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (err) {
            console.error('Sign out error:', err);
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <h2 className="header-greeting">
                    {greeting}、{displayName} <span>今日も学びを積み重ねよう</span>
                </h2>
            </div>
            <div className="header-right">
                <div className="header-date">📅 {dateStr}</div>
                <button className="header-logout-btn" onClick={handleSignOut} title="ログアウト">
                    ログアウト
                </button>
                {user?.photoURL ? (
                    <img
                        className="header-avatar-img"
                        src={user.photoURL}
                        alt={displayName}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="header-avatar">{initials}</div>
                )}
            </div>
        </header>
    );
}
