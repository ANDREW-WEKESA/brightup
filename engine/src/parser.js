/**
 * parser.js - Parse notes into term/definition pairs
 * 
 * Accepts formats:
 * - "Term: definition"
 * - "Term - definition"
 * - "Term is definition"
 * - "Term are definition"
 * - "Term refers to definition"
 * - "Term means definition"
 * 
 * Ignores bullets, numbers, and lines that don't match
 */

/**
 * Parse notes text into term/definition pairs
 * @param {string} notesText - Raw notes text
 * @returns {{ terms: Array<{term: string, definition: string}>, skipped: number }}
 */
export function parseNotes(notesText) {
  if (!notesText || typeof notesText !== 'string') {
    return { terms: [], skipped: 0 };
  }

  const lines = notesText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const terms = [];
  let skipped = 0;

  // Patterns: remove bullets/numbers at start, then split on separators
  const bulletPattern = /^[\-\*•]\s*/;
  const numberPattern = /^\d+[\.)]\s*/;
  
  // Separators: colon, dash, or linking words
  const separatorPatterns = [
    { regex: /^(.+?)\s*:\s*(.+)$/, priority: 1 },                    // Term: definition
    { regex: /^(.+?)\s+-\s+(.+)$/, priority: 2 },                   // Term - definition
    { regex: /^(.+?)\s+is\s+(.+)$/i, priority: 3 },                 // Term is definition
    { regex: /^(.+?)\s+are\s+(.+)$/i, priority: 3 },                // Term are definition
    { regex: /^(.+?)\s+refers\s+to\s+(.+)$/i, priority: 4 },        // Term refers to definition
    { regex: /^(.+?)\s+means\s+(.+)$/i, priority: 4 }               // Term means definition
  ];

  for (let line of lines) {
    // Remove bullets and numbers
    line = line.replace(bulletPattern, '').replace(numberPattern, '').trim();
    
    if (line.length === 0) {
      continue;
    }

    let matched = false;

    // Try each separator pattern in priority order
    for (const { regex } of separatorPatterns) {
      const match = line.match(regex);
      
      if (match) {
        const term = match[1].trim();
        const definition = match[2].trim();

        // Validate term and definition
        if (isValidTerm(term) && isValidDefinition(definition)) {
          terms.push({ term, definition });
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      skipped++;
    }
  }

  return { terms, skipped };
}

/**
 * Check if a term is valid (1-5 words, not too long)
 * @param {string} term 
 * @returns {boolean}
 */
function isValidTerm(term) {
  if (!term || term.length === 0) return false;
  if (term.length > 100) return false; // Too long to be a term
  
  const words = term.split(/\s+/).filter(w => w.length > 0);
  return words.length >= 1 && words.length <= 5;
}

/**
 * Check if a definition is valid (at least 12 characters, not empty)
 * @param {string} definition 
 * @returns {boolean}
 */
function isValidDefinition(definition) {
  return definition && definition.length >= 12;
}

/**
 * Normalize text for comparison (lowercase, remove punctuation and extra spaces)
 * @param {string} text 
 * @returns {string}
 */
export function normalizeText(text) {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')  // Replace punctuation with space
    .replace(/\s+/g, ' ')       // Collapse multiple spaces
    .trim();
}

/**
 * Check if two answers match (case-insensitive, punctuation-insensitive)
 * @param {string} answer - User's answer
 * @param {string} correct - Correct answer
 * @returns {boolean}
 */
export function answersMatch(answer, correct) {
  return normalizeText(answer) === normalizeText(correct);
}
