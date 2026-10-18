import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function WorldMapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { world } = location.state || {};

  if (!world) {
    navigate('/worlds');
    return null;
  }

  function startLevel(level) {
    navigate('/word-level', {
      state: {
        worldId: world.id,
        worldName: world.name,
        level: level.number
      }
    });
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{world.name}</h1>
        <p>{world.totalLevels} levels • {world.totalTerms} terms to master</p>
      </div>

      {/* Level path visualization */}
      <div style={{ 
        display: 'grid', 
        gap: '1rem',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {world.levels.map((level, index) => (
          <div key={level.number} style={{ position: 'relative' }}>
            {/* Connecting line */}
            {index < world.levels.length - 1 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                width: '2px',
                height: '1rem',
                background: level.completed ? 'var(--success)' : 'var(--border)',
                transform: 'translateX(-50%)'
              }}></div>
            )}

            {/* Level card */}
            <div
              className="card"
              style={{
                cursor: 'pointer',
                border: level.completed ? '2px solid var(--success)' : '2px solid var(--border)',
                background: level.completed ? 'var(--success)' : 'var(--surface)',
                color: level.completed ? 'white' : 'var(--text)',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onClick={() => startLevel(level)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {level.completed ? '⭐' : '🔓'}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                {level.name}
              </h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                {level.termsCount} words
                {level.completed && ` • ${level.stars}/3 ⭐`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="nav-links" style={{ marginTop: '2rem' }}>
        <a href="/worlds" className="nav-link">← Back to Worlds</a>
      </div>
    </div>
  );
}
