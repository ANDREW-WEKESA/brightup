/**
 * Tests for scramble.js
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { scrambleTerm, isValidScramble, checkScrambleAnswer } from './scramble.js';

describe('scrambleTerm', () => {
  it('should scramble a single word', () => {
    const term = 'Testing';
    const scrambled = scrambleTerm(term);
    
    assert.notStrictEqual(scrambled, term); // Should be different
    assert.strictEqual(scrambled.length, term.length); // Same length
  });

  it('should scramble each word separately', () => {
    const term = 'Unit Testing';
    const scrambled = scrambleTerm(term);
    const words = scrambled.split(' ');
    
    assert.strictEqual(words.length, 2); // Two words preserved
  });

  it('should never return the original term (for multi-letter words)', () => {
    // Run multiple times to ensure randomness doesn't break the rule
    for (let i = 0; i < 10; i++) {
      const term = 'Regression';
      const scrambled = scrambleTerm(term);
      assert.notStrictEqual(scrambled, term);
    }
  });

  it('should handle single-letter words', () => {
    const term = 'A';
    const scrambled = scrambleTerm(term);
    assert.strictEqual(scrambled, 'A'); // Can't scramble a single letter
  });

  it('should handle empty input', () => {
    assert.strictEqual(scrambleTerm(''), '');
    assert.strictEqual(scrambleTerm(null), '');
  });

  it('should use the same letters', () => {
    const term = 'Integration';
    const scrambled = scrambleTerm(term);
    
    const termLetters = term.toLowerCase().split('').sort().join('');
    const scrambledLetters = scrambled.toLowerCase().split('').sort().join('');
    
    assert.strictEqual(scrambledLetters, termLetters);
  });
});

describe('isValidScramble', () => {
  it('should validate correct scramble', () => {
    assert.strictEqual(isValidScramble('Testing', 'Tsentig'), true);
  });

  it('should validate multi-word scrambles', () => {
    assert.strictEqual(isValidScramble('Unit Testing', 'Tinu Tsentig'), true);
  });

  it('should reject scrambles with different letters', () => {
    assert.strictEqual(isValidScramble('Testing', 'Working'), false);
  });

  it('should reject unchanged multi-letter words', () => {
    assert.strictEqual(isValidScramble('Testing', 'Testing'), false);
  });

  it('should accept single-letter words unchanged', () => {
    assert.strictEqual(isValidScramble('A', 'A'), true);
  });

  it('should handle case-insensitive comparison', () => {
    assert.strictEqual(isValidScramble('Testing', 'tsentig'), true);
  });
});

describe('checkScrambleAnswer', () => {
  it('should match exact rebuild', () => {
    assert.strictEqual(checkScrambleAnswer('Testing', 'Testing'), true);
  });

  it('should match case-insensitive', () => {
    assert.strictEqual(checkScrambleAnswer('testing', 'Testing'), true);
  });

  it('should match punctuation-insensitive', () => {
    assert.strictEqual(checkScrambleAnswer('Model-View-Controller', 'model view controller'), true);
  });

  it('should reject wrong answers', () => {
    assert.strictEqual(checkScrambleAnswer('Wrong', 'Testing'), false);
  });

  it('should handle empty input', () => {
    assert.strictEqual(checkScrambleAnswer('', 'Testing'), false);
    assert.strictEqual(checkScrambleAnswer('Testing', ''), false);
  });
});
