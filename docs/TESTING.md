# BrightUp Testing Guide

## Overview
This document covers testing strategies, frameworks, and best practices for BrightUp.

## Table of Contents
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)

---

## Testing Stack

### Backend
- **Jest**: JavaScript testing framework
- **Supertest**: HTTP assertion library
- **mongodb-memory-server**: In-memory MongoDB for testing

### Frontend
- **Vitest**: Fast unit test framework for Vite
- **React Testing Library**: Component testing
- **Playwright** or **Cypress**: E2E testing

---

## Running Tests

### All Tests
```bash
# Run all tests (server + client)
./scripts/test-all.sh

# Or manually
npm run test:all
```

### Server Tests
```bash
cd server
npm test                    # Run once
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage report
```

### Client Tests
```bash
cd client
npm test                    # Run once
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage report
```

### E2E Tests
```bash
npm run test:e2e           # Headless mode
npm run test:e2e:ui        # With browser UI
```

---

## Unit Testing

### Backend Unit Tests

**Example: Testing User Model**
```javascript
// server/tests/models/User.test.js
const User = require('../../models/User');
const { connectDB, closeDB } = require('../setup');

describe('User Model', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('should hash password before saving', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });

    await user.save();
    expect(user.password).not.toBe('password123');
    expect(user.password.length).toBeGreaterThan(20);
  });

  test('should match password correctly', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });

    await user.save();
    const isMatch = await user.matchPassword('password123');
    expect(isMatch).toBe(true);
  });

  test('should validate email format', async () => {
    const user = new User({
      email: 'invalid-email',
      password: 'password123',
      name: 'Test User'
    });

    await expect(user.save()).rejects.toThrow();
  });
});
```

**Example: Testing Utility Functions**
```javascript
// server/tests/utils/clues.test.js
const { generateClue, formatClue } = require('../../utils/clues');

describe('Clue Generation', () => {
  test('generateClue should create question from definition', () => {
    const term = 'algorithm';
    const definition = 'A step-by-step procedure for solving a problem';
    
    const clue = generateClue(term, definition);
    
    expect(clue).toContain('What is');
    expect(clue).toContain(definition.toLowerCase());
  });

  test('formatClue should add hints when requested', () => {
    const term = 'python';
    const definition = 'A high-level programming language';
    
    const clueWithHint = formatClue(term, definition, true);
    
    expect(clueWithHint).toContain('p_____');
  });

  test('formatClue without hint should not reveal letters', () => {
    const term = 'java';
    const definition = 'An object-oriented programming language';
    
    const clue = formatClue(term, definition, false);
    
    expect(clue).not.toMatch(/j|a|v/i);
  });
});
```

### Frontend Unit Tests

**Example: Testing React Component**
```javascript
// client/tests/components/UnitCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UnitCard from '../../src/components/UnitCard';

describe('UnitCard Component', () => {
  const mockUnit = {
    id: 1,
    name: 'Python Fundamentals',
    description: 'Learn Python basics',
    termCount: 50,
    category: 'Year 1'
  };

  const renderCard = (props = {}) => {
    return render(
      <BrowserRouter>
        <UnitCard unit={mockUnit} {...props} />
      </BrowserRouter>
    );
  };

  test('renders unit information correctly', () => {
    renderCard();
    
    expect(screen.getByText('Python Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Learn Python basics')).toBeInTheDocument();
    expect(screen.getByText(/50 terms/i)).toBeInTheDocument();
  });

  test('calls onClick when card is clicked', () => {
    const mockClick = vi.fn();
    renderCard({ onClick: mockClick });
    
    const card = screen.getByTestId('unit-card');
    fireEvent.click(card);
    
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockClick).toHaveBeenCalledWith(mockUnit);
  });

  test('shows premium badge for premium units', () => {
    const premiumUnit = { ...mockUnit, isPremium: true };
    renderCard({ unit: premiumUnit });
    
    expect(screen.getByText(/premium/i)).toBeInTheDocument();
  });
});
```

---

## Integration Testing

**Example: Testing API Endpoints**
```javascript
// server/tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const { connectDB, closeDB } = require('../setup');

describe('Auth API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    test('should register new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'Password123!',
          name: 'New User'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('newuser@example.com');
    });

    test('should reject duplicate email', async () => {
      await User.create({
        email: 'existing@example.com',
        password: 'Password123!',
        name: 'Existing User'
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'existing@example.com',
          password: 'Password123!',
          name: 'Duplicate User'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('should reject weak passwords', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: '123',
          name: 'Test User'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/password/i);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        email: 'user@example.com',
        password: 'Password123!',
        name: 'Test User'
      });
    });

    test('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@example.com',
          password: 'Password123!'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    test('should reject incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@example.com',
          password: 'WrongPassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
```

---

## End-to-End Testing

**Example: E2E Test with Playwright**
```javascript
// tests/e2e/gameplay.spec.js
import { test, expect } from '@playwright/test';

test.describe('Game Play Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('complete Q&A mode question', async ({ page }) => {
    // Login
    await page.click('text=Login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button:has-text("Login")');

    // Select unit
    await page.click('text=Python Fundamentals');
    
    // Choose Q&A mode
    await page.click('text=Q&A Mode');
    
    // Answer question
    await page.click('.option-button >> nth=0');
    
    // Verify feedback
    await expect(page.locator('.feedback')).toBeVisible();
    
    // Next question
    await page.click('text=Next Question');
    
    // Verify new question loaded
    await expect(page.locator('.question')).toBeVisible();
  });

  test('complete level mode word', async ({ page }) => {
    await page.click('text=Login');
    // ... login steps ...
    
    // Choose Level mode
    await page.click('text=Level Mode');
    
    // Type answer
    await page.fill('input[name="answer"]', 'algorithm');
    await page.click('button:has-text("Submit")');
    
    // Verify correct
    await expect(page.locator('.correct-feedback')).toBeVisible();
  });

  test('view progress stats', async ({ page }) => {
    // ... login ...
    
    // Navigate to profile
    await page.click('[aria-label="Profile"]');
    
    // Verify stats displayed
    await expect(page.locator('text=/Total Questions/i')).toBeVisible();
    await expect(page.locator('text=/Accuracy/i')).toBeVisible();
    await expect(page.locator('text=/Streak/i')).toBeVisible();
  });
});
```

---

## Test Coverage

### View Coverage Reports
```bash
# Backend coverage
cd server
npm run test:coverage
open coverage/lcov-report/index.html

# Frontend coverage
cd client
npm run test:coverage
open coverage/index.html
```

### Coverage Goals
- **Overall**: Minimum 80% coverage
- **Critical paths** (auth, game logic): 95%+ coverage
- **UI components**: 70%+ coverage
- **Utilities**: 90%+ coverage

---

## Best Practices

### 1. Test Structure (AAA Pattern)
```javascript
test('description', () => {
  // Arrange: Set up test data
  const user = { name: 'Test', email: 'test@example.com' };
  
  // Act: Execute the function
  const result = validateUser(user);
  
  // Assert: Verify the result
  expect(result.valid).toBe(true);
});
```

### 2. Test Isolation
- Each test should be independent
- Clean up after tests (database, mocks)
- Don't rely on test execution order

### 3. Descriptive Test Names
```javascript
// Bad
test('user test', () => { ... });

// Good
test('should reject registration with duplicate email', () => { ... });
```

### 4. Mock External Dependencies
```javascript
// Mock API calls
vi.mock('../api', () => ({
  fetchUnits: vi.fn(() => Promise.resolve(mockUnits))
}));

// Mock environment variables
process.env.JWT_SECRET = 'test-secret';
```

### 5. Test Edge Cases
- Empty inputs
- Null/undefined values
- Very large numbers
- Special characters
- Concurrent requests

### 6. Avoid Test Duplication
Use `describe` blocks and `beforeEach` for shared setup:
```javascript
describe('User authentication', () => {
  let user;

  beforeEach(() => {
    user = createTestUser();
  });

  test('password hashing', () => { ... });
  test('password matching', () => { ... });
});
```

---

## Continuous Integration

Tests run automatically on:
- Every push to `develop` or `main`
- Every pull request
- Nightly builds

See `.github/workflows/ci.yml` for CI configuration.

---

## Troubleshooting Tests

### Common Issues

**1. Tests timing out**
```javascript
// Increase timeout
test('slow test', async () => {
  // ...
}, 10000); // 10 second timeout
```

**2. Flaky tests**
- Add proper waits for async operations
- Mock time-dependent code
- Reset state between tests

**3. Database connection errors**
```javascript
// Ensure proper setup/teardown
beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});
```

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Vitest Documentation](https://vitest.dev/)

---

**Last Updated:** January 19, 2026
