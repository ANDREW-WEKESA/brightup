import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUnits } from '../utils/api';
import { getCustomUnits } from '../utils/storage';

export default function HomePage() {
  const [builtInUnits, setBuiltInUnits] = useState([]);
  const [customUnits, setCustomUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [sessionLength, setSessionLength] = useState(10);
  const [mode, setMode] = useState('multiple-choice');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    loadUnits();
  }, []);

  async function loadUnits() {
    try {
      setLoading(true);
      const built = await fetchUnits();
      const custom = getCustomUnits();
      setBuiltInUnits(built);
      setCustomUnits(custom);
      setError(null);
    } catch (err) {
      setError('Failed to load units. Make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function toggleUnit(unitId) {
    if (selectedUnits.includes(unitId)) {
      setSelectedUnits(selectedUnits.filter(id => id !== unitId));
    } else {
      setSelectedUnits([...selectedUnits, unitId]);
    }
  }

  function selectAll() {
    const allIds = [...builtInUnits.map(u => u.id), ...customUnits.map(u => u.id)];
    setSelectedUnits(allIds);
  }

  function clearAll() {
    setSelectedUnits([]);
  }

  function startSession() {
    if (selectedUnits.length === 0) {
      alert('Please select at least one unit');
      return;
    }

    navigate('/game', {
      state: {
        selectedUnits,
        sessionLength,
        mode,
        allUnits: [...builtInUnits, ...customUnits]
      }
    });
  }

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>BrightUp</h1>
          <p>Loading units...</p>
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
        <h1>BrightUp</h1>
        <p>Year 3 Software Engineering Revision</p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card">
        <h2>Select Units</h2>
        
        {builtInUnits.length > 0 && (
          <>
            <h3>Built-in Units</h3>
            <ul className="unit-list">
              {builtInUnits.map(unit => (
                <li key={unit.id} className="unit-item">
                  <label className="checkbox-group">
                    <input
                      type="checkbox"
                      checked={selectedUnits.includes(unit.id)}
                      onChange={() => toggleUnit(unit.id)}
                    />
                    <span>
                      <strong>{unit.name}</strong> ({unit.termCount} terms)
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}

        {customUnits.length > 0 && (
          <>
            <h3 style={{ marginTop: '1.5rem' }}>Custom Units</h3>
            <ul className="unit-list">
              {customUnits.map(unit => (
                <li key={unit.id} className="unit-item">
                  <label className="checkbox-group">
                    <input
                      type="checkbox"
                      checked={selectedUnits.includes(unit.id)}
                      onChange={() => toggleUnit(unit.id)}
                    />
                    <span>
                      <strong>{unit.name}</strong> ({unit.terms.length} terms)
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={selectAll} className="btn btn-secondary">
            Select All
          </button>
          <button onClick={clearAll} className="btn btn-secondary">
            Clear All
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Session Settings</h2>
        
        <div className="form-group">
          <label htmlFor="session-length" className="form-label">
            Number of Questions
          </label>
          <select
            id="session-length"
            className="form-select"
            value={sessionLength}
            onChange={(e) => setSessionLength(Number(e.target.value))}
          >
            <option value={5}>5 questions</option>
            <option value={10}>10 questions</option>
            <option value={20}>20 questions</option>
            <option value={0}>All terms</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mode" className="form-label">
            Answer Mode
          </label>
          <select
            id="mode"
            className="form-select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="typed">Type Answer</option>
          </select>
        </div>
      </div>

      <button
        onClick={startSession}
        className="btn btn-primary btn-block"
        disabled={selectedUnits.length === 0}
      >
        Start Session ({selectedUnits.length} unit{selectedUnits.length !== 1 ? 's' : ''} selected)
      </button>

      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer',
        border: 'none'
      }}
      onClick={() => navigate('/worlds')}>
        <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>🌍 New! Level Mode</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>
          Words of Wonders style - Discover words level by level!
        </p>
        <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Play Level Mode →
        </button>
      </div>

      <div className="nav-links">
        <a href="/custom" className="nav-link">Create Custom Unit</a>
        <a href="/progress" className="nav-link">View Progress</a>
      </div>
    </div>
  );
}
