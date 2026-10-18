import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUnits } from '../utils/api';

export default function WorldsPage() {
  const [worlds, setWorlds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadWorlds();
  }, []);

  async function loadWorlds() {
    try {
      const units = await fetchUnits();
      
      // Convert units to worlds with levels
      const worldsData = units.map(unit => {
        const levelsCount = Math.ceil(unit.termCount / 4);
        const levels = Array.from({ length: levelsCount }, (_, i) => ({
          number: i + 1,
          name: `Level ${i + 1}`,
          termsCount: Math.min(4, unit.termCount - (i * 4)),
          completed: false,
          stars: 0
        }));

        return {
          id: unit.id,
          name: unit.name,
          totalTerms: unit.termCount,
          levels,
          completed: levels.filter(l => l.completed).length,
          totalLevels: levels.length
        };
      });

      setWorlds(worldsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading worlds:', error);
      setLoading(false);
    }
  }

  function openWorld(world) {
    navigate('/world-map', { state: { world } });
  }

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>Loading Worlds...</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🌍 Choose Your World</h1>
        <p>Progress through levels and master all terms</p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {worlds.map((world, index) => (
          <div
            key={world.id}
            className="card"
            style={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              border: '2px solid var(--border)'
            }}
            onClick={() => openWorld(world)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {index === 0 && '🧪 '}
                  {index === 1 && '📊 '}
                  {index === 2 && '🏗️ '}
                  {index === 3 && '🔒 '}
                  {index === 4 && '📱 '}
                  {world.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {world.totalTerms} terms • {world.totalLevels} levels
                </p>
                
                {/* Progress bar */}
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(world.completed / world.totalLevels) * 100}%` }}
                  ></div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  {world.completed} / {world.totalLevels} levels completed
                </p>
              </div>

              <div style={{ fontSize: '3rem', opacity: 0.3 }}>
                →
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="nav-links" style={{ marginTop: '2rem' }}>
        <a href="/" className="nav-link">← Back to Classic Mode</a>
      </div>
    </div>
  );
}
