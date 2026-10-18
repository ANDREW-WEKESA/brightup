# BrightUp Deployment Guide

This guide covers deploying BrightUp Version 1 to production.

## Version 1 Deployment Strategy

Version 1 is designed for **single-user, personal use** with browser storage only. No accounts, no database, no user data on the server.

## Deployment Options

### Option 1: Static Hosting (Recommended for V1)

Since the client uses localStorage and the server only serves static data, you can deploy them separately.

**Client:** Deploy to any static host
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

**Server:** Deploy to any Node.js host
- Render
- Railway
- Fly.io
- Heroku

### Option 2: Single Server

Deploy both client and server on one host by serving the built client from Express.

## Step-by-Step: Deploy to Render + Vercel

### 1. Prepare for Production

**Server:**
```javascript
// server/src/index.js - already done, no changes needed
const PORT = process.env.PORT || 3001;
```

**Client:**
```javascript
// client/src/utils/api.js
const BASE_URL = import.meta.env.PROD
  ? 'https://brightup-api.onrender.com/api'  // Your actual API URL
  : '/api';
```

### 2. Build the Client

```bash
cd client
npm run build
```

This creates `client/dist/` with the production build.

### 3. Deploy Server (Render)

1. Push your code to GitHub
2. Go to https://render.com
3. Create new "Web Service"
4. Connect your repo
5. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
6. Add environment variables if needed
7. Deploy

Your API will be at: `https://your-app.onrender.com`

### 4. Deploy Client (Vercel)

1. Go to https://vercel.com
2. Import your repo
3. Settings:
   - **Root Directory:** `client`
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   - `VITE_API_URL=https://your-app.onrender.com`
5. Deploy

Your app will be at: `https://brightup.vercel.app`

## Alternative: Single-Server Deployment

### Serve Client from Express

```javascript
// server/src/index.js
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, '../../client/dist')));

// API routes first
app.get('/api/units', ...);
app.get('/api/units/:id', ...);

// Catch-all for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
```

Then build and deploy:
```bash
# Build client
cd client
npm run build

# Deploy server folder (includes built client)
cd ../server
# Deploy to your host
```

## Environment Variables

### Server
```env
PORT=3001                    # Port number
NODE_ENV=production         # Environment
```

### Client
```env
VITE_API_URL=https://api.brightup.com  # API endpoint in production
```

## Production Checklist

Before deploying:

### Security
- ✅ Rate limiting implemented (100 req/min)
- ✅ Input validation (1MB limit)
- ✅ CORS configured
- ⚠️ Add HTTPS in production
- ⚠️ Set secure CORS origins (not *)

### Performance
- ✅ Gzip compression (automatic on most hosts)
- ✅ Client-side caching (localStorage)
- ⚠️ Consider CDN for static assets

### Monitoring
- ⚠️ Add error logging (e.g., Sentry)
- ⚠️ Add uptime monitoring (e.g., UptimeRobot)
- ⚠️ Add analytics if desired (respects NFR-8: no personal data)

### Testing
- ✅ All engine tests pass
- ✅ Test on production URL before launch
- ✅ Test on mobile device
- ✅ Test offline functionality

## Post-Deployment

### 1. Test Production Build Locally

```bash
# Build client
cd client
npm run build

# Serve with a static server
npx serve dist -p 5000

# Test at http://localhost:5000
```

### 2. Monitor

Check these after deployment:
- Health endpoint: `https://your-api.com/health`
- Units endpoint: `https://your-api.com/api/units`
- Client loads: `https://your-app.com`
- Custom notes work
- Progress persists

### 3. Update README

Update the README with production URLs:
```markdown
## Live Demo

🚀 **BrightUp is live!**

App: https://brightup.vercel.app
API: https://brightup-api.onrender.com
```

## Rollback Plan

If something breaks in production:

1. Check error logs
2. Roll back to previous deployment
3. Fix issue locally
4. Test thoroughly
5. Redeploy

Most hosts (Vercel, Render) keep previous deployments and allow instant rollback.

## Version 1.1 Deployment Changes

When you add .docx/.pdf import and more units:

1. Update server data file with new units
2. Add document parsing libraries
3. Update client to handle file uploads
4. Test file size limits
5. Deploy both client and server

## Cost Estimates (Free Tier)

**Render:**
- Free tier: Yes (with sleep after inactivity)
- Paid: $7/month (keeps server awake)

**Vercel:**
- Free tier: Yes (generous limits)
- Bandwidth: 100GB/month free

**Total for Version 1:** $0-7/month

For a personal project with <100 users, free tiers are sufficient.

## Security Hardening for Public Release

Before sharing publicly:

```javascript
// server/src/index.js

// 1. Restrict CORS
app.use(cors({
  origin: 'https://brightup.vercel.app',  // Only your domain
  credentials: true
}));

// 2. Add helmet for security headers
import helmet from 'helmet';
app.use(helmet());

// 3. Add request logging
import morgan from 'morgan';
app.use(morgan('combined'));

// 4. Stricter rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100  // limit each IP to 100 requests per windowMs
});
app.use(limiter);
```

Install new packages:
```bash
npm install helmet morgan express-rate-limit
```

## Backup Strategy

Since Version 1 uses localStorage:

**User-level backup:**
1. Add "Export Progress" button
2. Downloads JSON file with:
   - Custom units
   - Progress data
   - Weak terms
3. Add "Import Progress" to restore

**No server-side backups needed in V1** - all data is client-side.

## Domain Setup (Optional)

If you want a custom domain:

1. Buy domain (e.g., brightup.app)
2. Point DNS to Vercel:
   - Add A/CNAME records
3. Configure in Vercel dashboard
4. Update CORS and API URLs

## Monitoring Production

**Free tools:**
- Render dashboard: Server logs and status
- Vercel dashboard: Client analytics and logs
- Browser DevTools: Test from user perspective
- Google Lighthouse: Performance audit

**Paid tools (optional):**
- Sentry: Error tracking
- LogRocket: Session replay
- Datadog: Full monitoring

## Version 1 vs Version 2 Deployment

**V1 (current):**
- Static client + stateless API
- localStorage only
- No database
- No user accounts

**V2 (future):**
- Database needed (PostgreSQL recommended)
- User authentication (e.g., Clerk, Auth0)
- Session management
- Data migrations
- Backup/restore infrastructure

## Conclusion

Version 1 is simple to deploy because:
- No database
- No user accounts
- No server-side state
- Client is static HTML/CSS/JS
- API only serves built-in units

This makes it fast, cheap, and easy to maintain.

---

**Ready to deploy? Follow Option 1 (Render + Vercel) for the easiest setup!**
