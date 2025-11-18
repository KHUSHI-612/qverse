import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../service/api.js';
import Header from '../components/Header.jsx';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('qverse_auth', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
        setError('Cannot connect to server. Make sure the backend is running.');
      } else {
        setError(err?.response?.data?.message || err?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Header />
      <main className="center-wrap">
      <div className="card">
        <h2 className="title">Login</h2>
        <p className="subtitle">Welcome back! Enter your details to continue.</p>
        <form onSubmit={onSubmit} className="form">
          <input className="input" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="button" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          {error ? <div className="error">{error}</div> : null}
        </form>
        <p className="muted" style={{ marginTop: 10 }}>
          No account? <Link className="link" to="/signup">Create one</Link>
        </p>
      </div>
      </main>
    </div>
  );
}


