# BrightUp Deployment Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Database Migration](#database-migration)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: v6.x or higher
- **Git**: Latest version

### Accounts Needed
- MongoDB Atlas account (for production database)
- Google Cloud Console (for OAuth)
- Domain registrar (for custom domain)
- Optional: Stripe account (for payments)

---

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/brightup.git
cd brightup
```

### 2. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables
```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` with your actual values:
```env
# Required
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/brightup
JWT_SECRET=your-super-secret-key-min-32-characters
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:5173

# Optional (for production)
STRIPE_SECRET_KEY=sk_live_...
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
```

---

## Local Development

### Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Access the app at: `http://localhost:5173`

### Running Tests
```bash
# Server tests
cd server
npm test

# Client tests
cd client
npm test

# Run all tests
./scripts/test-all.sh
```

---

## Production Deployment

### Option 1: Deploy to Heroku

#### 1. Prepare Heroku App
```bash
# Login to Heroku
heroku login

# Create new app
heroku create brightup-prod

# Add MongoDB addon
heroku addons:create mongolab:sandbox
```

#### 2. Configure Environment Variables
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set GOOGLE_CLIENT_ID=your-client-id
heroku config:set GOOGLE_CLIENT_SECRET=your-client-secret
heroku config:set NODE_ENV=production
```

#### 3. Deploy
```bash
git push heroku main
```

---

### Option 2: Deploy to Vercel (Recommended for Frontend)

#### 1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2. Deploy Frontend
```bash
cd client
vercel --prod
```

#### 3. Configure Environment Variables
Add in Vercel dashboard:
- `VITE_API_URL=https://your-backend.herokuapp.com/api`
- `VITE_GOOGLE_CLIENT_ID=your-client-id`

---

### Option 3: Deploy to DigitalOcean/AWS

#### 1. Set Up Server
```bash
# SSH into your server
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
# Follow official MongoDB installation guide

# Install PM2 for process management
npm install -g pm2
```

#### 2. Clone and Configure
```bash
git clone https://github.com/yourusername/brightup.git
cd brightup
npm install --production
cp .env.example .env
# Edit .env with production values
```

#### 3. Build Frontend
```bash
cd client
npm run build
```

#### 4. Start with PM2
```bash
cd ../server
pm2 start server.js --name brightup-api
pm2 startup
pm2 save
```

#### 5. Configure Nginx
```nginx
server {
    listen 80;
    server_name brightup.com;

    location / {
        root /var/www/brightup/client/dist;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 6. Enable SSL with Certbot
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d brightup.com -d www.brightup.com
```

---

## Database Migration

### Initial Data Seed
```bash
cd server
npm run seed
```

### Backup Database
```bash
# MongoDB Atlas backup (automated)
# Or manual backup:
mongodump --uri="mongodb+srv://..." --out=backup-$(date +%Y%m%d)
```

### Restore Database
```bash
mongorestore --uri="mongodb+srv://..." backup-20260119
```

---

## Monitoring

### Application Monitoring

**PM2 Monitoring:**
```bash
pm2 monit
pm2 logs brightup-api
```

**Health Check Endpoint:**
```bash
curl https://api.brightup.com/health
```

### Database Monitoring

**MongoDB Atlas:**
- Enable monitoring in Atlas dashboard
- Set up alerts for high CPU, memory usage
- Configure backup schedules

### Error Tracking

Consider integrating:
- **Sentry**: For error tracking
- **LogRocket**: For user session replay
- **Google Analytics**: For usage analytics

---

## Performance Optimization

### Backend Optimization
```javascript
// Enable compression
app.use(compression());

// Cache frequently accessed data
const redis = require('redis');
const client = redis.createClient();

// Database indexing
await Unit.collection.createIndex({ name: 1 });
await User.collection.createIndex({ email: 1 });
```

### Frontend Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Enable code splitting in vite.config.js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        router: ['react-router-dom']
      }
    }
  }
}
```

---

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Verify MongoDB is running and MONGODB_URI is correct

**2. CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Add CLIENT_URL to CORS whitelist in server config

**3. Google OAuth Not Working**
```
Error: invalid_client
```
**Solution:** Verify redirect URIs in Google Cloud Console match your domain

**4. Build Fails on Vercel**
```
Error: Cannot find module 'vite'
```
**Solution:** Ensure all dependencies are in package.json, not devDependencies for production builds

### Log Analysis

**View Server Logs:**
```bash
# PM2 logs
pm2 logs brightup-api --lines 100

# Direct logs
tail -f server/logs/combined.log
```

**View Client Logs:**
- Open browser DevTools → Console
- Check Network tab for failed requests

---

## Rollback Strategy

### Quick Rollback
```bash
# Revert to previous commit
git revert HEAD
git push heroku main

# Or rollback PM2
pm2 reload brightup-api
```

### Full Rollback
```bash
# Restore database backup
mongorestore --drop backup-20260118

# Deploy previous version
git checkout v1.0.0
npm install
npm run build
pm2 restart brightup-api
```

---

## Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Environment variables secured (not in code)
- [ ] Database connections use strong passwords
- [ ] JWT secrets are random and complex (32+ chars)
- [ ] API rate limiting enabled
- [ ] CORS configured properly
- [ ] MongoDB access restricted by IP
- [ ] Regular dependency updates (`npm audit`)
- [ ] Security headers configured (helmet.js)
- [ ] User input sanitized and validated

---

## Maintenance Schedule

**Weekly:**
- Monitor error logs
- Check server resource usage
- Review user feedback

**Monthly:**
- Update dependencies (`npm update`)
- Review and rotate API keys
- Database backup verification
- Performance audit

**Quarterly:**
- Security audit
- Load testing
- Cost optimization review

---

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/yourusername/brightup/issues)
- Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- Email: support@brightup.com

---

**Last Updated:** January 19, 2026
