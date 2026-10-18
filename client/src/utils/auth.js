/**
 * Authentication utilities
 * Google OAuth + Email/Password authentication
 */

const AUTH_KEY = 'brightup_auth';
const USER_KEY = 'brightup_user';

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:5174/auth/callback';

/**
 * Initialize Google OAuth
 */
export async function initGoogleAuth() {
  // Load Google Identity Services library
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
    document.head.appendChild(script);
  });
}

/**
 * Login with Google
 */
export async function loginWithGoogle() {
  try {
    const google = await initGoogleAuth();
    
    return new Promise((resolve, reject) => {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          handleGoogleCallback(response)
            .then(resolve)
            .catch(reject);
        }
      });

      // Show the One Tap dialog
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to button flow if One Tap is not displayed
          const buttonDiv = document.createElement('div');
          document.body.appendChild(buttonDiv);
          
          google.accounts.id.renderButton(buttonDiv, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            text: 'continue_with'
          });
          
          buttonDiv.querySelector('div[role=button]')?.click();
          buttonDiv.remove();
        }
      });
    });
  } catch (error) {
    throw new Error('Google sign-in failed: ' + error.message);
  }
}

/**
 * Handle Google OAuth callback
 */
async function handleGoogleCallback(response) {
  try {
    // Decode JWT token (in production, verify on backend)
    const token = response.credential;
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      provider: 'google',
      emailVerified: payload.email_verified
    };

    // Save auth data
    saveAuthData(user, token);
    
    return user;
  } catch (error) {
    throw new Error('Failed to process Google login');
  }
}

/**
 * Login with Email/Password
 */
export async function loginWithEmail(email, password) {
  // In production, this would call your backend API
  // For demo, we'll simulate authentication
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Check if user exists in localStorage
  const users = getStoredUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error('No account found with this email. Please sign up.');
  }

  // Verify password (in production, this is done securely on backend)
  if (user.password !== hashPassword(password)) {
    throw new Error('Incorrect password');
  }

  // Remove password before saving to session
  const { password: _, ...userWithoutPassword } = user;
  saveAuthData(userWithoutPassword, generateToken(user));

  return userWithoutPassword;
}

/**
 * Sign up with Email/Password
 */
export async function signupWithEmail(email, password, name) {
  // Validation
  if (!email || !password || !name) {
    throw new Error('All fields are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Check if user already exists
  const users = getStoredUsers();
  if (users.find(u => u.email === email)) {
    throw new Error('An account with this email already exists');
  }

  // Create new user
  const user = {
    id: generateUserId(),
    email,
    name,
    password: hashPassword(password),
    provider: 'email',
    emailVerified: false,
    createdAt: new Date().toISOString()
  };

  // Save user
  users.push(user);
  localStorage.setItem('brightup_all_users', JSON.stringify(users));

  // Remove password before saving to session
  const { password: _, ...userWithoutPassword } = user;
  saveAuthData(userWithoutPassword, generateToken(user));

  return userWithoutPassword;
}

/**
 * Logout
 */
export function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
  
  // Sign out from Google
  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }
}

/**
 * Get current user
 */
export function getCurrentUser() {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return !!getCurrentUser();
}

/**
 * Get auth token
 */
export function getAuthToken() {
  return localStorage.getItem(AUTH_KEY);
}

/**
 * Save auth data
 */
function saveAuthData(user, token) {
  localStorage.setItem(AUTH_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Get stored users (for demo purposes)
 */
function getStoredUsers() {
  const stored = localStorage.getItem('brightup_all_users');
  return stored ? JSON.parse(stored) : [];
}

/**
 * Simple password hashing (use bcrypt in production!)
 */
function hashPassword(password) {
  // This is NOT secure! Use bcrypt or similar in production
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

/**
 * Generate user ID
 */
function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Generate auth token
 */
function generateToken(user) {
  // In production, this would be a JWT from your backend
  return btoa(JSON.stringify({
    userId: user.id,
    email: user.email,
    exp: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
  }));
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email) {
  // In production, this would call your backend
  const users = getStoredUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('No account found with this email');
  }

  // Simulate sending email
  console.log('Password reset email sent to:', email);
  return true;
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates) {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('Not authenticated');
  }

  const updatedUser = { ...user, ...updates };
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

  // Update in all users list
  const users = getStoredUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index >= 0) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem('brightup_all_users', JSON.stringify(users));
  }

  return updatedUser;
}
