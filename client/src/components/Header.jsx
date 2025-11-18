import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeProvider.jsx';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const raw = localStorage.getItem('qverse_auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
      } catch {}
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('qverse_auth');
    setUser(null);
    navigate('/login');
  };

  const getNavLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? 'var(--accent)' : 'var(--text)',
      textDecoration: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      transition: 'background 0.2s',
      fontSize: '14px',
      background: isActive ? 'var(--input)' : 'transparent',
      fontWeight: isActive ? '600' : '400'
    };
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/" className="brand" style={{ textDecoration: 'none', color: 'var(--text)' }}>
          Qverse
        </Link>
        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link to="/" style={getNavLinkStyle('/')}>Home</Link>
          {user ? (
            <>
              <Link to="/ask" style={getNavLinkStyle('/ask')}>Ask Question</Link>
              <Link to="/profile" style={getNavLinkStyle('/profile')}>Profile</Link>
            </>
          ) : (
            <Link to="/login" style={getNavLinkStyle('/login')}>Login</Link>
          )}
        </nav>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {user && (
          <span style={{ fontSize: '14px', color: 'var(--muted)', marginRight: '8px' }}>
            {user.name}
          </span>
        )}
        {user ? (
          <button className="toggle" onClick={logout}>Logout</button>
        ) : (
          <Link to="/signup" className="toggle" style={{ textDecoration: 'none' }}>Signup</Link>
        )}
        <button aria-label="Toggle theme" title="Toggle theme" className="toggle" onClick={toggle}>
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="var(--text)" strokeWidth="1.8" fill="none"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" stroke="var(--text)" strokeWidth="1.8"/>
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="var(--text)" strokeWidth="1.8"/>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
