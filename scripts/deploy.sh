#!/bin/bash
# Deployment script for BrightUp

echo "🚀 Starting BrightUp deployment..."

# Build client
echo "📦 Building client..."
cd client
npm run build

# Build server (if needed)
echo "📦 Preparing server..."
cd ../server
npm install --production

echo "✅ Build complete!"
echo "Ready to deploy to:"
echo "  - Client: Vercel"
echo "  - Server: Render/Railway"
