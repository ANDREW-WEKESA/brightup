import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUnit } from '../utils/api';
import { formatClue } from '../utils/clues';

export default function WordLevelPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { worldId, worldName, level } = location.state || {};

  const [terms, setTerms] = useState([]);
  const [grid, setGrid] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [bonusWords, setBonusWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!worldId) {
      navigate('/worlds');
      return;
    }
    loadLevel();
  }, []);

  async function loadLevel() {
    try {
      const unitData = await fetchUnit(worldId);
      
      // Get terms for this level (4 terms per level)
      const startIdx = (level - 1) * 4;
      const levelTerms = unitData.terms.slice(startIdx, startIdx + 4);
      
      setTerms(levelTerms);
      
      // Create crossword grid
      const gridData = createGrid(levelTerms);
      setGrid(gridData);
      
      // Generate letter circle from all terms
      const allLetters = levelTerms
        .map(t => t.term.toUpperCase().replace(/[^A-Z]/g, ''))
        .join('')
        .split('');
      
      const shuffled = shuffleArray([...allLetters]);
      setAvailableLetters(shuffled.map((letter, idx) => ({ id: idx, letter })));
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading level:', error);
      navigate('/worlds');
    }
  }

  function createGrid(levelTerms) {
    // Simple crossword: vertical and horizontal words
    const grid = [];
    let row = 0;

    levelTerms.forEach((termObj, idx) => {
      const term = termObj.term.toUpperCase().replace(/[^A-Z]/g, '');
      const isHorizontal = idx % 2 === 0;

      grid.push({
        id: idx,
        term: termObj.term,
        definition: termObj.definition,
        letters: term.split(''),
        position: { row, col: 0 },
        horizontal: isHorizontal,
        found: false
      });

      row += 2;
    });

    return grid;
  }

  function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function selectLetter(letter) {
    setSelectedLetters([...selectedLetters, letter]);
    setAvailableLetters(availableLetters.filter(l => l.id !== letter.id));
  }

  function unselectLetter(letter) {
    setAvailableLetters([...availableLetters, letter]);
    setSelectedLetters(selectedLetters.filter(l => l.id !== letter.id));
  }

  function checkWord() {
    const word = selectedLetters.map(l => l.letter).join('');
    
    // Check if it matches a term in the grid
    const matchedTerm = grid.find(g => 
      !g.found && g.term.toUpperCase().replace(/[^A-Z]/g, '') === word
    );

    if (matchedTerm) {
      // Found a grid word!
      setGrid(grid.map(g => 
        g.id === matchedTerm.id ? { ...g, found: true } : g
      ));
      setFoundWords([...foundWords, matchedTerm]);
      setSelectedLetters([]);
      
      // Check if level complete
      if (foundWords.length + 1 === terms.length) {
        setTimeout(() => {
          navigate('/level-complete', {
            state: {
              worldId,
              worldName,
              level,
              stars: 3,
              foundWords: foundWords.length + 1,
              bonusWords: bonusWords.length
            }
          });
        }, 1000);
      }
    } else if (word.length >= 3) {
      // Check if it's a bonus word (valid English word not in grid)
      // For now, just accept any 3+ letter word as bonus
      if (!bonusWords.includes(word)) {
        setBonusWords([...bonusWords, word]);
      }
      setSelectedLetters([]);
    } else {
      // Invalid word
      setSelectedLetters([]);
    }
  }

  function shuffleLetters() {
    setAvailableLetters(shuffleArray([...availableLetters]));
  }

  function clearSelection() {
    setAvailableLetters([...availableLetters, ...selectedLetters]);
    setSelectedLetters([]);
  }

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>Loading Level...</h1>
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
        <h1>{worldName}</h1>
        <p>Level {level} • {foundWords.length}/{terms.length} words found</p>
      </div>

      {/* Crossword Grid */}
      <div className="card">
        <h3>Find These Words:</h3>
        <div style={{ marginTop: '1rem' }}>
          {grid.map(item => (
            <div
              key={item.id}
              style={{
                padding: '0.75rem',
                marginBottom: '0.5rem',
                background: item.found ? 'var(--success)' : 'var(--bg)',
                borderRadius: 'var(--radius)',
                color: item.found ? 'white' : 'var(--text)',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  {item.found ? (
                    <>
                      <strong style={{ fontSize: '1.1rem' }}>{item.term}</strong>
                      <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', opacity: 0.9 }}>
                        {item.definition}
                      </p>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                        {formatClue(item.term, item.definition, showHint)}
                      </p>
                    </>
                  )}
                </div>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>
                  {item.found ? '✓' : item.horizontal ? '→' : '↓'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setShowHint(!showHint)} 
          className="btn btn-secondary btn-block"
          style={{ marginTop: '1rem' }}
        >
          {showHint ? 'Hide Hints' : 'Show Letter Hints'}
        </button>
      </div>

      {/* Selected Word */}
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ 
          minHeight: '60px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {selectedLetters.length > 0 ? (
            selectedLetters.map(letter => (
              <div
                key={letter.id}
                className="tile"
                onClick={() => unselectLetter(letter)}
                style={{ cursor: 'pointer' }}
              >
                {letter.letter}
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>
              Tap letters to form words
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={clearSelection} className="btn btn-secondary" disabled={selectedLetters.length === 0}>
            Clear
          </button>
          <button 
            onClick={checkWord} 
            className="btn btn-primary" 
            style={{ flex: 1 }}
            disabled={selectedLetters.length < 2}
          >
            Check Word
          </button>
        </div>
      </div>

      {/* Letter Circle */}
      <div className="card">
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.5rem', 
          justifyContent: 'center',
          minHeight: '150px',
          alignItems: 'center'
        }}>
          {availableLetters.map(letter => (
            <div
              key={letter.id}
              className="tile"
              onClick={() => selectLetter(letter)}
              style={{ cursor: 'pointer' }}
            >
              {letter.letter}
            </div>
          ))}
        </div>

        <button onClick={shuffleLetters} className="btn btn-secondary btn-block" style={{ marginTop: '1rem' }}>
          🔄 Shuffle Letters
        </button>
      </div>

      {/* Bonus Words */}
      {bonusWords.length > 0 && (
        <div className="alert alert-info">
          <strong>Bonus Words Found:</strong> {bonusWords.join(', ')}
          <br/>
          <small>+{bonusWords.length * 10} bonus points!</small>
        </div>
      )}

      <div className="nav-links">
        <a href="/worlds" className="nav-link">← Quit Level</a>
      </div>
    </div>
  );
}
