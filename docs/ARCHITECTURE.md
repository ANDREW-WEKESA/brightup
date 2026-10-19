# BrightUp Architecture

## System Overview

BrightUp is a full-stack learning platform with three main components:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │─────▶│   Server    │─────▶│    Data     │
│  (React)    │◀─────│  (Express)  │◀─────│  (In-Memory)│
└─────────────┘      └─────────────┘      └─────────────┘
     │                                           │
     │                                           │
     ▼                                           ▼
┌─────────────┐                           ┌─────────────┐
│ localStorage│                           │  22 Units   │
│  (Browser)  │                           │  875+ Terms │
└─────────────┘                           └─────────────┘
```

## Components

### 1. Engine (`/engine`)
**Purpose**: Core question generation logic

**Responsibilities:**
- Parse text notes into term/definition pairs
- Generate questions with multiple-choice options
- Create word scrambles
- Calculate difficulty

**Key Files:**
- `parser.js` - Extract terms from notes
- `questions.js` - Generate Q&A format
- `scramble.js` - Create word puzzles
- `*.test.js` - 44 unit tests

**Technology:** Pure Node.js (no dependencies)

---

### 2. Server (`/server`)
**Purpose**: API backend serving content

**Responsibilities:**
- Serve unit catalog (GET /api/units)
- Serve unit details (GET /api/units/:id)
- Rate limiting
- CORS handling

**Key Files:**
- `src/index.js` - Express server
- `src/data/units.js` - Main unit registry
- `src/data/comprehensive-units.js` - Year 3 courses
- `src/data/expanded-units.js` - Year 1-2 courses
- `src/data/year4-advanced.js` - Year 4 courses
- `src/data/specialized-topics.js` - Electives

**Technology:** Node.js + Express

**Port:** 3001 (configurable via PORT env var)

---

### 3. Client (`/client`)
**Purpose**: User interface and game logic

**Responsibilities:**
- User authentication (Google OAuth + email/password)
- Game mode rendering (Q&A + Word Discovery)
- Progress tracking
- Premium status management
- Offline functionality

**Key Files:**
- `src/pages/` - 11 page components
  - HomePage.jsx
  - LoginPage.jsx
  - GamePage.jsx
  - WordLevelPage.jsx
  - ResultsPage.jsx
  - PremiumPage.jsx
  - etc.
- `src/utils/` - Utilities
  - `engine.js` - Client-side question generation
  - `api.js` - Server communication
  - `auth.js` - Authentication logic
  - `premium.js` - Premium features
  - `clues.js` - Smart clue generation
  - `storage.js` - localStorage abstraction

**Technology:** React 18 + Vite

**Port:** 5174 (Vite default)

---

## Data Flow

### Q&A Mode
```
1. User selects units → HomePage
2. Fetch units from server → api.js
3. Generate questions → engine.js
4. Display question → GamePage
5. Check answer → engine.js
6. Save progress → storage.js (localStorage)
7. Show results → ResultsPage
```

### Level Mode (Word Discovery)
```
1. User selects world → WorldsPage
2. Choose level → WorldMapPage
3. Fetch 4 terms → WordLevelPage
4. Generate clue → clues.js
5. Show letters → shuffle algorithm
6. User forms word → letter selection
7. Check answer → term matching
8. Next question or complete → progression
```

---

## Authentication Flow

### Google OAuth
```
1. User clicks "Sign in with Google" → LoginPage
2. Google OAuth popup → Google Identity Services
3. Receive token → auth.js
4. Store user data → localStorage
5. Redirect to home → React Router
```

### Email/Password
```
1. User enters credentials → LoginPage
2. Validate email format → auth.js
3. Create user object → auth.js
4. Store in localStorage → auth.js
5. Redirect to home → React Router
```

---

## State Management

### Client-Side State (localStorage)
- **Key:** `brightup_user`
  - User ID, email, name, login method
  
- **Key:** `brightup_premium`
  - Active status, tier, dates
  
- **Key:** `brightup_unit_X_progress`
  - Correct/total per unit (Q&A mode)
  
- **Key:** `brightup_world_X_progress`
  - Completed levels, stars (Level mode)

---

## API Endpoints

### GET /api/units
Returns list of all available units

**Response:**
```json
{
  "units": [
    {
      "id": "soen-101-intro-programming",
      "name": "SOEN 101 - Introduction to Programming",
      "description": "...",
      "termCount": 40
    }
  ],
  "total": 22
}
```

### GET /api/units/:id
Returns full unit with all terms

**Response:**
```json
{
  "id": "soen-101-intro-programming",
  "name": "SOEN 101 - Introduction to Programming",
  "description": "...",
  "termCount": 40,
  "terms": [
    {
      "term": "Variable",
      "definition": "What named storage..."
    }
  ]
}
```

---

## Security Architecture

### Client-Side
- Input sanitization
- React's built-in XSS protection
- HTTPS enforcement (production)
- localStorage encryption consideration

### Server-Side
- CORS configured
- Rate limiting (100 req/min per IP)
- No SQL injection (no database)
- Express security headers

### Authentication
- OAuth 2.0 (Google)
- Session tokens in localStorage
- No passwords stored (OAuth)
- Basic validation for email/password

---

## Deployment Architecture

### Production Setup
```
┌──────────────────┐
│   Cloudflare     │  CDN, DDoS protection
│   or similar     │
└────────┬─────────┘
         │
    ┌────▼────┐
    │ Vercel  │  Static client hosting
    └────┬────┘
         │
    ┌────▼────┐
    │ Render  │  Node.js server hosting
    └─────────┘
```

**Client (Vercel):**
- React build artifacts
- Environment variables for API URL
- Automatic HTTPS
- Global CDN

**Server (Render/Railway):**
- Express API
- Environment variables
- Auto-scaling
- Health checks

---

## Performance Considerations

### Client
- Code splitting (React.lazy)
- Service worker for offline
- LocalStorage for caching
- Minimal dependencies

### Server
- In-memory data (fast reads)
- Rate limiting prevents abuse
- CORS only for allowed origins
- Compression middleware

---

## Future Architecture

### Database Layer
```
Client → Server → PostgreSQL
                ↓
            Redis Cache
```

### Microservices (if scaling)
```
Gateway → Auth Service
       → Content Service
       → Analytics Service
       → Payment Service
```

---

## File Structure
```
brightup/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/   # Route components
│   │   ├── utils/   # Helper functions
│   │   └── styles/  # Global CSS
│   └── public/      # Static assets
├── server/          # Express backend
│   └── src/
│       ├── data/    # Content modules
│       └── index.js # Server entry
├── engine/          # Question logic
│   ├── src/
│   └── tests/
├── docs/            # Documentation
└── scripts/         # Build/deploy scripts
```

---

**Last Updated:** January 19, 2026  
**Version:** 1.0.0
