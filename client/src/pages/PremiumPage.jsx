import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPremium, getPremiumStatus, activatePremium, PREMIUM_FEATURES, PREMIUM_PRICING } from '../utils/premium';
import PremiumBadge from '../components/PremiumBadge';

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  
  const premiumStatus = getPremiumStatus();
  const premium = premiumStatus.isPremium;

  function handlePurchase() {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const duration = selectedPlan === 'yearly' ? 365 : 30;
      activatePremium(duration);
      alert(`Premium activated! Enjoy ad-free learning for ${selectedPlan === 'yearly' ? '1 year' : '30 days'}!`);
      setProcessing(false);
      navigate('/');
    }, 2000);
  }

  if (premium) {
    return (
      <div className="container">
        <div className="header">
          <h1>You're Premium! 👑</h1>
          <p>Enjoy all premium features</p>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          color: '#000',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👑</div>
          <h2 style={{ color: '#000' }}>Premium Active</h2>
          <p style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>
            {premiumStatus.daysRemaining} days remaining
          </p>
        </div>

        <div className="card">
          <h3>Your Premium Benefits</h3>
          <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
            {Object.entries(PREMIUM_FEATURES).map(([key, feature]) => (
              <li key={key} style={{
                padding: '0.75rem',
                background: 'var(--bg)',
                borderRadius: 'var(--radius)',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: 'var(--success)', fontSize: '1.25rem' }}>✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-links">
          <a href="/" className="nav-link">← Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Upgrade to Premium</h1>
        <p>Remove ads and unlock exclusive features</p>
      </div>

      {/* Free vs Premium Comparison */}
      <div className="card">
        <h2>Why Go Premium?</h2>
        <div style={{ 
          display: 'grid', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {/* Free */}
          <div style={{ padding: '1rem', background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
              Free Version
            </h3>
            <ul style={{ listStyle: 'none', fontSize: '0.875rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Classic Q&A mode</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Level mode (first 2 worlds)</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Custom notes</li>
              <li style={{ marginBottom: '0.5rem', opacity: 0.5 }}>✗ Ads between levels</li>
              <li style={{ marginBottom: '0.5rem', opacity: 0.5 }}>✗ Limited hints (3 per day)</li>
              <li style={{ marginBottom: '0.5rem', opacity: 0.5 }}>✗ Locked worlds</li>
            </ul>
          </div>

          {/* Premium */}
          <div style={{ 
            padding: '1rem', 
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: '#000',
            borderRadius: 'var(--radius)',
            border: '3px solid #FFD700'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#000' }}>
                Premium
              </h3>
              <PremiumBadge />
            </div>
            <ul style={{ listStyle: 'none', fontSize: '0.875rem', fontWeight: '500' }}>
              {Object.values(PREMIUM_FEATURES).map((feature, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  ✓ {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="card">
        <h2>Choose Your Plan</h2>
        <div style={{ 
          display: 'grid', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {Object.entries(PREMIUM_PRICING).map(([key, plan]) => (
            <div
              key={key}
              onClick={() => setSelectedPlan(key)}
              style={{
                padding: '1.5rem',
                border: selectedPlan === key ? '3px solid var(--primary)' : '2px solid var(--border)',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                background: selectedPlan === key ? 'var(--bg)' : 'var(--surface)',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              {plan.savings && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '10px',
                  background: 'var(--success)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  {plan.savings}
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                    {plan.label}
                  </h3>
                  <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>
                    ${plan.price}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {key === 'monthly' ? 'per month' : 'per year'}
                  </p>
                  {key === 'yearly' && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.5rem' }}>
                      Save $10/year vs monthly
                    </p>
                  )}
                </div>
                
                <div style={{ fontSize: '2rem' }}>
                  {selectedPlan === key ? '✓' : '○'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePurchase}
          disabled={processing}
          className="btn btn-primary btn-block"
          style={{ 
            marginTop: '1.5rem',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: '#000',
            fontSize: '1.1rem',
            fontWeight: '700'
          }}
        >
          {processing ? (
            <>
              <span className="spinner" style={{ marginRight: '0.5rem' }}></span>
              Processing...
            </>
          ) : (
            <>
              👑 Upgrade to Premium - ${PREMIUM_PRICING[selectedPlan].price}
            </>
          )}
        </button>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>Frequently Asked Questions</h3>
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>
            How does billing work?
          </summary>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '1rem' }}>
            You'll be charged ${PREMIUM_PRICING[selectedPlan].price} {selectedPlan === 'yearly' ? 'annually' : 'monthly'}. 
            Cancel anytime before renewal to avoid future charges.
          </p>
        </details>

        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>
            Can I cancel anytime?
          </summary>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '1rem' }}>
            Yes! Cancel anytime from your account settings. You'll keep premium until the end of your billing period.
          </p>
        </details>

        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>
            What payment methods do you accept?
          </summary>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '1rem' }}>
            We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and M-Pesa (Kenya).
          </p>
        </details>

        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>
            Is there a free trial?
          </summary>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '1rem' }}>
            First 2 worlds are free forever! Try them to see if BrightUp is right for you.
          </p>
        </details>
      </div>

      <div className="nav-links">
        <a href="/" className="nav-link">← Back to Home</a>
      </div>
    </div>
  );
}
