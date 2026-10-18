# Level Mode Clue Examples

## How It Works Now

The level mode now **automatically converts definitions into clues** so players have context for finding words.

### Before (Meaningless)
```
Find these words:
??? → (no hint)
??? ↓ (no hint)
```
Players had no idea what words to look for!

### After (With Smart Clues)
```
Find these words:
What is coordinated protection of hardware software data networks and users from unauthorized access...? → 
(Answer: SYSTEM SECURITY)

What do you call something valuable that needs protection like databases or confidential data...? ↓
(Answer: ASSET)

What is anything with potential to cause harm to an information system...? →
(Answer: THREAT)
```

## Clue Generation Rules

The `clues.js` utility automatically:

### 1. Detects Question Format
If definition already ends with `?`, uses it as-is:
- **Definition**: "What is the CIA triad?"
- **Clue**: "What is the CIA triad?"

### 2. Converts "X is Y" Pattern
- **Definition**: "process of verifying identity of user"
- **Clue**: "What is process of verifying identity of user?"

### 3. Handles "X that does Y"
- **Definition**: "component that performs long-running operations in background"
- **Clue**: "What performs long-running operations in background?"

### 4. Handles "X for Y"
- **Definition**: "tool for building applications on Android"
- **Clue**: "What is used for building applications on Android?"

### 5. Technical Terms
- **Definition**: "framework organizing work into sprints with daily meetings"
- **Clue**: "What framework organizing work into sprints with daily meetings?"

### 6. Truncates Long Definitions
If no pattern matches, takes first 80 characters:
- **Definition**: "self-balancing binary search tree where heights of left and right subtrees differ by at most one ensuring logarithmic time complexity for insertions and lookups"
- **Clue**: "self-balancing binary search tree where heights of left and right subtrees..."

## Letter Hints (Optional)

When player clicks "Show Letter Hints":

### Single Word Terms
- **Term**: "ENCRYPTION"
- **Hint**: "10 letters: E...N"

### Multi-Word Terms
- **Term**: "SYSTEM SECURITY"  
- **Hint**: "2 words: S S..."

## Example Level Flow

**Level 1 - SOEN 301: Computer Security**

```
Find These Words:

1. What is coordinated protection of hardware software data networks and users...? →
   [Player forms: SYSTEM SECURITY] ✓

2. What valuable needs protection like databases or confidential data...? ↓
   [Player forms: ASSET] ✓

3. What has potential to cause harm to information system...? →
   [Player forms: THREAT] ✓

4. What weakness could be exploited by threats...? ↓
   [Player forms: VULNERABILITY] ✓
```

After clicking "Show Letter Hints":
```
1. ... (14 letters: S...Y) →
2. ... (5 letters: A...T) ↓
3. ... (6 letters: T...T) →
4. ... (13 letters: V...Y) ↓
```

## Technical Implementation

**File**: `client/src/utils/clues.js`
- `generateClue(term, definition)` - Converts definition to clue
- `generateLetterHint(term)` - Creates letter hints
- `formatClue(term, definition, showHint)` - Combines both

**Usage** in `WordLevelPage.jsx`:
```javascript
import { formatClue } from '../utils/clues';

// Displays intelligent clue instead of ???
{formatClue(item.term, item.definition, showHint)}
```

## Benefits

✅ **Playable from day 1** - No need to rewrite 380 definitions  
✅ **Contextual clues** - Players understand what word to find  
✅ **Progressive hints** - Start with clue, optionally show letters  
✅ **Automatic** - Works with any definition format  
✅ **Educational** - Players learn through context, not just memorization  

## Testing the Fix

1. Start servers:
   ```powershell
   cd server && npm run dev
   cd client && npm run dev
   ```

2. Go to Level Mode (Words of Wonders style):
   - Click "Level Mode" from home
   - Select any unit (try SOEN 350 - Mobile Development)
   - Start Level 1

3. Observe:
   - Each unfound word shows a clear clue/question
   - Click "Show Letter Hints" for additional help
   - Form words from letter circle
   - Check word to see if correct

## Future Improvements

### Option 1: Manual Question Writing
For better quality, could manually write questions for core units:
```javascript
{ 
  term: 'Encryption', 
  question: 'What converts data into coded format requiring key for decryption?',
  definition: 'process of converting data into coded format...' 
}
```

### Option 2: Category Clues
Add category hints:
```
🔐 Security Concept: What converts data into coded format...?
📱 Android Component: What represents single screen with UI...?
```

### Option 3: Difficulty Levels
- **Easy**: Full clue + letter hints
- **Medium**: Full clue only
- **Hard**: Category + letter count only

---

**Status**: ✅ Fixed in commit 34  
**Impact**: Level mode is now fully playable and educational!
