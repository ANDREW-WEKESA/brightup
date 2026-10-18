import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUnit } from '../utils/api';
import { generateQuestions, scrambleTerm, answersMatch, normalizeText } from '../utils/engine';
import { saveProgress, recordMiss, clearMiss, saveSessionState } from '../utils/storage';

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedUnits, sessionLength, mode, allUnits } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(null);
  const [showScramble, setShowScramble] = useState(false);
  const [scrambled, setScrambled] = useState('');
  const [rebuiltLetters, setRebuiltLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!selectedUnits) {
      navigate('/');
      return;
    }
    loadQuestions();
  }, []);

  async function loadQuestions() {
    try {
      setLoading(true);
      let allTerms = [];

      for (const unitId of selectedUnits) {
        const unitMeta = allUnits.find(u => u.id === unitId);
        
        if (unitMeta.terms) {
          // Custom unit
          allTerms.push(...unitMeta.terms.map(t => ({ ...t, unitId })));
        } else {
          // Built-in unit
          const unitData = await fetchUnit(unitId);
          allTerms.push(...unitData.terms.map(t => ({ ...t, unitId })));
        }
      }

      const count = sessionLength === 0 ? allTerms.length : sessionLength;
      const generated = generateQuestions(allTerms, count);
      
      // Add unitId to each question for tracking
      const questionsWithMeta = generated.map((q, idx) => ({
        ...q,
        unitId: allTerms[idx % allTerms.length].unitId
      }));

      setQuestions(questionsWithMeta);
      setLoading(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      alert('Failed to load questions');
      navigate('/');
    }
  }

  function handleOptionClick(option) {
    if (answered) return;

    const isCorrect = option.correct;
    setCorrect(isCorrect);
    setAnswered(true);

    const currentQuestion = questions[currentIndex];
    
    if (!isCorrect) {
      recordMiss(currentQuestion.unitId, currentQuestion.correctAnswer);
      initScramble(currentQuestion.correctAnswer);
    } else {
      clearMiss(currentQuestion.unitId, currentQuestion.correctAnswer);
    }

    saveProgress(currentQuestion.unitId, currentQuestion.id, isCorrect);

    setResults([...results, {
      question: currentQuestion,
      correct: isCorrect,
      userAnswer: option.text
    }]);
  }

  function handleTypedSubmit(e) {
    e.preventDefault();
    if (answered || !userAnswer.trim()) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = answersMatch(userAnswer, currentQuestion.correctAnswer);
    
    setCorrect(isCorrect);
    setAnswered(true);

    if (!isCorrect) {
      recordMiss(currentQuestion.unitId, currentQuestion.correctAnswer);
      initScramble(currentQuestion.correctAnswer);
    } else {
      clearMiss(currentQuestion.unitId, currentQuestion.correctAnswer);
    }

    saveProgress(currentQuestion.unitId, currentQuestion.id, isCorrect);

    setResults([...results, {
      question: currentQuestion,
      correct: isCorrect,
      userAnswer
    }]);
  }

  function initScramble(term) {
    setShowScramble(true);
    const scrambledTerm = scrambleTerm(term);
    setScrambled(scrambledTerm);
    
    // Split into individual letter tiles
    const letters = scrambledTerm.split('').map((char, idx) => ({
      id: idx,
      char,
      isSpace: char === ' '
    }));
    
    setAvailableLetters(letters);
    setRebuiltLetters([]);
  }

  function handleLetterClick(letter) {
    if (letter.isSpace) return;
    
    setRebuiltLetters([...rebuiltLetters, letter]);
    setAvailableLetters(availableLetters.filter(l => l.id !== letter.id));
  }

  function handleRebuiltClick(letter) {
    setAvailableLetters([...availableLetters, letter]);
    setRebuiltLetters(rebuiltLetters.filter(l => l.id !== letter.id));
  }

  function handleScrambleSubmit() {
    const currentQuestion = questions[currentIndex];
    const rebuilt = rebuiltLetters.map(l => l.char).join('');
    
    if (answersMatch(rebuilt, currentQuestion.correctAnswer)) {
      nextQuestion();
    } else {
      alert('Not quite right. Try again!');
    }
  }

  function handleReshuffle() {
    const allLetters = [...availableLetters, ...rebuiltLetters];
    const shuffled = [...allLetters].sort(() => Math.random() - 0.5);
    setAvailableLetters(shuffled);
    setRebuiltLetters([]);
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setAnswered(false);
      setCorrect(null);
      setShowScramble(false);
      setScrambled('');
      setRebuiltLetters([]);
      setAvailableLetters([]);
    } else {
      finishSession();
    }
  }

  function finishSession() {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    
    navigate('/results', {
      state: {
        results,
        duration,
        totalQuestions: questions.length
      }
    });
  }

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>Loading...</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="header">
          <h1>No Questions Available</h1>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">← Back to Home</a>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="container">
      <div className="header">
        <h1>Question {currentIndex + 1} of {questions.length}</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {!showScramble ? (
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            {currentQuestion.prompt}
          </h2>

          {mode === 'multiple-choice' && currentQuestion.options.length > 0 ? (
            <div className="options-grid">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={answered}
                  className={`option-button ${
                    answered && option.correct ? 'correct' :
                    answered && !option.correct && correct === false && option.text === currentQuestion.correctAnswer ? 'correct' :
                    answered && !option.correct ? '' : ''
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleTypedSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  disabled={answered}
                  autoFocus
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={answered || !userAnswer.trim()}>
                Submit Answer
              </button>
            </form>
          )}

          {answered && (
            <>
              <div className={`alert ${correct ? 'alert-success' : 'alert-error'}`}>
                {correct ? '✓ Correct!' : '✗ Incorrect'}
              </div>
              
              <div style={{ padding: '1rem', background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
                <strong>Answer:</strong> {currentQuestion.correctAnswer}<br/>
                <span style={{ color: 'var(--text-secondary)' }}>{currentQuestion.prompt}</span>
              </div>

              {!correct && !showScramble && (
                <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
                  Rebuild the term to continue...
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="card">
          <h2>Rebuild the Term</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Tap the tiles to rebuild: <strong>{currentQuestion.correctAnswer}</strong>
          </p>

          <div className="scramble-container">
            <div className="tiles-row">
              {rebuiltLetters.length > 0 ? (
                rebuiltLetters.map((letter) => (
                  <div
                    key={`rebuilt-${letter.id}`}
                    className="tile"
                    onClick={() => handleRebuiltClick(letter)}
                  >
                    {letter.char}
                  </div>
                ))
              ) : (
                <div style={{ color: 'var(--text-secondary)', padding: '1rem' }}>
                  Tap tiles below to build your answer
                </div>
              )}
            </div>

            <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <div className="tiles-row">
              {availableLetters.map((letter) => (
                letter.isSpace ? (
                  <div key={`space-${letter.id}`} style={{ width: '20px' }}></div>
                ) : (
                  <div
                    key={`available-${letter.id}`}
                    className="tile"
                    onClick={() => handleLetterClick(letter)}
                  >
                    {letter.char}
                  </div>
                )
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleReshuffle} className="btn btn-secondary">
              Reshuffle
            </button>
            <button
              onClick={handleScrambleSubmit}
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={rebuiltLetters.length === 0}
            >
              Check Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
