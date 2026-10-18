import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProgress, getMisses } from '../utils/storage';
import { fetchUnits } from '../utils/api';

export default function ProgressPage() {
  const [progress, setProgress] = useState({});
  const [misses, setMisses] = useState({});
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    try {
      const prog = getProgress();
      const miss = getMisses();
      const unitsData = await fetchUnits();
      
      setProgress(prog);
      setMisses(miss);
      setUnits(unitsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading progress:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>Loading Progress...</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  const unitIds = Object.keys(progress);

  if (unitIds.length === 0) {
    return (
      <div className="container">
        <div className="header">
          <h1>Progress</h1>
          <p>No practice sessions yet</p>
        </div>
        <div className="card">
          <p>Start a session to track your progress across units and terms.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary btn-block">
            Start Your First Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Your Progress</h1>
        <p>Track your mastery across units</p>
      </div>

      {unitIds.map(unitId => {
        const unitProgress = progress[unitId];
        const unitName = units.find(u => u.id === unitId)?.name || unitId;
        
        const termIds = Object.keys(unitProgress);
        const totalTerms = termIds.length;
        const masteredTerms = termIds.filter(termId => {
          const term = unitProgress[termId];
          return term.correct >= 2 && term.correct === term.total;
        }).length;

        return (
          <div key={unitId} className="card">
            <h2>{unitName}</h2>
            <p>
              <strong>{masteredTerms}</strong> of <strong>{totalTerms}</strong> terms mastered
            </p>
            
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(masteredTerms / totalTerms) * 100}%` }}
              ></div>
            </div>

            <details style={{ marginTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: '500' }}>
                View term details
              </summary>
              <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                {termIds.map(termId => {
                  const term = unitProgress[termId];
                  const accuracy = Math.round((term.correct / term.total) * 100);
                  
                  return (
                    <li key={termId} style={{
                      padding: '0.75rem',
                      background: 'var(--bg)',
                      borderRadius: 'var(--radius)',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{termId}</span>
                      <span style={{
                        fontSize: '0.875rem',
                        color: accuracy >= 80 ? 'var(--success)' : accuracy >= 50 ? 'var(--warning)' : 'var(--error)'
                      }}>
                        {term.correct}/{term.total} ({accuracy}%)
                      </span>
                    </li>
                  );
                })}
              </ul>
            </details>
          </div>
        );
      })}

      {Object.keys(misses).length > 0 && (
        <div className="card">
          <h2>Weak Terms</h2>
          <p>Terms you've missed recently</p>
          <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
            {Object.entries(misses).map(([key, data]) => {
              const [unitId, term] = key.split(':');
              const unitName = units.find(u => u.id === unitId)?.name || unitId;
              
              return (
                <li key={key} style={{
                  padding: '0.75rem',
                  background: 'var(--bg)',
                  borderRadius: 'var(--radius)',
                  marginBottom: '0.5rem'
                }}>
                  <strong>{term}</strong><br/>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {unitName} • Missed {data.count} time{data.count !== 1 ? 's' : ''}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="nav-links">
        <a href="/" className="nav-link">← Back to Home</a>
      </div>
    </div>
  );
}
