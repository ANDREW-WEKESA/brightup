# BrightUp Testing Guide

This document walks you through testing all features of BrightUp Version 1.

## Prerequisites

Make sure both servers are running:
```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

Then open http://localhost:5174 (or the port shown in your terminal)

## Test Scenarios (Acceptance Criteria)

### AC-1: Pick Software Testing and 10 questions

1. Open http://localhost:5174
2. Check the checkbox for "Software Testing and Quality Assurance"
3. Select "10 questions" from session length dropdown
4. Click "Start Session"
5. **Expected:** See question 1 of 10 with a definition and 4 multiple choice options

### AC-2: Answer a question wrongly

1. Continue from AC-1
2. Click a WRONG answer
3. **Expected:**
   - "✗ Incorrect" alert appears
   - The correct answer is shown
   - A scramble puzzle appears with shuffled letters
   - The scramble uses the same letters as the term
4. Rebuild the term by clicking the letter tiles
5. Click "Check Answer"
6. **Expected:** Question advances if correct, or prompts you to try again

### AC-3: Type "model-view controller" in typed mode

1. Start a new session
2. Select "Software Architecture and Design Patterns"
3. Change answer mode to "Type Answer"
4. Start the session
5. When you see the definition "design pattern that separates application into data layer presentation layer and control logic"
6. Type `model-view controller` (lowercase, no hyphens)
7. Click "Submit Answer"
8. **Expected:** Answer is accepted as correct (matches "Model View Controller")

### AC-4: Paste 10 lines with 2 unreadable ones

1. Click "Create Custom Unit" from home page
2. Name it "Test Unit"
3. Paste this text:
   ```
   Unit testing: testing individual functions in isolation
   This line has no separator so it should be skipped
   Integration testing: testing combined components together
   Regression testing - retesting after code changes
   Another line without proper format
   Black box testing: testing without code knowledge
   White box testing - testing with code knowledge
   Smoke testing is preliminary testing before detailed tests
   Load testing: testing under maximum workload
   Stress testing: testing beyond normal capacity
   ```
4. Click "Extract Terms"
5. **Expected:** "Found **8** terms (skipped 2 lines)"

### AC-5: Close browser mid-session and reopen

1. Start a session and answer 3-4 questions
2. Close the browser tab completely
3. Reopen http://localhost:5174
4. Click "View Progress"
5. **Expected:** The terms you answered are recorded in progress (even though the session didn't complete)

### AC-6: Finish a session

1. Start a new session with 5 questions
2. Answer all 5 questions
3. **Expected:**
   - Results page shows score (e.g., "80%" or "4 out of 5 correct")
   - Time taken is displayed
   - Missed terms are listed

### AC-7: Turn off internet after first load

1. Open the app with internet connection
2. Wait for all units to load
3. Disconnect from internet (turn off WiFi or unplug ethernet)
4. Select a built-in unit and start a session
5. **Expected:** Game works normally without internet

**Note:** Custom units saved before going offline will also work.

### AC-8: Open on 360px wide phone

1. Open browser DevTools (F12)
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Set width to 360px
4. Test the app at this width
5. **Expected:**
   - No horizontal scrolling
   - All buttons are at least 44px (tappable)
   - Text is readable
   - Options stack vertically on small screens

**Keyboard test:**
1. Use Tab key to navigate through buttons and inputs
2. Use Enter to activate buttons
3. Use arrow keys where applicable
4. **Expected:** All actions work from keyboard

### AC-9: Paste a 2MB block of text

1. Go to "Create Custom Unit"
2. Paste a very large text (you can repeat the same 100 lines many times to exceed 1MB)
3. Try to extract terms
4. **Expected:** 
   - The server rejects requests over 1MB with error message
   - Or the client handles gracefully with a message

**Note:** The current implementation limits JSON payloads to 1MB on the server.

## Feature Walkthrough

### 1. Built-in Units

**Units available:**
- Software Testing and Quality Assurance (16 terms)
- Software Project Management (15 terms)
- Software Architecture and Design Patterns (15 terms)
- Information Security (15 terms)
- Mobile Application Development (12 terms)

**Test:**
1. Select all units (click "Select All")
2. Choose "All terms" session length
3. Start session
4. **Expected:** All 73 terms appear as questions

### 2. Custom Notes

**Supported formats:**
- `Term: definition`
- `Term - definition`
- `Term is definition`
- `Term are definition`
- `Term refers to definition`
- `Term means definition`

**Test each format:**
```
API: Application Programming Interface
REST - Representational State Transfer
JSON is JavaScript Object Notation
Microservices are loosely coupled services
JWT refers to JSON Web Token
CRUD means Create Read Update Delete
```

**Expected:** All 6 terms extracted successfully

### 3. Multiple Choice vs Typed Mode

**Multiple Choice:**
- 4 options appear (1 correct + 3 wrong)
- Wrong options come from the same unit pool
- Click to select

**Typed Mode:**
- Input field appears
- Type the answer
- Case/punctuation/spacing insensitive

**Test:**
1. Try both modes on the same unit
2. Note that typed mode is harder (no options to choose from)

### 4. Scramble Mechanic

**How it works:**
- Each word is scrambled separately
- Number of words stays visible
- Letters can be reshuffled
- Click tiles to build the answer

**Test:**
1. Intentionally answer wrong
2. See scramble appear (e.g., "Uint stnetig" for "Unit testing")
3. Click tiles to rebuild
4. Click "Reshuffle" to shuffle available letters
5. Submit when done

**Expected:** Scramble never equals the original term (it's always different)

### 5. Revision Queue

**How it works:**
- Wrong answers go back into the queue 3-5 questions later
- A term missed 3 times should be marked weak
- Session ends when all questions are answered correctly

**Test:**
1. Start a 10-question session
2. Intentionally get question 2 wrong
3. Complete the scramble
4. Continue answering
5. **Expected:** Question 2 appears again around question 5-7

### 6. Progress Tracking

**What's tracked:**
- Per-unit progress (terms mastered out of total)
- Per-term accuracy (correct/total)
- Weak terms (missed recently)

**Test:**
1. Complete 2-3 sessions with the same unit
2. Get some terms right both times
3. Get some terms wrong
4. Go to "View Progress"
5. **Expected:**
   - Terms you got right twice show as mastered
   - Terms you missed appear in "Weak Terms"
   - Overall progress bar reflects mastery

## Engine Tests

All 44 automated tests pass:

```bash
cd engine
npm test
```

**Test coverage:**
- Parser (9 tests): All note formats, validation, skipping
- Questions (6 tests): Generation, options, counts
- Scramble (9 tests): Word-by-word shuffling, validation
- Answer matching (4 tests): Case/punctuation insensitive

## Performance Checks

### Speed (NFR-1)
- Answer feedback should appear in under 200ms
- Paste 5000 lines and time the parsing
- **Expected:** Completes in under 1 second

### Page Weight (NFR-2)
1. Open DevTools → Network tab
2. Hard refresh (Ctrl+Shift+R)
3. Check total transferred
4. **Expected:** Under 300KB on first load

### Accessibility (NFR-5)
1. Test with keyboard only (no mouse)
2. Use screen reader if available
3. Check color contrast in DevTools
4. **Expected:**
   - All actions work from keyboard
   - Screen reader reads button labels
   - Correct/incorrect shown with text, not just color

## Known Limitations (Version 1)

These are intentionally left for later versions:

❌ AI-generated questions (Version 3)  
❌ User accounts (Version 2)  
❌ Progress sync across devices (Version 2)  
❌ .docx/.pdf import (Version 1.1)  
❌ American/British spelling tolerance (Version 1.1)  
❌ Shared units (Version 2)  
❌ More than 5 built-in units (Version 1.1)  

## Bug Reporting

If you find a bug during testing:

1. Note what you were doing
2. Note what you expected
3. Note what actually happened
4. Check browser console for errors (F12 → Console)
5. Document steps to reproduce

## Success Criteria

Version 1 is complete when:

✅ All 9 acceptance criteria pass  
✅ All 44 engine tests pass  
✅ Every built-in unit has checked terms  
✅ The builder has revised a full unit with it  

---

**Happy Testing! 🧪**
