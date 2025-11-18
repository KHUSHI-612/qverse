import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import RotatingText from '../components/RotatingText.jsx';
import FactsCarousel from '../components/factsCarousel.jsx';
import { api } from '../service/api.js';

export default function Home() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ questionsCount: 0, answersCount: 0, upvotes: 0, downvotes: 0, reputation: 0 });
  const [recentQuestion, setRecentQuestion] = useState(null);
  const [recentLoading, setRecentLoading] = useState(false);
  const [recentError, setRecentError] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('qverse_auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;
      try {
        const { data } = await api.get('/profile/stats');
        setStats({
          questionsCount: data?.questionsCount ?? 0,
          answersCount: data?.answersCount ?? 0,
          upvotes: data?.upvotes ?? 0,
          downvotes: data?.downvotes ?? 0,
          reputation: data?.reputation ?? 0
        });
      } catch (err) {
        console.error('Dashboard stats error:', err);
      }
    };

    loadStats();
  }, [user]);

  useEffect(() => {
    const loadRecent = async () => {
      setRecentError('');
      setRecentLoading(true);
      try {
        const { data } = await api.get('/questions');
        const list = Array.isArray(data) ? data : [];
        if (!list.length) {
          setRecentQuestion(null);
        } else {
         
          const sorted = [...list].sort((a, b) => {
            if (!a.createdAt || !b.createdAt) return 0;
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setRecentQuestion(sorted[0] || list[0]);
        }
      } catch (err) {
        console.error('Recent question error:', err);
        setRecentError('Failed to load recent question');
      } finally {
        setRecentLoading(false);
      }
    };

    loadRecent();
  }, []);

  return (
    <div className="layout">
      <Header />
      <main>
       
        <div className="hero-video-container">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="hero-video"
          >
            <source src="/home_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-video-overlay">
            <h1 className="hero-title-animated">Qverse</h1>
            <div style={{ marginTop: '16px', marginBottom: '24px' }}>
              <RotatingText />
            </div>
            {!user && (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
                <Link to="/signup" className="button" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  Get Started
                </Link>
                <Link to="/login" className="toggle" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>

        {user && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', marginBottom: '24px' }}>Your Dashboard</h2>
            <div className="card" style={{ maxWidth: '100%' }}>
              <p className="muted">Hello, <strong>{user.name}</strong>! Ready to explore questions and answers.</p>
              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--input)', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: 'var(--accent)' }}>Questions</h3>
                  <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{stats.questionsCount}</p>
                </div>
                <div style={{ padding: '16px', background: 'var(--input)', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: 'var(--accent)' }}>Answers</h3>
                  <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{stats.answersCount}</p>
                </div>
                <div style={{ padding: '16px', background: 'var(--input)', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: 'var(--accent)' }}>Reputation</h3>
                  <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{stats.reputation}</p>
                  <p className="muted" style={{ margin: '6px 0 0 0', fontSize: '13px' }}>
                    Total upvotes on your answers
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

   
        <div className="ask-question-section">
          <div className="ask-question-content">
            <h2 className="ask-question-title">
              Welcome to <span className="ask-question-highlight">Qverse's</span> own
              <br />
              <span className="ask-question-highlight">Question & Answer</span> Platform
            </h2>
            <p className="ask-question-subtitle">
              Join thousands of learners asking questions, sharing knowledge, and discovering answers together.
            </p>
            {user ? (
              <Link to="/ask" className="ask-question-button">
                Ask a Question
              </Link>
            ) : (
              <Link to="/signup" className="ask-question-button">
                Get Started
              </Link>
            )}
          </div>
        </div>

    
        <FactsCarousel />

       
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Recent Questions</h2>
          <div className="card" style={{ maxWidth: '100%' }}>
            {recentLoading ? (
              <p className="muted" style={{ textAlign: 'center', padding: '40px 0' }}>
                Loading recent question...
              </p>
            ) : recentError ? (
              <p className="error" style={{ textAlign: 'center', padding: '40px 0' }}>{recentError}</p>
            ) : !recentQuestion ? (
              <p className="muted" style={{ textAlign: 'center', padding: '40px 0' }}>
                No questions yet.{' '}
                {user ? (
                  <Link to="/ask" className="link">Be the first to ask!</Link>
                ) : (
                  <> <Link to="/signup" className="link">Sign up</Link> to start asking questions.</>
                )}
              </p>
            ) : (
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '18px' }}>
                  <Link to={`/question/${recentQuestion.id}`} className="link" style={{ fontSize: 'inherit' }}>
                    {recentQuestion.title}
                  </Link>
                </h3>
                {recentQuestion.body ? (
                  <p className="muted" style={{ marginTop: 0, marginBottom: '12px', whiteSpace: 'pre-wrap' }}>
                    {recentQuestion.body.length > 180
                      ? `${recentQuestion.body.slice(0, 180)}...`
                      : recentQuestion.body}
                  </p>
                ) : null}
                <p className="muted" style={{ margin: 0, fontSize: '13px' }}>
                  Asked by {recentQuestion.userName}{' '}
                  {recentQuestion.createdAt
                    ? `· ${new Date(recentQuestion.createdAt).toLocaleString()}`
                    : null}
                </p>
              </div>
            )}
          </div>
        </div>

      
        {!user && (
          <div>
            <h2 style={{ marginBottom: '24px', fontSize: '24px', textAlign: 'center' }}>Why Qverse?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div className="card" style={{ maxWidth: '100%' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>❓</div>
                <h3 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--accent)', fontSize: '20px' }}>Ask Questions</h3>
                <p className="muted" style={{ margin: 0, lineHeight: '1.6' }}>
                  Get answers from the community on any topic. Ask technical questions, seek advice, or explore new ideas.
                </p>
              </div>
              <div className="card" style={{ maxWidth: '100%' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>💡</div>
                <h3 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--accent)', fontSize: '20px' }}>Share Knowledge</h3>
                <p className="muted" style={{ margin: 0, lineHeight: '1.6' }}>
                  Help others by providing detailed, well-explained answers. Build your reputation as a knowledge contributor.
                </p>
              </div>
              <div className="card" style={{ maxWidth: '100%' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>👍</div>
                <h3 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--accent)', fontSize: '20px' }}>Vote & Discuss</h3>
                <p className="muted" style={{ margin: 0, lineHeight: '1.6' }}>
                  Upvote helpful content, engage in discussions, and discover the best answers through community voting.
                </p>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
}