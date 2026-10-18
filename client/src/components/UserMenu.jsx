import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';
import { isPremium } from '../utils/premium';

export default function UserMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const user = getCurrentUser();
  const premium = isPremium();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <a href="/login">
          <button className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
            Sign In
          </button>
        </a>
      </div>
    );
  }

  function handleLogout() {
    logout();
    navigate('/');
    window.location.reload();
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '50px',
          cursor: 'pointer'
        }}
      >
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <span style={{ fontSize: '0.875rem', paddingRight: '0.5rem' }}>▼</span>
      </button>

      {showMenu && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setShowMenu(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              right: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-lg)',
              minWidth: '200px',
              zIndex: 1000
            }}
          >
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.email}</div>
              {premium && (
                <div style={{ 
                  marginTop: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#000',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  👑 Premium
                </div>
              )}
            </div>

            <div style={{ padding: '0.5rem 0' }}>
              <button
                onClick={() => {
                  navigate('/progress');
                  setShowMenu(false);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                📊 My Progress
              </button>

              {!premium && (
                <button
                  onClick={() => {
                    navigate('/premium');
                    setShowMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: 'var(--warning)'
                  }}
                >
                  👑 Upgrade to Premium
                </button>
              )}

              <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: 'var(--error)'
                }}
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
