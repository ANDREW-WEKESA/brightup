import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import './Leaderboard.css';

function Leaderboard() {
  const [timeframe, setTimeframe] = useState('alltime');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    // In a real app, this would fetch from API
    // For now, we'll generate mock data
    generateMockLeaderboard();
  }, [timeframe]);

  const generateMockLeaderboard = () => {
    const mockUsers = [
      { name: 'Sarah Chen', score: 9850, accuracy: 96.5, streak: 42, avatar: '👩‍💻' },
      { name: 'Michael Johnson', score: 9420, accuracy: 94.2, streak: 38, avatar: '👨‍🎓' },
      { name: 'Emily Davis', score: 8990, accuracy: 93.8, streak: 35, avatar: '👩‍🔬' },
      { name: 'James Wilson', score: 8765, accuracy: 92.1, streak: 31, avatar: '👨‍💼' },
      { name: 'Lisa Anderson', score: 8430, accuracy: 91.5, streak: 28, avatar: '👩‍🎓' },
      { name: 'David Martinez', score: 8210, accuracy: 90.8, streak: 25, avatar: '👨‍🏫' },
      { name: 'Anna Thompson', score: 7995, accuracy: 89.9, streak: 22, avatar: '👩‍💼' },
      { name: 'Chris Lee', score: 7780, accuracy: 88.7, streak: 19, avatar: '👨‍🔧' },
      { name: 'Maria Garcia', score: 7565, accuracy: 87.4, streak: 16, avatar: '👩‍⚕️' },
      { name: 'Robert Brown', score: 7350, accuracy: 86.2, streak: 14, avatar: '👨‍🎨' }
    ];

    setLeaderboardData(mockUsers);
    
    // Set user rank (for demo, user is ranked 15th)
    setUserRank({
      rank: 15,
      name: 'You',
      score: 6840,
      accuracy: 84.3,
      streak: 7,
      avatar: '😊'
    });
  };

  const getRankMedal = (rank) => {
    switch (rank) {
      case 1:
        return <span className="rank-medal gold">🥇</span>;
      case 2:
        return <span className="rank-medal silver">🥈</span>;
      case 3:
        return <span className="rank-medal bronze">🥉</span>;
      default:
        return <span className="rank-number">#{rank}</span>;
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2><Trophy size={28} /> Global Leaderboard</h2>
        <p>Compete with learners worldwide</p>
      </div>

      <div className="timeframe-selector">
        <button 
          className={timeframe === 'daily' ? 'active' : ''}
          onClick={() => setTimeframe('daily')}
        >
          Daily
        </button>
        <button 
          className={timeframe === 'weekly' ? 'active' : ''}
          onClick={() => setTimeframe('weekly')}
        >
          Weekly
        </button>
        <button 
          className={timeframe === 'monthly' ? 'active' : ''}
          onClick={() => setTimeframe('monthly')}
        >
          Monthly
        </button>
        <button 
          className={timeframe === 'alltime' ? 'active' : ''}
          onClick={() => setTimeframe('alltime')}
        >
          All Time
        </button>
      </div>

      <div className="leaderboard-list">
        {leaderboardData.map((user, index) => (
          <div key={index} className={`leaderboard-item rank-${index + 1}`}>
            <div className="rank-badge">
              {getRankMedal(index + 1)}
            </div>
            <div className="user-avatar">{user.avatar}</div>
            <div className="user-info">
              <h4>{user.name}</h4>
              <div className="user-stats-mini">
                <span className="stat-item">
                  <TrendingUp size={14} />
                  {user.streak} days
                </span>
                <span className="stat-item">
                  {user.accuracy}% accuracy
                </span>
              </div>
            </div>
            <div className="user-score">
              <strong>{user.score.toLocaleString()}</strong>
              <span>points</span>
            </div>
          </div>
        ))}
      </div>

      {userRank && (
        <div className="user-rank-card">
          <h3>Your Rank</h3>
          <div className="leaderboard-item user-item">
            <div className="rank-badge">
              <span className="rank-number">#{userRank.rank}</span>
            </div>
            <div className="user-avatar">{userRank.avatar}</div>
            <div className="user-info">
              <h4>{userRank.name}</h4>
              <div className="user-stats-mini">
                <span className="stat-item">
                  <TrendingUp size={14} />
                  {userRank.streak} days
                </span>
                <span className="stat-item">
                  {userRank.accuracy}% accuracy
                </span>
              </div>
            </div>
            <div className="user-score">
              <strong>{userRank.score.toLocaleString()}</strong>
              <span>points</span>
            </div>
          </div>
          <p className="rank-motivation">
            Keep learning to climb the ranks! 🚀
          </p>
        </div>
      )}

      <div className="leaderboard-info">
        <div className="info-card">
          <Medal size={24} />
          <h4>How Points Work</h4>
          <p>Earn points by answering questions correctly, maintaining streaks, and completing units.</p>
        </div>
        <div className="info-card">
          <Award size={24} />
          <h4>Ranking System</h4>
          <p>Rankings update every hour. The more you learn, the higher you climb!</p>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
