/**
 * Client-side engine wrapper
 * Implements the same logic as the server engine for offline use
 */

export function parseNotes(notesText) {
  if (!notesText || typeof notesText !== 'string') {
    return { terms: [], skipped: 0 };
  }

  const lines = notesText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const terms = [];
  let skipped = 0;

  const bulletPattern = /^[\-\*•]\s*/;
  const numberPattern = /^\d+[\.)]\s*/;
  
  const separatorPatterns = [
    { regex: /^(.+?)\s*:\s*(.+)$/ },
    { regex: /^(.+?)\s+-\s+(.+)$/ },
    { regex: /^(.+?)\s+is\s+(.+)$/i },
    { regex: /^(.+?)\s+are\s+(.+)$/i },
    { regex: /^(.+?)\s+refers\s+to\s+(.+)$/i },
    { regex: /^(.+?)\s+means\s+(.+)$/i }
  ];

  for (let line of lines) {
    line = line.replace(bulletPattern, '').replace(numberPattern, '').trim();
    
    if (line.length === 0) continue;

    let matched = false;

    for (const { regex } of separatorPatterns) {
      const match = line.match(regex);
      
      if (match) {
        const term = match[1].trim();
        const definition = match[2].trim();

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

function isValidTerm(term) {
  if (!term || term.length === 0) return false;
  if (term.length > 100) return false;
  
  const words = term.split(/\s+/).filter(w => w.length > 0);
  return words.length >= 1 && words.length <= 5;
}

function isValidDefinition(definition) {
  return definition && definition.length >= 12;
}

export function normalizeText(text) {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function answersMatch(answer, correct) {
  return normalizeText(answer) === normalizeText(correct);
}

export function scrambleTerm(term) {
  if (!term || typeof term !== 'string') return '';

  const words = term.split(/\s+/).filter(w => w.length > 0);
  const scrambledWords = words.map(word => scrambleWord(word));
  const result = scrambledWords.join(' ');

  if (result === term && term.length > 1) {
    return scrambleTerm(term);
  }

  return result;
}

function scrambleWord(word) {
  if (word.length <= 1) return word;

  const letters = word.split('');
  let scrambled;
  let attempts = 0;
  const maxAttempts = 50;

  do {
    scrambled = shuffleArray([...letters]).join('');
    attempts++;
  } while (scrambled === word && attempts < maxAttempts);

  return scrambled;
}

function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateQuestions(pairs, count = null) {
  if (!pairs || pairs.length === 0) return [];

  const requestedCount = count || pairs.length;
  const availableCount = Math.min(requestedCount, pairs.length);
  
  const selectedPairs = shuffleArray([...pairs]).slice(0, availableCount);
  const allTerms = pairs.map(p => p.term);

  return selectedPairs.map(pair => generateQuestion(pair, allTerms));
}

function generateQuestion(pair, allTerms = []) {
  const { term, definition } = pair;

  const wrongOptions = selectWrongOptions(term, allTerms, 3);

  const options = shuffleArray([
    { text: term, correct: true },
    ...wrongOptions.map(t => ({ text: t, correct: false }))
  ]);

  return {
    id: `${term}-${definition}`.toLowerCase().replace(/\s+/g, '-').substring(0, 50),
    prompt: definition,
    correctAnswer: term,
    options: options.length >= 4 ? options : [],
    type: 'term-recall',
    explanation: `${term}: ${definition}`
  };
}

function selectWrongOptions(correctTerm, allTerms, count) {
  const available = allTerms.filter(t => t !== correctTerm);
  
  if (available.length === 0) return [];
  if (available.length <= count) return available;

  return shuffleArray(available).slice(0, count);
}
