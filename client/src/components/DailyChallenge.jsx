import { useState, useEffect } from 'react';
import { Calendar, Trophy, Clock, Target } from 'lucide-react';
import './DailyChallenge.css';

function DailyChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Generate daily challenge
    generateDailyChallenge();
    
    // Update countdown timer
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateDailyChallenge = () => {
    // Check if challenge already completed today
    const lastCompleted = localStorage.getItem('lastChallengeDate');
    const today = new Date().toDateString();
    
    if (lastCompleted === today) {
      setCompleted(true);
    }

    // Generate challenge based on date
    const challenges = [
      {
        title: 'Algorithm Master',
        description: 'Answer 10 algorithm questions with 80%+ accuracy',
        reward: '100 points',
        icon: '🎯',
        target: 10,
        category: 'Algorithms'
      },
      {
        title: 'Python Expert',
        description: 'Complete the Python Fundamentals unit',
        reward: '150 points',
        icon: '🐍',
        target: 1,
        category: 'Python'
      },
      {
        title: 'Speed Demon',
        description: 'Answer 20 questions in under 10 minutes',
        reward: '200 points',
        icon: '⚡',
        target: 20,
        category: 'Mixed'
      },
      {
        title: 'Perfectionist',
        description: 'Get 5 questions correct in a row',
        reward: '75 points',
        icon: '💯',
        target: 5,
        category: 'Mixed'
      },
      {
        title: 'Database Guru',
        description: 'Master 15 database concepts',
        reward: '125 points',
        icon: '🗄️',
        target: 15,
        category: 'Databases'
      }
    ];

    // Select challenge based on day of year
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const selectedChallenge = challenges[dayOfYear % challenges.length];
    
    setChallenge(selectedChallenge);
  };

  const updateCountdown = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow - now;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
  };

  const startChallenge = () => {
    // Navigate to challenge
    alert('Challenge starting! (Feature coming soon)');
  };

  if (!challenge) {
    return <div>Loading challenge...</div>;
  }

  return (
    <div className="daily-challenge-card">
      <div className="challenge-header">
        <div className="challenge-icon">{challenge.icon}</div>
        <div className="challenge-info">
          <div className="challenge-badge">
            <Calendar size={16} />
            Daily Challenge
          </div>
          <h3>{challenge.title}</h3>
          <p>{challenge.description}</p>
        </div>
      </div>

      <div className="challenge-details">
        <div className="detail-item">
          <Target size={20} />
          <span>Goal: {challenge.target} {challenge.category}</span>
        </div>
        <div className="detail-item">
          <Trophy size={20} />
          <span>Reward: {challenge.reward}</span>
        </div>
        <div className="detail-item">
          <Clock size={20} />
          <span>Resets in: {timeLeft}</span>
        </div>
      </div>

      {completed ? (
        <div className="challenge-completed">
          <div className="completed-icon">✅</div>
          <p>Challenge Completed!</p>
          <span>Come back tomorrow for a new challenge</span>
        </div>
      ) : (
        <button className="btn btn-challenge" onClick={startChallenge}>
          Start Challenge
        </button>
      )}
    </div>
  );
}

export default DailyChallenge;
