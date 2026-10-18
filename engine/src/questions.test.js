/**
 * Tests for questions.js
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { generateQuestion, generateQuestions } from './questions.js';

describe('generateQuestion', () => {
  const samplePair = {
    term: 'Unit testing',
    definition: 'testing of individual functions in isolation'
  };

  const allTerms = [
    'Unit testing',
    'Integration testing',
    'Regression testing',
    'System testing'
  ];

  it('should generate a question with correct structure', () => {
    const question = generateQuestion(samplePair, allTerms);
    
    assert.ok(question.id);
    assert.strictEqual(question.prompt, samplePair.definition);
    assert.strictEqual(question.correctAnswer, samplePair.term);
    assert.strictEqual(question.type, 'term-recall');
    assert.ok(question.explanation.includes(samplePair.term));
  });

  it('should generate 4 options when enough terms available', () => {
    const question = generateQuestion(samplePair, allTerms);
    
    assert.strictEqual(question.options.length, 4);
    
    // One should be correct
    const correctOptions = question.options.filter(o => o.correct);
    assert.strictEqual(correctOptions.length, 1);
    assert.strictEqual(correctOptions[0].text, samplePair.term);
  });

  it('should not include the correct answer in wrong options', () => {
    const question = generateQuestion(samplePair, allTerms);
    const wrongOptions = question.options.filter(o => !o.correct);
    
    wrongOptions.forEach(option => {
      assert.notStrictEqual(option.text, samplePair.term);
    });
  });

  it('should handle fewer than 4 terms by returning empty options', () => {
    const question = generateQuestion(samplePair, ['Unit testing', 'Integration testing']);
    
    // With only 2 terms, we can't make 4 options, so options should be empty
    assert.strictEqual(question.options.length, 0);
  });
});

describe('generateQuestions', () => {
  const samplePairs = [
    { term: 'Unit testing', definition: 'testing individual functions in isolation' },
    { term: 'Integration testing', definition: 'testing combined components together' },
    { term: 'Regression testing', definition: 'retesting after code changes to catch bugs' },
    { term: 'System testing', definition: 'testing the complete integrated system' },
    { term: 'Acceptance testing', definition: 'testing to verify user requirements' }
  ];

  it('should generate requested number of questions', () => {
    const questions = generateQuestions(samplePairs, 3);
    assert.strictEqual(questions.length, 3);
  });

  it('should generate all questions when count not specified', () => {
    const questions = generateQuestions(samplePairs);
    assert.strictEqual(questions.length, samplePairs.length);
  });

  it('should not generate more questions than available pairs', () => {
    const questions = generateQuestions(samplePairs, 100);
    assert.strictEqual(questions.length, samplePairs.length);
  });

  it('should handle empty input', () => {
    const questions = generateQuestions([]);
    assert.strictEqual(questions.length, 0);
  });

  it('should generate unique questions', () => {
    const questions = generateQuestions(samplePairs, 3);
    const prompts = questions.map(q => q.prompt);
    const uniquePrompts = new Set(prompts);
    
    assert.strictEqual(prompts.length, uniquePrompts.size);
  });

  it('should include options for each question when 4+ terms available', () => {
    const questions = generateQuestions(samplePairs, 3);
    
    questions.forEach(question => {
      assert.strictEqual(question.options.length, 4);
    });
  });
});
