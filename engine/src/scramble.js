/**
 * scramble.js - Word scrambling for missed terms
 * 
 * Scrambles each word individually so the word count stays visible
 * Never returns the original term unchanged
 */

/**
 * Scramble a term by shuffling letters within each word
 * @param {string} term - The term to scramble
 * @returns {string} - Scrambled term (never equals original)
 */
export function scrambleTerm(term) {
  if (!term || typeof term !== 'string') {
    return '';
  }

  const words = term.split(/\s+/).filter(w => w.length > 0);
  const scrambledWords = words.map(word => scrambleWord(word));
  const result = scrambledWords.join(' ');

  // If somehow the scramble equals the original, try again (rare but possible with short words)
  if (result === term && term.length > 1) {
    return scrambleTerm(term); // Recursive retry
  }

  return result;
}

/**
 * Scramble a single word by shuffling its letters
 * @param {string} word 
 * @returns {string}
 */
function scrambleWord(word) {
  if (word.length <= 1) return word;

  const letters = word.split('');
  let scrambled;
  let attempts = 0;
  const maxAttempts = 50;

  // Keep shuffling until we get something different from the original
  do {
    scrambled = shuffleArray([...letters]).join('');
    attempts++;
  } while (scrambled === word && attempts < maxAttempts);

  return scrambled;
}

/**
 * Fisher-Yates shuffle
 * @param {Array} array 
 * @returns {Array}
 */
function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Validate that a scramble is correct (same letters, different order for multi-letter words)
 * @param {string} original 
 * @param {string} scrambled 
 * @returns {boolean}
 */
export function isValidScramble(original, scrambled) {
  if (!original || !scrambled) return false;

  // Normalize: lowercase and split into words
  const origWords = original.toLowerCase().split(/\s+/);
  const scramWords = scrambled.toLowerCase().split(/\s+/);

  if (origWords.length !== scramWords.length) return false;

  // Check each word pair
  for (let i = 0; i < origWords.length; i++) {
    const origWord = origWords[i];
    const scramWord = scramWords[i];

    // Same letters?
    const origSorted = origWord.split('').sort().join('');
    const scramSorted = scramWord.split('').sort().join('');

    if (origSorted !== scramSorted) return false;

    // Different order (unless single letter)?
    if (origWord.length > 1 && origWord === scramWord) return false;
  }

  return true;
}

/**
 * Check if user's rebuild matches the original term
 * @param {string} rebuilt - User's rebuilt answer
 * @param {string} original - Original term
 * @returns {boolean}
 */
export function checkScrambleAnswer(rebuilt, original) {
  if (!rebuilt || !original) return false;
  
  // Normalize both (case and punctuation insensitive)
  const normalizeForScramble = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')  // Replace punctuation with space
      .replace(/\s+/g, ' ')       // Collapse spaces
      .trim();
  };

  return normalizeForScramble(rebuilt) === normalizeForScramble(original);
}
