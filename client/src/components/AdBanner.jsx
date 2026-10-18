import { isPremium } from '../utils/premium';

export default function AdBanner({ position = 'bottom' }) {
  const premium = isPremium();
  
  if (premium) {
    return null; // No ads for premium users
  }

  const bannerStyle = {
    padding: '1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textAlign: 'center',
    borderRadius: 'var(--radius)',
    marginTop: position === 'bottom' ? '2rem' : '0',
    marginBottom: position === 'top' ? '2rem' : '0',
    border: '2px dashed rgba(255,255,255,0.3)'
  };

  return (
    <div style={bannerStyle}>
      <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.25rem' }}>
        ADVERTISEMENT
      </div>
      <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
        🎯 Want ad-free learning?
      </div>
      <div style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
        Upgrade to Premium for $4.99/month
      </div>
      <a 
        href="/premium" 
        style={{ 
          display: 'inline-block',
          padding: '0.5rem 1.5rem',
          background: 'white',
          color: '#667eea',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '0.875rem'
        }}
      >
        Learn More →
      </a>
    </div>
  );
}
