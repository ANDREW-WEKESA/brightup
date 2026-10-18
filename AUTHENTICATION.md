# 🔐 BrightUp Authentication System

**Google OAuth + Email/Password Login**

---

## Features Implemented

### Authentication Methods

1. **Google Sign-In** (One-Tap + Button flow)
   - OAuth 2.0 integration
   - Automatic profile sync
   - Email verification included
   - Profile picture support

2. **Email/Password**
   - Traditional signup/login
   - Password validation (min 6 characters)
   - Stored locally (demo mode)
   - Production-ready structure

3. **Guest Access**
   - Continue without account
   - Limited features
   - No progress saving

---

## Setup Guide

### 1. Google OAuth Setup

**Create Google Cloud Project:**

1. Go to: https://console.cloud.google.com
2. Create new project: "BrightUp"
3. Enable **Google Identity Services**
4. Create OAuth 2.0 credentials

**Configure OAuth Consent:**
- App name: BrightUp
- User support email: your@email.com
- Authorized domains: localhost, your-domain.com
- Scopes: email, profile

**Create Client ID:**
1. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
2. Application type: **Web application**
3. Name: BrightUp Web Client
4. Authorized JavaScript origins:
   ```
   http://localhost:5174
   https://yourdomain.com
   ```
5. Authorized redirect URIs:
   ```
   http://localhost:5174/auth/callback
   https://yourdomain.com/auth/callback
   ```
6. Click **Create**
7. **Copy your Client ID**

### 2. Environment Configuration

Create `.env` file in `client/` folder:

```bash
# Google OAuth
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=http://localhost:5174/auth/callback

# API
VITE_API_URL=http://localhost:3001
```

**Important:** Replace `YOUR_CLIENT_ID_HERE` with your actual Google Client ID!

### 3. Install Dependencies

```bash
cd client
npm install
```

Google Identity Services library is loaded dynamically from CDN.

---

## How It Works

### Login Flow

```
User clicks "Continue with Google"
       ↓
Google One-Tap appears (or fallback to button)
       ↓
User selects Google account
       ↓
Google returns JWT token
       ↓
App decodes token and extracts user info
       ↓
User data saved to localStorage
       ↓
Redirect to home page (authenticated)
```

### Email/Password Flow

```
User enters email + password
       ↓
Client validates format
       ↓
Check against stored users (demo)
       ↓
Generate auth token
       ↓
Save user data to localStorage
       ↓
Redirect to home page (authenticated)
```

---

## User Data Structure

### Google User Object
```javascript
{
  id: "google_user_id",
  email: "user@gmail.com",
  name: "John Doe",
  picture: "https://lh3.googleusercontent.com/...",
  provider: "google",
  emailVerified: true
}
```

### Email User Object
```javascript
{
  id: "user_12345_abc",
  email: "user@example.com",
  name: "Jane Smith",
  provider: "email",
  emailVerified: false,
  createdAt: "2026-10-18T10:30:00Z"
}
```

---

## Storage Schema

### localStorage Keys

```javascript
// Current authenticated user
brightup_auth: "base64_token"
brightup_user: {user_object}

// All registered users (demo only)
brightup_all_users: [{user1}, {user2}, ...]

// Premium status (separate)
brightup_premium: {expires_at, type}

// Progress data
brightup_progress: {...}
brightup_misses: {...}
```

---

## API Functions

### `auth.js` Utilities

```javascript
// Login Methods
loginWithGoogle()           // Google OAuth flow
loginWithEmail(email, pass) // Email/password login
signupWithEmail(email, pass, name) // Create account

// User Management
getCurrentUser()            // Get logged-in user
isAuthenticated()          // Check if logged in
logout()                   // Sign out

// Profile
updateUserProfile(updates) // Update user info
sendPasswordResetEmail(email) // Reset password

// Token
getAuthToken()             // Get auth token
```

---

## UI Components

### LoginPage Features

✅ Google One-Tap sign-in  
✅ Email/password form  
✅ Sign up / Sign in toggle  
✅ Guest access option  
✅ Error handling  
✅ Loading states  
✅ Responsive design  
✅ Privacy links  

### UserMenu Component

✅ Profile picture display  
✅ User name/email  
✅ Premium badge (if applicable)  
✅ Progress link  
✅ Upgrade to Premium link  
✅ Sign out button  
✅ Dropdown menu  

---

## Integration with Existing Features

### Premium Sync

When user upgrades to premium:
```javascript
import { getCurrentUser } from '../utils/auth';
import { activatePremium } from '../utils/premium';

const user = getCurrentUser();
if (user) {
  activatePremium(30); // 30 days
  // Sync to backend if user is authenticated
}
```

### Progress Sync

Save progress with user ID:
```javascript
import { getCurrentUser } from '../utils/auth';
import { saveProgress } from '../utils/storage';

const user = getCurrentUser();
if (user) {
  saveProgress(unitId, termId, correct, user.id);
  // Future: sync to cloud
}
```

---

## Production Backend Integration

### Current (Demo Mode)

- Users stored in `localStorage`
- Passwords hashed with simple algorithm
- Tokens generated client-side
- No server validation

### Production Requirements

**Backend API Endpoints:**

```javascript
// Authentication
POST /api/auth/google      // Verify Google token
POST /api/auth/signup      // Email signup
POST /api/auth/login       // Email login
POST /api/auth/logout      // Invalidate token
POST /api/auth/refresh     // Refresh token

// User
GET  /api/user/profile     // Get user profile
PUT  /api/user/profile     // Update profile
POST /api/user/password-reset // Reset password

// Progress Sync
GET  /api/progress/:userId // Get user progress
POST /api/progress         // Save progress
```

**Security Requirements:**

1. **Password Hashing:** Use bcrypt (not simple hash)
2. **JWT Tokens:** Sign with secret key
3. **HTTPS Only:** No plain HTTP in production
4. **Rate Limiting:** Prevent brute force
5. **Token Expiry:** Refresh tokens regularly
6. **Input Validation:** Sanitize all inputs
7. **SQL Injection:** Use parameterized queries
8. **CORS:** Configure allowed origins

---

## Testing the Login

### Test Google Login

1. Run the app: `npm run dev`
2. Go to: http://localhost:5174/login
3. Click "Continue with Google"
4. Select your Google account
5. Should redirect to home page
6. Check top-right for user menu

### Test Email Login

1. Go to: http://localhost:5174/login
2. Click "Don't have an account? Sign up"
3. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Click "Create Account"
5. Should redirect to home page

### Test Logout

1. Click user avatar (top-right)
2. Click "Sign Out"
3. Should clear session and show "Sign In" button

---

## Error Handling

### Common Errors

**"Failed to load Google Identity Services"**
- Check internet connection
- Verify Google script can load
- Check browser console for blocked scripts

**"No account found with this email"**
- Email not registered
- Click "Sign up" to create account

**"Incorrect password"**
- Wrong password entered
- Use "Forgot password?" (future feature)

**"An account with this email already exists"**
- Email already registered
- Click "Already have an account? Sign in"

---

## Security Best Practices

### Current Implementation

✅ Passwords hashed before storage  
✅ Tokens validated on each request  
✅ Email validation  
✅ Minimum password length (6 chars)  
⚠️ Client-side only (demo mode)  

### For Production

🔒 **Move auth to backend**  
🔒 **Use bcrypt for passwords**  
🔒 **Sign JWT tokens server-side**  
🔒 **Add email verification**  
🔒 **Implement rate limiting**  
🔒 **Enable HTTPS only**  
🔒 **Add 2FA (optional)**  

---

## Future Enhancements

### Phase 1 (Current)
✅ Google OAuth  
✅ Email/Password  
✅ Guest access  
✅ Basic profile  

### Phase 2 (Next)
- [ ] Email verification
- [ ] Password reset via email
- [ ] Social login (Facebook, Apple)
- [ ] Profile editing
- [ ] Account deletion

### Phase 3 (Later)
- [ ] Two-factor authentication
- [ ] Session management
- [ ] Login history
- [ ] Account security settings
- [ ] Magic link login

---

## Troubleshooting

### Google Login Not Working

1. **Check Client ID:**
   ```bash
   # In .env file
   VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID
   ```

2. **Verify Authorized Origins:**
   - Must match exactly (with port)
   - http://localhost:5174 (not 5173!)

3. **Check Console Errors:**
   - Open DevTools (F12)
   - Look for Google API errors

### Email Login Issues

1. **Clear localStorage:**
   ```javascript
   localStorage.clear();
   ```

2. **Check stored users:**
   ```javascript
   console.log(localStorage.getItem('brightup_all_users'));
   ```

3. **Reset demo data:**
   ```javascript
   localStorage.removeItem('brightup_all_users');
   ```

---

## Migration to Backend

### Step 1: Create Backend API

```javascript
// server/src/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save to database
  const user = await db.users.create({
    email,
    password: hashedPassword,
    name
  });
  
  // Generate JWT
  const token = jwt.sign(
    { userId: user.id }, 
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  
  res.json({ user, token });
});

export default router;
```

### Step 2: Update Client

```javascript
// client/src/utils/auth.js
export async function signupWithEmail(email, password, name) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  
  if (!response.ok) {
    throw new Error('Signup failed');
  }
  
  const { user, token } = await response.json();
  saveAuthData(user, token);
  return user;
}
```

---

## Summary

✅ **Google OAuth integrated**  
✅ **Email/Password authentication**  
✅ **User menu with profile**  
✅ **Guest access option**  
✅ **Production-ready structure**  
✅ **Complete UI components**  
✅ **Secure localStorage handling**  

**Ready for production with backend integration!** 🔐
