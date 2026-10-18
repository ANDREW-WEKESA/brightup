/**
 * Convert definitions into concise clues for word discovery mode
 */

export function generateClue(term, definition) {
  // If definition is already a question, use it
  if (definition.endsWith('?')) {
    return definition;
  }

  // Convert definition to a short clue
  const def = definition.toLowerCase();
  
  // Pattern: "X is Y" or "X are Y" → "What is Y?"
  const isPattern = def.match(/^(.+?)\s+(?:is|are)\s+(.+)$/);
  if (isPattern) {
    const description = isPattern[2];
    return `What ${description}?`;
  }

  // Pattern: "X that does Y" → "What does Y?"
  const thatPattern = def.match(/^.+?\s+that\s+(.+)$/);
  if (thatPattern) {
    const action = thatPattern[1];
    return `What ${action}?`;
  }

  // Pattern: "X for Y" → "What is used for Y?"
  const forPattern = def.match(/^.+?\s+for\s+(.+)$/);
  if (forPattern) {
    const purpose = forPattern[1];
    return `What is used for ${purpose}?`;
  }

  // Pattern: "X where Y" → "What/Where Y?"
  const wherePattern = def.match(/^.+?\s+where\s+(.+)$/);
  if (wherePattern) {
    const condition = wherePattern[1];
    return `Where ${condition}?`;
  }

  // Pattern: starts with action verb → "What [verb]s...?"
  const verbPattern = def.match(/^(process|method|technique|approach|system|tool|framework|pattern|component|interface|layer|principle|mechanism|practice|strategy) (?:of|that|for) (.+)$/);
  if (verbPattern) {
    const type = verbPattern[1];
    const description = verbPattern[2];
    return `What ${type} ${description}?`;
  }

  // Fallback: Take first 50 chars and add "..."
  const truncated = definition.substring(0, 80).split(' ').slice(0, -1).join(' ');
  return truncated + (truncated.length < definition.length ? '...' : '');
}

/**
 * Generate a short hint showing first/last letters and length
 */
export function generateLetterHint(term) {
  const cleaned = term.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
  const parts = cleaned.split(' ');
  
  if (parts.length === 1) {
    const word = parts[0];
    if (word.length <= 3) {
      return `${word.length} letters`;
    }
    return `${word.length} letters: ${word[0]}...${word[word.length - 1]}`;
  }
  
  // Multi-word term
  return `${parts.length} words: ${parts.map(w => w[0]).join(' ')}...`;
}

/**
 * Format clue for display
 */
export function formatClue(term, definition, showHint = false) {
  const clue = generateClue(term, definition);
  const hint = showHint ? ` (${generateLetterHint(term)})` : '';
  return clue + hint;
}
