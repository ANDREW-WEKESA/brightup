/**
 * Spaced Repetition Algorithm
 * Based on the SM-2 algorithm (SuperMemo 2)
 * Helps optimize learning by scheduling reviews at optimal intervals
 */

/**
 * Calculate the next review interval based on performance
 * @param {number} previousInterval - Days since last review
 * @param {number} easeFactor - Current ease factor (difficulty)
 * @param {number} quality - Performance rating (0-5)
 * @returns {Object} Next interval and updated ease factor
 */
export function calculateNextReview(previousInterval, easeFactor, quality) {
  // Quality scale:
  // 5 - perfect response
  // 4 - correct after hesitation
  // 3 - correct with serious difficulty
  // 2 - incorrect, but easy to recall
  // 1 - incorrect, remembered
  // 0 - complete blackout

  let newEaseFactor = easeFactor;
  let newInterval = previousInterval;

  // Update ease factor
  newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  // Minimum ease factor is 1.3
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  // Calculate new interval
  if (quality < 3) {
    // Failed recall - reset to 1 day
    newInterval = 1;
  } else {
    if (previousInterval === 0) {
      newInterval = 1;
    } else if (previousInterval === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(previousInterval * newEaseFactor);
    }
  }

  return {
    interval: newInterval,
    easeFactor: newEaseFactor
  };
}

/**
 * Determine if a card is due for review
 * @param {Date} lastReviewDate - When the card was last reviewed
 * @param {number} interval - Days until next review
 * @returns {boolean} True if card is due
 */
export function isDue(lastReviewDate, interval) {
  if (!lastReviewDate) return true;
  
  const now = new Date();
  const reviewDate = new Date(lastReviewDate);
  const daysSince = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));
  
  return daysSince >= interval;
}

/**
 * Get quality rating from user performance
 * @param {boolean} correct - Whether answer was correct
 * @param {number} timeSpent - Seconds spent on question
 * @param {number} hintsUsed - Number of hints used
 * @returns {number} Quality rating (0-5)
 */
export function getQualityRating(correct, timeSpent, hintsUsed = 0) {
  if (!correct) {
    return hintsUsed > 0 ? 1 : 0;
  }

  // Perfect response (correct, fast, no hints)
  if (timeSpent < 5 && hintsUsed === 0) {
    return 5;
  }

  // Correct with hesitation (5-15 seconds)
  if (timeSpent < 15 && hintsUsed === 0) {
    return 4;
  }

  // Correct with difficulty (slow or used hints)
  if (hintsUsed > 0 || timeSpent >= 15) {
    return 3;
  }

  return 3; // Default for correct answers
}

/**
 * Get cards due for review from progress data
 * @param {Object} progress - User progress data
 * @returns {Array} Cards due for review
 */
export function getDueCards(progress) {
  const dueCards = [];
  
  Object.entries(progress).forEach(([unitId, questions]) => {
    questions.forEach(question => {
      if (!question.spacedRep) {
        // New card - add to due list
        dueCards.push({
          unitId,
          question,
          isNew: true
        });
      } else {
        const { lastReview, interval } = question.spacedRep;
        if (isDue(lastReview, interval)) {
          dueCards.push({
            unitId,
            question,
            isNew: false
          });
        }
      }
    });
  });

  return dueCards;
}

/**
 * Update card with spaced repetition data
 * @param {Object} card - Question card
 * @param {boolean} correct - Whether answer was correct
 * @param {number} timeSpent - Seconds spent
 * @param {number} hintsUsed - Hints used
 * @returns {Object} Updated card with spaced repetition data
 */
export function updateCard(card, correct, timeSpent, hintsUsed = 0) {
  const quality = getQualityRating(correct, timeSpent, hintsUsed);
  
  const currentInterval = card.spacedRep?.interval || 0;
  const currentEaseFactor = card.spacedRep?.easeFactor || 2.5;
  
  const { interval, easeFactor } = calculateNextReview(
    currentInterval,
    currentEaseFactor,
    quality
  );

  return {
    ...card,
    spacedRep: {
      interval,
      easeFactor,
      lastReview: new Date().toISOString(),
      reviewCount: (card.spacedRep?.reviewCount || 0) + 1,
      quality
    }
  };
}

/**
 * Get optimal study session size
 * @param {Array} dueCards - Cards due for review
 * @param {number} maxCards - Maximum cards per session
 * @returns {Array} Optimized session cards
 */
export function getStudySession(dueCards, maxCards = 20) {
  // Prioritize failed cards, then new cards, then due reviews
  const failed = dueCards.filter(c => c.question.spacedRep?.quality <= 2);
  const newCards = dueCards.filter(c => c.isNew).slice(0, 5); // Limit new cards
  const reviews = dueCards.filter(c => !c.isNew && c.question.spacedRep?.quality > 2);

  const session = [...failed, ...newCards, ...reviews].slice(0, maxCards);
  
  // Shuffle to avoid pattern recognition
  return shuffleArray(session);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get statistics about spaced repetition progress
 * @param {Object} progress - User progress data
 * @returns {Object} Statistics
 */
export function getSpacedRepStats(progress) {
  let totalCards = 0;
  let dueCards = 0;
  let masteredCards = 0;
  let learningCards = 0;
  let newCards = 0;

  Object.values(progress).forEach(questions => {
    questions.forEach(question => {
      totalCards++;
      
      if (!question.spacedRep) {
        newCards++;
      } else {
        const { interval, lastReview, easeFactor } = question.spacedRep;
        
        if (isDue(lastReview, interval)) {
          dueCards++;
        }
        
        if (easeFactor >= 2.5 && interval >= 21) {
          masteredCards++;
        } else {
          learningCards++;
        }
      }
    });
  });

  return {
    total: totalCards,
    due: dueCards,
    mastered: masteredCards,
    learning: learningCards,
    new: newCards
  };
}
