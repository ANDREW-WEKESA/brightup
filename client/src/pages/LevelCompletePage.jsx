import { useLocation, useNavigate } from 'react-router-dom';

export default function LevelCompletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { worldId, worldName, level, stars, foundWords, bonusWords } = location.state || {};

  if (!worldId) {
    navigate('/worlds');
    return null;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🎉 Level Complete!</h1>
        <p>{worldName} - Level {level}</p>
      </div>

      {/* Stars */}
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {'⭐'.repeat(stars)}
        </div>
        <h2 style={{ fontSize: '2rem', color: 'var(--success)' }}>
          {stars}/3 Stars!
        </h2>
      </div>

      {/* Stats */}
      <div className="card">
        <h3>Statistics</h3>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '0.75rem',
            background: 'var(--bg)',
            borderRadius: 'var(--radius)',
            marginBottom: '0.5rem'
          }}>
            <span>Words Found</span>
            <strong>{foundWords}</strong>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '0.75rem',
            background: 'var(--bg)',
            borderRadius: 'var(--radius)',
            marginBottom: '0.5rem'
          }}>
            <span>Bonus Words</span>
            <strong>{bonusWords}</strong>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '0.75rem',
            background: 'var(--success)',
            color: 'white',
            borderRadius: 'var(--radius)',
            fontWeight: '600'
          }}>
            <span>Total Points</span>
            <strong>{(foundWords * 100) + (bonusWords * 10)}</strong>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          onClick={() => navigate('/world-map', { 
            state: { 
              world: { id: worldId, name: worldName } 
            } 
          })}
          className="btn btn-primary btn-block"
        >
          Next Level →
        </button>
        <button
          onClick={() => navigate('/worlds')}
          className="btn btn-secondary btn-block"
        >
          Back to Worlds
        </button>
      </div>
    </div>
  );
}
