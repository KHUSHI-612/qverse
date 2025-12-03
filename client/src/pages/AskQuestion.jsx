import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { api } from '../service/api.js';

export default function AskQuestion() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [search, setSearch] = useState('');
  const [questions, setQuestions] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState('');

  const fetchQuestions = async (searchTerm = '') => {
    setListError('');
    setListLoading(true);
    try {
      const { data } = await api.get('/questions', {
        params: searchTerm ? { search: searchTerm } : {}
      });
      setQuestions(data || []);
    } catch (err) {
      console.error('Fetch questions error:', err);
      if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
        setListError('Cannot connect to server. Make sure the backend is running.');
      } else {
        setListError(err?.response?.data?.message || err?.message || 'Failed to load questions');
      }
    } finally {
      setListLoading(false);
    }
  };

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
      fetchQuestions();
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!title.trim() || !body.trim()) {
      setFormError('Title and description are required');
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await api.post('/questions', { title, body });
      setQuestions((prev) => [data, ...prev]);
      setTitle('');
      setBody('');
    } catch (err) {
      console.error('Create question error:', err);
      if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
        setFormError('Cannot connect to server. Make sure the backend is running.');
      } else if (err?.response?.status === 401) {
        setFormError('Your session has expired. Please login again.');
        navigate('/login');
      } else {
        setFormError(err?.response?.data?.message || err?.message || 'Failed to submit question');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    fetchQuestions(search.trim());
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this question?')) {
      return;
    }
    try {
      await api.delete(`/questions/${id}`);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error('Delete question error:', err);
      alert(err?.response?.data?.message || err?.message || 'Failed to delete question');
    }
  };

  return (
    <div className="layout">
      <Header />
      <main className="ask-main">
        <div className="ask-layout">
          <section className="card ask-form-card">
            <h2 className="title">Ask a Question</h2>
            <p className="subtitle">Share a clear and specific question with the community.</p>
            <form onSubmit={onSubmit} className="form">
              <input
                className="input"
                placeholder="Question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                required
              />
              <textarea
                className="input"
                placeholder="Describe your question in detail"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                required
                style={{ resize: 'vertical' }}
              />
              <button className="button" type="submit" disabled={submitting}>
                {submitting ? 'Posting...' : 'Post question'}
              </button>
              {formError ? <div className="error">{formError}</div> : null}
            </form>
          </section>

          <section className="ask-right">
            <div className="card ask-search-card">
              <form
                onSubmit={onSearchSubmit}
                className="ask-search-row"
              >
                <input
                  className="input"
                  placeholder="Search questions by title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="button" type="submit" disabled={listLoading}>
                  {listLoading ? 'Searching...' : 'Search'}
                </button>
              </form>
              {listError ? (
                <p className="error" style={{ marginTop: '8px' }}>{listError}</p>
              ) : null}
            </div>

            <div className="ask-list">
              {listLoading && !questions.length ? (
                <div className="card">
                  <p className="muted">Loading questions...</p>
                </div>
              ) : questions.length === 0 ? (
                <div className="card">
                  <p className="muted">No questions yet. Be the first to ask something!</p>
                </div>
              ) : (
                questions.map((q) => (
                  <div key={q.id} className="card">
                    <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '18px' }}>
                    <Link to={`/question/${q.id}`} className="link" style={{ fontSize: 'inherit' }}>
                      {q.title}
                    </Link>
                  </h3>
                    <p className="muted" style={{ marginTop: 0, whiteSpace: 'pre-wrap' }}>
                      {q.body}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '12px'
                      }}
                    >
                      <p className="muted" style={{ margin: 0, fontSize: '13px' }}>
                        Asked by {q.userName}{' '}
                        {q.createdAt ? `· ${new Date(q.createdAt).toLocaleString()}` : null}
                      </p>
                      {user && (q.userId === user.id || user.role === 'admin') ? (
                        <button
                          type="button"
                          className="toggle"
                          onClick={() => onDelete(q.id)}
                          style={{ padding: '6px 10px' }}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}