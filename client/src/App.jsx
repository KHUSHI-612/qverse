import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useTheme } from './theme/ThemeProvider.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function Home() {
  const navigate = useNavigate();
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
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="brand">Qverse</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {user ? <button className="toggle" onClick={logout}>Logout</button> : null}
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
      <main className="center-wrap">
        <div className="hero">
          <h1 className="hero-title">Welcome to Qverse</h1>
          {user ? (
            <p className="hero-subtitle">Logged in as {user.name}. Use the toggle to switch theme.</p>
          ) : (
            <p className="hero-subtitle">
              <Link className="link" to="/login">Login</Link> or <Link className="link" to="/signup">Signup</Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}


