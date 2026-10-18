# Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **Select a project** → **New Project**
3. Project name: `BrightUp` (or your preferred name)
4. Click **Create**
5. Wait for project creation, then select it from the project dropdown

## Step 2: Enable Google Identity Services

1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for "Google Identity"
3. Click **Google Identity Toolkit API** (or **Google+ API**)
4. Click **Enable**

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type
3. Click **Create**
4. Fill in the required fields:
   - **App name**: BrightUp
   - **User support email**: your email
   - **Developer contact email**: your email
5. Click **Save and Continue**
6. Skip **Scopes** (click **Save and Continue**)
7. Add test users if needed, then **Save and Continue**
8. Click **Back to Dashboard**

## Step 4: Create OAuth 2.0 Client ID

1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `BrightUp Web Client`
5. **Authorized JavaScript origins**:
   - Add: `http://localhost:5174`
   - Add: `http://localhost:5173` (backup port)
   - Later add your production URL (e.g., `https://brightup.vercel.app`)
6. **Authorized redirect URIs**:
   - Add: `http://localhost:5174/auth/callback`
   - Later add production callback URL
7. Click **Create**
8. **IMPORTANT**: Copy the **Client ID** (looks like `123456789-abcdef.apps.googleusercontent.com`)

## Step 5: Configure BrightUp

1. In the `client/` directory, create a `.env` file:
   ```bash
   # Copy from .env.example
   cp .env.example .env
   ```

2. Edit `.env` and replace with your Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE.apps.googleusercontent.com
   VITE_GOOGLE_REDIRECT_URI=http://localhost:5174/auth/callback
   VITE_API_URL=http://localhost:3001
   ```

3. **NEVER commit the `.env` file to Git** (it's already in `.gitignore`)

## Step 6: Restart the Development Server

```powershell
# Stop the current dev server (Ctrl+C)
cd client
npm run dev
```

## Step 7: Test Google Login

1. Open http://localhost:5174
2. Click **Login** or navigate to login page
3. Click **Sign in with Google**
4. Choose your Google account
5. You should be redirected back and logged in!

## Troubleshooting

### "popup_closed_by_user" error
- User closed the popup before completing sign-in
- Try again

### "invalid_client" error
- Check that your Client ID is correct in `.env`
- Make sure you restarted the dev server after adding `.env`

### "redirect_uri_mismatch" error
- Go back to Google Cloud Console → Credentials
- Add the exact URL shown in the error to Authorized redirect URIs
- Common URLs to add:
  - `http://localhost:5174`
  - `http://localhost:5174/auth/callback`

### "access_denied" error
- User clicked "Cancel" on Google consent screen
- Or email not added as test user (if app is in testing mode)

## Production Deployment

When deploying to production (e.g., Vercel):

1. Go to Google Cloud Console → Credentials
2. Edit your OAuth client
3. Add production URLs:
   - Authorized JavaScript origins: `https://brightup.vercel.app`
   - Authorized redirect URIs: `https://brightup.vercel.app/auth/callback`
4. In Vercel, add environment variable:
   - `VITE_GOOGLE_CLIENT_ID=your_client_id`
   - `VITE_GOOGLE_REDIRECT_URI=https://brightup.vercel.app/auth/callback`
   - `VITE_API_URL=https://your-api.onrender.com`

## Security Notes

- ✅ Client ID is safe to expose publicly
- ❌ Never commit `.env` file
- ✅ OAuth tokens are handled by Google's library
- ✅ User data stored locally in browser only
- ⚠️ For production, add backend session management for security

## Quick Reference

**Google Cloud Console**: https://console.cloud.google.com
**Project**: Select "BrightUp"
**Location**: APIs & Services → Credentials
**Documentation**: https://developers.google.com/identity/gsi/web/guides/overview
