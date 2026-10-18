/**
 * Premium subscription management
 */

const PREMIUM_KEY = 'brightup_premium';
const PREMIUM_PRICE = 4.99; // USD per month

export function isPremium() {
  const stored = localStorage.getItem(PREMIUM_KEY);
  if (!stored) return false;
  
  const data = JSON.parse(stored);
  // Check if subscription is still valid
  const expiryDate = new Date(data.expiresAt);
  return expiryDate > new Date();
}

export function getPremiumStatus() {
  const stored = localStorage.getItem(PREMIUM_KEY);
  if (!stored) {
    return {
      isPremium: false,
      expiresAt: null,
      daysRemaining: 0
    };
  }
  
  const data = JSON.parse(stored);
  const expiryDate = new Date(data.expiresAt);
  const now = new Date();
  const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
  
  return {
    isPremium: expiryDate > now,
    expiresAt: data.expiresAt,
    daysRemaining: daysRemaining > 0 ? daysRemaining : 0
  };
}

export function activatePremium(duration = 30) {
  // Duration in days (30 = monthly, 365 = yearly)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + duration);
  
  const premiumData = {
    activatedAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
    duration,
    type: duration === 365 ? 'yearly' : 'monthly'
  };
  
  localStorage.setItem(PREMIUM_KEY, JSON.stringify(premiumData));
  return premiumData;
}

export function cancelPremium() {
  localStorage.removeItem(PREMIUM_KEY);
}

export const PREMIUM_FEATURES = {
  NO_ADS: 'Remove all advertisements',
  UNLIMITED_HINTS: 'Unlimited hints in level mode',
  ALL_WORLDS: 'Unlock all worlds immediately',
  CUSTOM_THEMES: 'Customize colors and themes',
  PROGRESS_BACKUP: 'Cloud progress backup',
  OFFLINE_MODE: 'Enhanced offline mode',
  STATISTICS: 'Advanced statistics and insights',
  PRIORITY_SUPPORT: 'Priority customer support'
};

export const PREMIUM_PRICING = {
  monthly: {
    price: 4.99,
    duration: 30,
    label: 'Monthly',
    savings: null
  },
  yearly: {
    price: 49.99,
    duration: 365,
    label: 'Yearly',
    savings: '17% off'
  }
};
