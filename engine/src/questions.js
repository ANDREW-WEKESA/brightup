/**
 * questions.js - Generate questions from term/definition pairs
 */

/**
 * Generate a question from a term/definition pair
 * @param {Object} pair - { term, definition }
 * @param {Array} allTerms - All available terms for wrong options
 * @returns {Object} - Question object
 */
export function generateQuestion(pair, allTerms = []) {
  const { term, definition } = pair;

  // Pick 3 wrong answers from other terms
  const wrongOptions = selectWrongOptions(term, allTerms, 3);

  // Build options array with correct answer + wrong answers
  const options = shuffleArray([
    { text: term, correct: true },
    ...wrongOptions.map(t => ({ text: t, correct: false }))
  ]);

  return {
    id: generateQuestionId(term, definition),
    prompt: definition,
    correctAnswer: term,
    options: options.length >= 4 ? options : [], // Only include options if we have 4+
    type: 'term-recall',
    explanation: `${term}: ${definition}`
  };
}

/**
 * Generate multiple questions from term pairs
 * @param {Array} pairs - Array of {term, definition}
 * @param {number} count - How many questions to generate
 * @returns {Array} - Array of question objects
 */
export function generateQuestions(pairs, count = null) {
  if (!pairs || pairs.length === 0) return [];

  const requestedCount = count || pairs.length;
  const availableCount = Math.min(requestedCount, pairs.length);
  
  // Shuffle pairs and take the requested count
  const selectedPairs = shuffleArray([...pairs]).slice(0, availableCount);
  
  // All terms for wrong options
  const allTerms = pairs.map(p => p.term);

  return selectedPairs.map(pair => generateQuestion(pair, allTerms));
}

/**
 * Select wrong answer options (terms that aren't the correct one)
 * @param {string} correctTerm 
 * @param {Array} allTerms 
 * @param {number} count 
 * @returns {Array<string>}
 */
function selectWrongOptions(correctTerm, allTerms, count) {
  const available = allTerms.filter(t => t !== correctTerm);
  
  if (available.length === 0) return [];
  if (available.length <= count) return available;

  // Shuffle and take count
  return shuffleArray(available).slice(0, count);
}

/**
 * Generate a unique question ID from term and definition
 * @param {string} term 
 * @param {string} definition 
 * @returns {string}
 */
function generateQuestionId(term, definition) {
  const combined = `${term}-${definition}`.toLowerCase().replace(/\s+/g, '-');
  return combined.substring(0, 50); // Keep it reasonable
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
