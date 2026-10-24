import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, TrendingUp, Target, Flame, Award, BookOpen } from 'lucide-react';
import './DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    currentStreak: 0,
    longestStreak: 0,
    unitsCompleted: 0,
    totalUnits: 22,
    recentActivity: [],
    achievements: []
  });

  useEffect(() => {
    // Load user statistics from localStorage
    const savedProgress = JSON.parse(localStorage.getItem('progress') || '{}');
    const savedStreak = JSON.parse(localStorage.getItem('streak') || '{"current": 0, "longest": 0}');
    
    const totalQuestions = Object.values(savedProgress).reduce((sum, unit) => sum + unit.length, 0);
    const correctAnswers = Object.values(savedProgress).reduce((sum, unit) => {
      return sum + unit.filter(q => q.correct).length;
    }, 0);

    setStats({
      totalQuestions,
      correctAnswers,
      currentStreak: savedStreak.current || 0,
      longestStreak: savedStreak.longest || 0,
      unitsCompleted: Object.keys(savedProgress).length,
      totalUnits: 22,
      recentActivity: getRecentActivity(savedProgress),
      achievements: calculateAchievements(totalQuestions, correctAnswers, savedStreak)
    });
  }, []);

  const getRecentActivity = (progress) => {
    // Get last 5 activities
    const activities = [];
    Object.entries(progress).forEach(([unitId, questions]) => {
      questions.slice(-5).forEach(q => {
        activities.push({
          unitId,
          question: q.question,
          correct: q.correct,
          timestamp: q.timestamp || Date.now()
        });
      });
    });
    return activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
  };

  const calculateAchievements = (total, correct, streak) => {
    const achievements = [];
    
    if (total >= 10) achievements.push({ icon: '🎯', title: 'First Steps', desc: 'Answered 10 questions' });
    if (total >= 50) achievements.push({ icon: '📚', title: 'Knowledge Seeker', desc: 'Answered 50 questions' });
    if (total >= 100) achievements.push({ icon: '🏆', title: 'Centurion', desc: 'Answered 100 questions' });
    if (total >= 500) achievements.push({ icon: '⭐', title: 'Master Learner', desc: 'Answered 500 questions' });
    
    if (streak.current >= 3) achievements.push({ icon: '🔥', title: 'On Fire', desc: '3-day streak' });
    if (streak.current >= 7) achievements.push({ icon: '💪', title: 'Committed', desc: '7-day streak' });
    if (streak.current >= 30) achievements.push({ icon: '👑', title: 'Unstoppable', desc: '30-day streak' });
    
    const accuracy = total > 0 ? (correct / total * 100) : 0;
    if (accuracy >= 70) achievements.push({ icon: '🎓', title: 'Sharp Mind', desc: '70%+ accuracy' });
    if (accuracy >= 85) achievements.push({ icon: '💎', title: 'Excellence', desc: '85%+ accuracy' });
    if (accuracy >= 95) achievements.push({ icon: '🌟', title: 'Perfectionist', desc: '95%+ accuracy' });
    
    return achievements;
  };

  const accuracy = stats.totalQuestions > 0 
    ? ((stats.correctAnswers / stats.totalQuestions) * 100).toFixed(1)
    : 0;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Your Learning Dashboard</h1>
        <p>Track your progress and achievements</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <BookOpen size={32} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalQuestions}</h3>
            <p>Questions Answered</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon accuracy">
            <Target size={32} />
          </div>
          <div className="stat-content">
            <h3>{accuracy}%</h3>
            <p>Accuracy Rate</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon streak">
            <Flame size={32} />
          </div>
          <div className="stat-content">
            <h3>{stats.currentStreak}</h3>
            <p>Day Streak</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">
            <TrendingUp size={32} />
          </div>
          <div className="stat-content">
            <h3>{stats.unitsCompleted}/{stats.totalUnits}</h3>
            <p>Units Completed</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="achievements-section">
          <h2><Award size={24} /> Achievements</h2>
          <div className="achievements-grid">
            {stats.achievements.length > 0 ? (
              stats.achievements.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h4>{achievement.title}</h4>
                  <p>{achievement.desc}</p>
                </div>
              ))
            ) : (
              <p className="empty-state">Start learning to unlock achievements!</p>
            )}
          </div>
        </div>

        <div className="recent-activity-section">
          <h2><TrendingUp size={24} /> Recent Activity</h2>
          <div className="activity-list">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className={`activity-item ${activity.correct ? 'correct' : 'incorrect'}`}>
                  <div className="activity-status">
                    {activity.correct ? '✓' : '✗'}
                  </div>
                  <div className="activity-content">
                    <p className="activity-question">{activity.question}</p>
                    <span className="activity-time">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">No recent activity yet. Start learning!</p>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Continue Learning
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
