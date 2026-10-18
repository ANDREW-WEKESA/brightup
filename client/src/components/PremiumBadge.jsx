export default function PremiumBadge() {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.25rem 0.75rem',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      color: '#000',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      <span>👑</span>
      <span>Premium</span>
    </div>
  );
}
