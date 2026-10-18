import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUnit } from '../utils/api';
import { formatClue } from '../utils/clues';

export default function WordLevelPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { worldId, worldName, level } = location.state || {};

  const [terms, setTerms] = useState([]);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
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
      
      // Generate letter circle from CURRENT term only
      const currentTerm = levelTerms[0];
      const letters = currentTerm.term.toUpperCase().replace(/[^A-Z\s]/g, '').replace(/\s/g, '');
      const shuffled = shuffleArray(letters.split(''));
      setAvailableLetters(shuffled.map((letter, idx) => ({ id: idx, letter })));
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading level:', error);
      navigate('/worlds');
    }
  }

  // Remove createGrid function since we don't need it anymore

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
    const currentTerm = terms[currentTermIndex];
    const correctAnswer = currentTerm.term.toUpperCase().replace(/[^A-Z\s]/g, '').replace(/\s/g, '');
    
    if (word === correctAnswer) {
      // Correct answer!
      setFoundWords([...foundWords, currentTerm]);
      setSelectedLetters([]);
      setShowHint(false);
      
      // Move to next term or complete level
      if (currentTermIndex + 1 < terms.length) {
        // Next term
        setTimeout(() => {
          const nextIndex = currentTermIndex + 1;
          setCurrentTermIndex(nextIndex);
          
          // Load letters for next term
          const nextTerm = terms[nextIndex];
          const letters = nextTerm.term.toUpperCase().replace(/[^A-Z\s]/g, '').replace(/\s/g, '');
          const shuffled = shuffleArray(letters.split(''));
          setAvailableLetters(shuffled.map((letter, idx) => ({ id: idx, letter })));
        }, 500);
      } else {
        // Level complete!
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
    } else {
      // Wrong answer - shake animation or error
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

  if (loading || terms.length === 0) {
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

  const currentTerm = terms[currentTermIndex];

  return (
    <div className="container">
      <div className="header">
        <h1>{worldName}</h1>
        <p>Level {level} • Question {currentTermIndex + 1}/{terms.length}</p>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          {terms.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '40px',
                height: '8px',
                borderRadius: '4px',
                background: idx < currentTermIndex ? 'var(--success)' : 
                           idx === currentTermIndex ? 'var(--primary)' : 
                           'var(--bg)',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>

        {/* Current Question */}
        <div style={{ 
          padding: '1.5rem',
          background: 'var(--bg)',
          borderRadius: 'var(--radius)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
            Find this word:
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            {formatClue(currentTerm.term, currentTerm.definition, showHint)}
          </p>
        </div>

        <button 
          onClick={() => setShowHint(!showHint)} 
          className="btn btn-secondary btn-block"
        >
          {showHint ? '🙈 Hide Hint' : '💡 Show Letter Hint'}
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

      {/* Bonus Words - Remove since we're doing one at a time */}

      <div className="nav-links">
        <a href="/worlds" className="nav-link">← Quit Level</a>
      </div>
    </div>
  );
}
