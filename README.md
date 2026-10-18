# BrightUp

A revision game that turns Year 3 Software Engineering notes into questions and word discovery puzzles.

## 🎮 Two Game Modes

### 1. Classic Mode (Q&A)
- Answer questions based on definitions
- Multiple-choice or typed answers
- Word scrambles when you get stuck
- Session-based progress tracking

### 2. Level Mode (NEW! - Words of Wonders Style)
- Discover words from letter circles
- Fill crossword grids
- Progress through 5 worlds with 19 levels
- Earn stars and unlock new levels
- Learn through word discovery instead of Q&A

## Features

✅ **11 Comprehensive Units** - 380+ terms covering all Year 3 Software Engineering courses  
✅ **Based on Real Course Content** - Kisii University study materials (SOEN 201, 255, 301, 303, 305, 320, 350, 370)  
✅ **Custom Notes** - Paste your own notes from any university  
✅ **Multiple Choice & Typed Answers** - Choose your learning style  
✅ **Word Scrambles** - Rebuild terms when you get stuck  
✅ **Progress Tracking** - Monitor mastery across units  
✅ **Revision Queue** - Missed questions return 3-5 questions later  
✅ **Offline Support** - Works without internet once loaded  
✅ **Mobile Responsive** - Works on phones, tablets, and desktops  

## Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Engine:** Rule-based question generation (no AI)
- **Storage:** Browser localStorage (no accounts)

## Quick Start

### Prerequisites
- Node.js 20 or later

### Installation

```bash
# Install all dependencies
cd engine && npm install
cd ../server && npm install
cd ../client && npm install
```

### Run Development Servers

**Option 1: Windows Batch File**
```bash
# From the brightup directory
START.bat
```

**Option 2: Manual Start**
```bash
# Terminal 1: Start server (port 3000)
cd server
npm run dev

# Terminal 2: Start client (port 5173)
cd client
npm run dev
```

Then open http://localhost:5173 in your browser.

## Project Structure

```
brightup/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── pages/       # HomePage, GamePage, ResultsPage, etc.
│   │   ├── utils/       # engine.js, storage.js, api.js
│   │   └── styles/      # Global CSS
│   └── package.json
├── server/          # Node + Express API
│   ├── src/
│   │   ├── data/        # Built-in units with 73 terms
│   │   └── index.js     # Express server with /api/units
│   └── package.json
├── engine/          # Question generation & scramble logic
│   ├── src/
│   │   ├── parser.js    # Parse notes into term/definition pairs
│   │   ├── questions.js # Generate questions with options
│   │   ├── scramble.js  # Word scrambling logic
│   │   └── *.test.js    # 44 passing tests
│   └── package.json
└── docs/            # Requirements and design documents
```

## Built-in Units (380+ Terms)

### Core Courses
1. **SOEN 201 - Data Structures and Algorithms** - 35 terms (arrays, trees, graphs, sorting, Big-O)
2. **SOEN 255 - API Design & Implementation** - 50 terms (REST, OAuth, Apigee, security)
3. **SOEN 301 - Computer Security** - 45 terms (CIA triad, cryptography, threats, controls)
4. **SOEN 303 - Component Development** - 20 terms (modularity, interfaces, versioning)
5. **SOEN 305 - Object Oriented Programming (Java II)** - 30 terms (patterns, generics, threading)
6. **SOEN 320 - Special Topics** - 25 terms (DevOps, CI/CD, microservices, containers)
7. **SOEN 350 - Mobile Application Development** - 75 terms (Android, lifecycle, intents, APIs)
8. **SOEN 370 - Design and Development** - 30 terms (SOLID, UML, SDLC, architecture)

### Practice Units
9. **Software Testing and Quality Assurance** - 16 terms
10. **Software Project Management** - 15 terms
11. **Software Architecture and Design Patterns** - 15 terms

_All content based on Kisii University official course materials and comprehensive study notes._
2. **Software Project Management** - 15 terms
3. **Software Architecture and Design Patterns** - 15 terms
4. **Information Security** - 15 terms
5. **Mobile Application Development** - 12 terms

## Testing

```bash
# Run engine tests (44 tests, all passing)
cd engine
npm test
```

## How It Works

### 1. Unit Selection
- Pick one or more units (built-in or custom)
- Choose session length: 5, 10, 20, or all terms
- Select answer mode: multiple-choice or typed

### 2. Game Session
- Answer questions based on term definitions
- Get instant feedback (correct/incorrect)
- Wrong answers trigger word scramble puzzle
- Rebuild the term from scrambled letters to continue

### 3. Results & Progress
- See your score and time taken
- Review missed terms
- Track mastery per unit over time
- Progress saved in browser localStorage

## Creating Custom Units

1. Click **Create Custom Unit** from home page
2. Give your unit a name
3. Paste your notes in one of these formats:
   ```
   Term: definition
   Term - definition
   Term is definition
   Term are definition
   ```
4. Click **Extract Terms**
5. Review and remove any incorrect extractions
6. Click **Save Unit**

The parser accepts:
- Bullets and numbers at the start of lines
- Terms with 1-5 words
- Definitions with at least 12 characters

## Notes Format Examples

```markdown
Unit testing: testing of individual functions in isolation
- Regression testing - retesting after code changes
2) Integration testing is testing combined components
```

All three lines above will be parsed correctly.

## Development Notes

### Engine Tests
All 44 tests pass:
- Parser tests (9): colon/dash/is separators, bullets, validation
- Question generation tests (6): options, wrong answers, counts
- Scramble tests (9): word-by-word shuffling, validation
- Answer matching tests (4): case/punctuation insensitive

### API Endpoints
- `GET /api/units` - List all built-in units
- `GET /api/units/:id` - Get one unit with full terms
- `GET /health` - Server health check

### Storage Schema
```javascript
// localStorage
brightup_custom_units: [{ id, name, terms, createdAt }]
brightup_progress: { unitId: { termId: { correct, total, lastPracticed } } }
brightup_misses: { "unitId:term": { count, lastMissed } }

// sessionStorage (auto-save during game)
brightup_session: { questions, currentIndex, results, ... }
```

## Roadmap

### Version 1.1
- More Year 3 units (target: 30+ terms each)
- .docx and PDF import
- American/British spelling tolerance
- Progress backup/restore

### Version 2
- User accounts
- Progress synced across devices
- Share custom units with classmates

### Version 3
- AI-generated questions
- Explanations from learner's interests
- Support for other courses and schools

## License

Built by Andrew for Year 3 BSc Software Engineering revision.

## Contributing

This is a personal project for Year 3 coursework. Not accepting contributions at this time.

---

**Built with BrightUp. Get brighter. 💡**
