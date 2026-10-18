/**
 * BrightUp Server - Main entry point
 */

import express from 'express';
import cors from 'cors';
import { getAllUnits, getUnitById } from './data/units.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' })); // FR-8: limit uploads to 1MB

// Rate limiting (simple in-memory version for v1)
const requestCounts = new Map();
const RATE_LIMIT = 100; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }
  
  const requests = requestCounts.get(ip);
  const recentRequests = requests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  next();
}

app.use(rateLimit);

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/units - List all built-in units
app.get('/api/units', (req, res) => {
  try {
    const units = getAllUnits();
    res.json({ units, total: units.length });
  } catch (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ error: 'Failed to fetch units' });
  }
});

// GET /api/units/:id - Get one unit with full terms
app.get('/api/units/:id', (req, res) => {
  try {
    const { id } = req.params;
    const unit = getUnitById(id);
    
    if (!unit) {
      return res.status(404).json({ error: 'Unit not found' });
    }
    
    res.json(unit);
  } catch (error) {
    console.error('Error fetching unit:', error);
    res.status(500).json({ error: 'Failed to fetch unit' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BrightUp server running on http://localhost:${PORT}`);
  console.log(`📚 ${getAllUnits().length} units available`);
  console.log(`🧪 Health check: http://localhost:${PORT}/health`);
});
