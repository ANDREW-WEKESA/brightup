/**
 * Tests for parser.js
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { parseNotes, normalizeText, answersMatch } from './parser.js';

describe('parseNotes', () => {
  it('should parse colon-separated terms', () => {
    const notes = 'Unit testing: testing of individual functions in isolation';
    const result = parseNotes(notes);
    
    assert.strictEqual(result.terms.length, 1);
    assert.strictEqual(result.terms[0].term, 'Unit testing');
    assert.strictEqual(result.terms[0].definition, 'testing of individual functions in isolation');
    assert.strictEqual(result.skipped, 0);
  });

  it('should parse dash-separated terms', () => {
    const notes = 'Hashing - a one way process that converts data into a fixed length value';
    const result = parseNotes(notes);
    
    assert.strictEqual(result.terms.length, 1);
    assert.strictEqual(result.terms[0].term, 'Hashing');
  });

  it('should parse "is" separator', () => {
    const notes = 'A deadlock is a state where processes wait on each other forever';
    const result = parseNotes(notes);
    
    assert.strictEqual(result.terms.length, 1);
    assert.strictEqual(result.terms[0].term, 'A deadlock');
  });

  it('should handle bullets and numbers', () => {
    const notes = `- Regression testing: retesting after code changes
* Integration testing - testing combined components
2) Alpha testing is testing by internal users`;
    
    const result = parseNotes(notes);
    assert.strictEqual(result.terms.length, 3);
    assert.strictEqual(result.skipped, 0);
  });

  it('should skip lines without recognizable format', () => {
    const notes = `Unit testing: testing individual functions in isolation
Just a paragraph without any recognizable format here
Regression testing: retesting after code changes now`;
    
    const result = parseNotes(notes);
    assert.strictEqual(result.terms.length, 2);
    assert.strictEqual(result.skipped, 1);
  });

  it('should reject terms that are too long (>5 words)', () => {
    const notes = 'This term has too many words in it: definition text goes here for validation';
    const result = parseNotes(notes);
    
    assert.strictEqual(result.terms.length, 0);
    assert.strictEqual(result.skipped, 1);
  });

  it('should reject definitions that are too short (<12 chars)', () => {
    const notes = 'Term: short';
    const result = parseNotes(notes);
    
    assert.strictEqual(result.terms.length, 0);
    assert.strictEqual(result.skipped, 1);
  });

  it('should handle empty input', () => {
    const result = parseNotes('');
    assert.strictEqual(result.terms.length, 0);
    assert.strictEqual(result.skipped, 0);
  });

  it('should handle multiple valid terms', () => {
    const notes = `Unit testing: testing individual functions in isolation
Integration testing: testing combined components together
Regression testing: retesting after code changes to catch bugs`;
    
    const result = parseNotes(notes);
    assert.strictEqual(result.terms.length, 3);
    assert.strictEqual(result.skipped, 0);
  });
});

describe('normalizeText', () => {
  it('should convert to lowercase', () => {
    assert.strictEqual(normalizeText('Unit Testing'), 'unit testing');
  });

  it('should remove punctuation', () => {
    assert.strictEqual(normalizeText('Model-View-Controller'), 'model view controller');
  });

  it('should collapse multiple spaces', () => {
    assert.strictEqual(normalizeText('multiple    spaces'), 'multiple spaces');
  });

  it('should trim whitespace', () => {
    assert.strictEqual(normalizeText('  trimmed  '), 'trimmed');
  });
});

describe('answersMatch', () => {
  it('should match case-insensitive', () => {
    assert.strictEqual(answersMatch('Unit Testing', 'unit testing'), true);
  });

  it('should match punctuation-insensitive', () => {
    assert.strictEqual(answersMatch('Model-View-Controller', 'model view controller'), true);
  });

  it('should match with different spacing', () => {
    assert.strictEqual(answersMatch('black box  testing', 'black-box testing'), true);
  });

  it('should not match different content', () => {
    assert.strictEqual(answersMatch('unit testing', 'integration testing'), false);
  });
});
