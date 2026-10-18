# Authentication Testing Guide

## Email/Password Login (Works Immediately)

The email/password authentication works right away without any external setup.

### Test Scenario 1: New User Registration

1. Start the app: `cd client && npm run dev`
2. Navigate to http://localhost:5174/login
3. Enter credentials:
   - Email: `student@brightup.com`
   - Password: `password123`
4. Click **Sign In**
5. ✅ Should redirect to home page
6. ✅ Should see user menu in top-right with email
7. ✅ Should see "Free Plan" badge

### Test Scenario 2: Return User

1. Close and reopen browser
2. Navigate to http://localhost:5174
3. ✅ Should still be logged in (session persists)
4. ✅ User menu should show same email

### Test Scenario 3: Logout

1. Click on user email in top-right
2. Click **Logout**
3. ✅ Should redirect to login page
4. ✅ Refreshing app should require login again

### Test Scenario 4: Email Validation

Try invalid emails at login:
- `notanemail` → ❌ Should show error
- `test@` → ❌ Should show error  
- `test@domain` → ✅ Should accept
- `student@brightup.com` → ✅ Should accept

### Test Scenario 5: Premium Integration

1. Login as any user
2. Navigate to http://localhost:5174/premium
3. Click **Subscribe Now** (demo mode - instant activation)
4. ✅ User menu should change to "Premium" badge
5. ✅ No ads should show on game pages
6. ✅ All worlds unlocked in level mode
7. ✅ Unlimited hints in Q&A mode

### Test Scenario 6: Protected Routes

1. Open browser in incognito/private mode
2. Try to navigate directly to:
   - http://localhost:5174/game → ✅ Should redirect to /login
   - http://localhost:5174/worlds → ✅ Should redirect to /login
   - http://localhost:5174/premium → ✅ Should redirect to /login

## Google OAuth Login (Requires Setup)

See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for configuration steps.

### Test Scenario 7: Google Sign-In

1. Complete Google OAuth setup
2. Navigate to http://localhost:5174/login
3. Click **Sign in with Google**
4. ✅ Google account picker should open
5. Select account
6. ✅ Should redirect back to app
7. ✅ Should be logged in with Google email
8. ✅ User menu should show Google profile picture (if available)

### Test Scenario 8: Google Premium User

1. Login with Google
2. Upgrade to premium
3. Logout
4. Login again with same Google account
5. ✅ Should remember premium status
6. ✅ Should see "Premium" badge immediately

## Storage Inspection (Developer Tools)

### View Stored User Data

1. Open Developer Tools (F12)
2. Go to **Application** tab → **Local Storage**
3. Select `http://localhost:5174`
4. Look for keys:
   - `brightup_user` → Current user object
   - `brightup_premium` → Premium subscription data
   - `brightup_unit_X_progress` → Q&A mode progress
   - `brightup_world_X_progress` → Level mode progress

### Example User Object

```json
{
  "id": "user_1234567890",
  "email": "student@brightup.com",
  "name": "student@brightup.com",
  "loginMethod": "email",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Example Premium Object

```json
{
  "active": true,
  "tier": "monthly",
  "startDate": "2024-01-15T10:35:00.000Z",
  "endDate": "2024-02-15T10:35:00.000Z"
}
```

## Common Issues & Fixes

### Issue: "User not logged in" on protected pages
**Cause**: Session expired or cleared
**Fix**: Navigate to /login and sign in again

### Issue: Premium status not showing after payment
**Cause**: Browser cache or state not updated
**Fix**: Refresh page or logout/login again

### Issue: Multiple users on same browser
**Cause**: localStorage is per-domain, not per-user
**Fix**: Logout before switching users, or use incognito mode

### Issue: Lost progress after logout
**Cause**: Progress is tied to user ID in storage keys
**Fix**: Login with same account to restore progress

## Next Steps

After testing authentication:

1. ✅ Test Q&A game mode (classic questions)
2. ✅ Test Level mode (word discovery)
3. ✅ Test premium features (no ads, all worlds)
4. ✅ Test progress persistence across sessions
5. 📋 Deploy to production (see DEPLOYMENT.md)
6. 📋 Set up real Stripe payments
7. 📋 Add Google AdSense for ads

## Manual Testing Checklist

- [ ] Email/password login works
- [ ] Email validation prevents invalid emails
- [ ] Session persists after browser refresh
- [ ] Logout clears session
- [ ] Protected routes redirect to login
- [ ] Google OAuth login works (after setup)
- [ ] Premium upgrade changes user badge
- [ ] Premium users see no ads
- [ ] Premium users access all worlds
- [ ] Progress saves per user
- [ ] Multiple users can use same browser (different sessions)

## Automated Testing (Future)

Consider adding Playwright or Cypress tests for:
- Login flow end-to-end
- Premium upgrade flow
- Session persistence
- Protected route guards
- Game completion with auth
