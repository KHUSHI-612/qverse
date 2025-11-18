import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../service/api.js';
import Header from '../components/Header.jsx';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('qverse_auth', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
        setError('Cannot connect to server. Make sure the backend is running.');
      } else {
        setError(err?.response?.data?.message || err?.message || 'Signup failed');
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
        <h2 className="title">Create account</h2>
        <p className="subtitle">Join Qverse to ask questions and share answers.</p>
        <form onSubmit={onSubmit} className="form">
          <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="input" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="button" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
          {error ? <div className="error">{error}</div> : null}
        </form>
        <p className="muted" style={{ marginTop: 10 }}>
          Have an account? <Link className="link" to="/login">Login</Link>
        </p>
      </div>
      </main>
    </div>
  );
}


