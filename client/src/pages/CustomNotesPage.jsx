import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseNotes } from '../utils/engine';
import { saveCustomUnit } from '../utils/storage';

export default function CustomNotesPage() {
  const [name, setName] = useState('');
  const [notesText, setNotesText] = useState('');
  const [parsedTerms, setParsedTerms] = useState(null);
  const [skipped, setSkipped] = useState(0);
  const navigate = useNavigate();

  function handleParse() {
    if (!notesText.trim()) {
      alert('Please paste some notes first');
      return;
    }

    const result = parseNotes(notesText);
    setParsedTerms(result.terms);
    setSkipped(result.skipped);
  }

  function handleRemoveTerm(index) {
    setParsedTerms(parsedTerms.filter((_, i) => i !== index));
  }

  function handleSave() {
    if (!name.trim()) {
      alert('Please give your unit a name');
      return;
    }

    if (!parsedTerms || parsedTerms.length === 0) {
      alert('No terms to save');
      return;
    }

    const unit = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      terms: parsedTerms,
      createdAt: new Date().toISOString()
    };

    saveCustomUnit(unit);
    alert(`Unit "${unit.name}" saved with ${parsedTerms.length} terms`);
    navigate('/');
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Create Custom Unit</h1>
        <p>Paste your notes and we'll extract the terms</p>
      </div>

      <div className="card">
        <div className="form-group">
          <label htmlFor="unit-name" className="form-label">
            Unit Name
          </label>
          <input
            id="unit-name"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Advanced Algorithms"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes" className="form-label">
            Paste Your Notes
          </label>
          <textarea
            id="notes"
            className="form-textarea"
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            placeholder={`Unit testing: testing of individual functions in isolation
Integration testing: testing combined components together
Regression testing - retesting after code changes`}
          />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Supported formats: "Term: definition", "Term - definition", "Term is definition"
          </p>
        </div>

        <button onClick={handleParse} className="btn btn-primary">
          Extract Terms
        </button>
      </div>

      {parsedTerms !== null && (
        <div className="card">
          <h2>Extracted Terms</h2>
          <p>
            Found <strong>{parsedTerms.length}</strong> terms
            {skipped > 0 && <span> (skipped {skipped} line{skipped !== 1 ? 's' : ''})</span>}
          </p>

          {parsedTerms.length === 0 ? (
            <div className="alert alert-error">
              No terms found. Check your notes format.
            </div>
          ) : (
            <>
              <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                {parsedTerms.map((pair, index) => (
                  <li key={index} style={{ 
                    padding: '0.75rem', 
                    border: '1px solid var(--border)', 
                    borderRadius: 'var(--radius)', 
                    marginBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ flex: 1 }}>
                      <strong>{pair.term}</strong><br/>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {pair.definition}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveTerm(index)}
                      className="btn btn-secondary"
                      style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <button onClick={handleSave} className="btn btn-success btn-block">
                Save Unit
              </button>
            </>
          )}
        </div>
      )}

      <div className="nav-links">
        <a href="/" className="nav-link">← Back to Home</a>
      </div>
    </div>
  );
}
