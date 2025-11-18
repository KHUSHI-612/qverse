import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { api } from '../service/api.js';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ questionsCount: 0, answersCount: 0 });
  const [loadingStats, setLoadingStats] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('qverse_auth');
    if (!raw) {
      navigate('/login');
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if (!parsed?.user) {
        navigate('/login');
        return;
      }
      setUser(parsed.user);
      fetchStats();
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const fetchStats = async () => {
    setLoadingStats(true);
    setError('');
    try {
      const { data } = await api.get('/profile/stats');
      setStats({
        questionsCount: data?.questionsCount ?? 0,
        answersCount: data?.answersCount ?? 0
      });
    } catch (err) {
      console.error('Profile stats error:', err);
      if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
        setError('Cannot connect to server. Make sure the backend is running.');
      } else if (err?.response?.status === 401) {
        navigate('/login');
      } else {
        setError(err?.response?.data?.message || err?.message || 'Failed to load profile stats');
      }
    } finally {
      setLoadingStats(false);
    }
  };

  if (!user) {
    return (
      <div className="layout">
        <Header />
        <main className="profile-main">
          <div className="profile-layout">
            <p className="muted">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div className="layout">
      <Header />
      <main className="profile-main">
        <div className="profile-layout">
          <section className="card profile-header-card">
            <div className="profile-header-top">
              <div className="profile-avatar">{initials || '?'}</div>
              <div className="profile-header-text">
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-role">{user.role === 'admin' ? 'Admin' : 'Member'}</p>
              </div>
            </div>
            <div className="profile-info-grid">
              <div className="profile-info-card">
                <p className="profile-stat-label">Name</p>
                <p className="profile-info-value">{user.name}</p>
              </div>
              <div className="profile-info-card">
                <p className="profile-stat-label">Email</p>
                <p className="profile-info-value">{user.email}</p>
              </div>
            </div>
          </section>

          <section className="card profile-stats-card">
            <div className="profile-stats-header">
              <h3 className="profile-section-title">Activity</h3>
            </div>
            {error ? (
              <p className="error" style={{ marginTop: '8px' }}>{error}</p>
            ) : null}
            <div className="profile-stats-grid">
              <div className="profile-stat">
                <p className="profile-stat-label">Questions asked</p>
                <p className="profile-stat-value">
                  {loadingStats ? '...' : stats.questionsCount}
                </p>
              </div>
              <div className="profile-stat">
                <p className="profile-stat-label">Answers given</p>
                <p className="profile-stat-value">
                  {loadingStats ? '...' : stats.answersCount}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}






