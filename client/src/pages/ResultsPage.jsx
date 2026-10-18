import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { results, duration, totalQuestions } = location.state || {};

  if (!results) {
    navigate('/');
    return null;
  }

  const correctCount = results.filter(r => r.correct).length;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const missedTerms = results.filter(r => !r.correct).map(r => r.question.correctAnswer);

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const timeString = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  return (
    <div className="container">
      <div className="header">
        <h1>Session Complete!</h1>
        <p>Here's how you did</p>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', fontWeight: '700', color: score >= 70 ? 'var(--success)' : 'var(--warning)' }}>
          {score}%
        </div>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          {correctCount} out of {totalQuestions} correct
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          Time taken: {timeString}
        </p>
      </div>

      {missedTerms.length > 0 && (
        <div className="card">
          <h2>Terms to Review</h2>
          <ul style={{ listStyle: 'none' }}>
            {missedTerms.map((term, idx) => (
              <li key={idx} style={{
                padding: '0.75rem',
                background: 'var(--bg)',
                borderRadius: 'var(--radius)',
                marginBottom: '0.5rem'
              }}>
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => navigate('/')} className="btn btn-primary btn-block">
          New Session
        </button>
        <button onClick={() => navigate('/progress')} className="btn btn-secondary btn-block">
          View Progress
        </button>
      </div>
    </div>
  );
}
