import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { api } from '../service/api.js';

export default function QuestionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [questionError, setQuestionError] = useState('');

  const [answers, setAnswers] = useState([]);
  const [answersLoading, setAnswersLoading] = useState(false);
  const [answersError, setAnswersError] = useState('');

  const [answerBody, setAnswerBody] = useState('');
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('qverse_auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.user) {
          setUser(parsed.user);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchQuestion(id);
    fetchAnswers(id);
  }, [id]);

  const fetchQuestion = async (questionId) => {
    setQuestionLoading(true);
    setQuestionError('');
    try {
      const { data } = await api.get(`/questions/${questionId}`);
      setQuestion(data);
    } catch (err) {
      console.error('Question details error:', err);
      if (err?.response?.status === 404) {
        setQuestionError('Question not found');
      } else if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
        setQuestionError('Cannot connect to server. Make sure the backend is running.');
      } else {
        setQuestionError(err?.response?.data?.message || err?.message || 'Failed to load question');
      }
    } finally {
      setQuestionLoading(false);
    }
  };

  const fetchAnswers = async (questionId) => {
    setAnswersLoading(true);
    setAnswersError('');
    try {
      const { data } = await api.get(`/answers/${questionId}`);
      setAnswers(data || []);
    } catch (err) {
      console.error('Answers load error:', err);
      if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
        setAnswersError('Cannot connect to server. Make sure the backend is running.');
      } else {
        setAnswersError(err?.response?.data?.message || err?.message || 'Failed to load answers');
      }
    } finally {
      setAnswersLoading(false);
    }
  };

  const onSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!answerBody.trim()) {
      return;
    }
    setSubmittingAnswer(true);
    try {
      const { data } = await api.post(`/answers/${id}`, { body: answerBody });
      setAnswers((prev) => [...prev, data]);
      setAnswerBody('');
    } catch (err) {
      console.error('Create answer error:', err);
      if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
        alert('Cannot connect to server. Make sure the backend is running.');
      } else if (err?.response?.status === 401) {
        navigate('/login');
      } else {
        alert(err?.response?.data?.message || err?.message || 'Failed to submit answer');
      }
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const onDeleteAnswer = async (answerId) => {
    if (!window.confirm('Delete this answer?')) return;
    try {
      await api.delete(`/answers/${answerId}`);
      setAnswers((prev) => prev.filter((a) => a.id !== answerId));
    } catch (err) {
      console.error('Delete answer error:', err);
      alert(err?.response?.data?.message || err?.message || 'Failed to delete answer');
    }
  };

  const onVote = async (answerId, value) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const { data } = await api.post(`/answers/${answerId}/vote`, { value });
      setAnswers((prev) => prev.map((a) => (a.id === answerId ? data : a)));
    } catch (err) {
      console.error('Vote error:', err);
      alert(err?.response?.data?.message || err?.message || 'Failed to vote');
    }
  };

  return (
    <div className="layout">
      <Header />
      <main className="question-main">
        <div className="card question-card">
          {questionLoading ? (
            <p className="muted">Loading question...</p>
          ) : questionError ? (
            <p className="error">{questionError}</p>
          ) : question ? (
            <>
              <h2 className="title question-title">{question.title}</h2>
              <p className="muted question-meta">
                Asked by {question.userName}{' '}
                {question.createdAt ? `· ${new Date(question.createdAt).toLocaleString()}` : null}
              </p>
              <p className="question-body-text">{question.body}</p>
            </>
          ) : null}
        </div>

        <div className="question-layout">
          <div className="card question-answer-form">
            <h3 className="title" style={{ marginBottom: '12px' }}>Your Answer</h3>
            {user ? (
              <form onSubmit={onSubmitAnswer} className="form">
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Write your answer here..."
                  value={answerBody}
                  onChange={(e) => setAnswerBody(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
                <button className="button" type="submit" disabled={submittingAnswer}>
                  {submittingAnswer ? 'Posting...' : 'Post answer'}
                </button>
              </form>
            ) : (
              <p className="muted">Please login to post an answer.</p>
            )}
          </div>

          <div className="card question-answers-card">
            <h3 className="title" style={{ marginBottom: '12px' }}>
              Answers{answers.length ? ` (${answers.length})` : ''}
            </h3>
            {answersLoading && !answers.length ? (
              <p className="muted">Loading answers...</p>
            ) : answersError ? (
              <p className="error">{answersError}</p>
            ) : answers.length === 0 ? (
              <p className="muted">No answers yet. Be the first to answer!</p>
            ) : (
              <div className="answers-list">
                {answers.map((a) => (
                  <div key={a.id} className="answer-card">
                    <p className="answer-body">{a.body}</p>
                    <div className="answer-footer">
                      <p className="muted answer-meta">
                        Answered by {a.userName}{' '}
                        {a.createdAt ? `· ${new Date(a.createdAt).toLocaleString()}` : null}
                      </p>
                      <div className="answer-actions">
                        <button
                          type="button"
                          className="toggle answer-vote-button"
                          onClick={() => onVote(a.id, 1)}
                        >
                          ▲
                        </button>
                        <span className="answer-score">{a.score ?? 0}</span>
                        <button
                          type="button"
                          className="toggle answer-vote-button"
                          onClick={() => onVote(a.id, -1)}
                        >
                          ▼
                        </button>
                        {user && (a.userId === user.id || user.role === 'admin') ? (
                          <button
                            type="button"
                            className="toggle answer-delete-button"
                            onClick={() => onDeleteAnswer(a.id)}
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}






