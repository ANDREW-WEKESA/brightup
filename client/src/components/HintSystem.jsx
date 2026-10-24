import { useState } from 'react';
import { Lightbulb, Eye, X, Zap } from 'lucide-react';
import './HintSystem.css';

function HintSystem({ term, definition, options, onUseHint, hintsRemaining = 3 }) {
  const [showHints, setShowHints] = useState(false);
  const [usedHints, setUsedHints] = useState([]);

  const hintTypes = [
    {
      id: 'first-letter',
      name: 'First Letter',
      icon: <Lightbulb size={20} />,
      cost: 1,
      description: 'Reveal the first letter of the answer',
      getHint: () => {
        return `The answer starts with "${term[0].toUpperCase()}"`;
      }
    },
    {
      id: 'eliminate-two',
      name: 'Eliminate Two',
      icon: <X size={20} />,
      cost: 1,
      description: 'Remove two incorrect options',
      getHint: () => {
        if (!options) return 'Not available for this question type';
        const correctIndex = options.findIndex(opt => opt === definition);
        const incorrectIndices = options
          .map((_, i) => i)
          .filter(i => i !== correctIndex);
        const toRemove = incorrectIndices.slice(0, 2);
        return `Options ${toRemove.map(i => String.fromCharCode(65 + i)).join(' and ')} are incorrect`;
      }
    },
    {
      id: 'word-length',
      name: 'Word Length',
      icon: <Eye size={20} />,
      cost: 1,
      description: 'Show how many letters in the answer',
      getHint: () => {
        return `The answer has ${term.length} letters`;
      }
    },
    {
      id: 'category',
      name: 'Category Hint',
      icon: <Zap size={20} />,
      cost: 2,
      description: 'Get a contextual clue about the topic',
      getHint: () => {
        const categories = {
          'python': 'programming language',
          'algorithm': 'computation concept',
          'database': 'data storage',
          'network': 'connectivity',
          'security': 'protection'
        };
        const termLower = term.toLowerCase();
        for (const [key, value] of Object.entries(categories)) {
          if (definition.toLowerCase().includes(key)) {
            return `This term is related to ${value}`;
          }
        }
        return `This is a computer science concept`;
      }
    }
  ];

  const useHint = (hint) => {
    if (hintsRemaining < hint.cost) {
      alert('Not enough hints remaining!');
      return;
    }

    if (usedHints.includes(hint.id)) {
      alert('You already used this hint!');
      return;
    }

    const hintText = hint.getHint();
    setUsedHints([...usedHints, hint.id]);
    onUseHint(hint.cost, hintText);
  };

  return (
    <div className="hint-system">
      <button 
        className="hint-toggle-btn"
        onClick={() => setShowHints(!showHints)}
      >
        <Lightbulb size={20} />
        Hints ({hintsRemaining})
      </button>

      {showHints && (
        <div className="hints-panel">
          <div className="hints-header">
            <h3>
              <Lightbulb size={20} />
              Available Hints
            </h3>
            <button 
              className="close-hints"
              onClick={() => setShowHints(false)}
            >
              ×
            </button>
          </div>

          <div className="hints-remaining">
            You have <strong>{hintsRemaining}</strong> hints remaining
          </div>

          <div className="hints-list">
            {hintTypes.map(hint => (
              <div 
                key={hint.id}
                className={`hint-card ${usedHints.includes(hint.id) ? 'used' : ''}`}
              >
                <div className="hint-info">
                  <div className="hint-icon">{hint.icon}</div>
                  <div className="hint-details">
                    <h4>{hint.name}</h4>
                    <p>{hint.description}</p>
                  </div>
                </div>
                <button
                  className="use-hint-btn"
                  onClick={() => useHint(hint)}
                  disabled={usedHints.includes(hint.id) || hintsRemaining < hint.cost}
                >
                  {usedHints.includes(hint.id) ? 'Used' : `Use (${hint.cost})`}
                </button>
              </div>
            ))}
          </div>

          <div className="hints-footer">
            <p>💡 Hints are limited! Use them wisely to maximize your learning.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HintSystem;
