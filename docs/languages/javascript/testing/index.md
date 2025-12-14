---
sidebar_position: 2
---

# Testing

Write reliable, maintainable tests for your JavaScript applications using modern testing frameworks and best practices.

## What's Covered

This section covers testing frameworks, methodologies, and best practices for ensuring your JavaScript code is reliable and maintainable across browsers and Node.js environments.

## Why Testing Matters in JavaScript

### Dynamic Typing Challenges
- Catch type-related bugs at test time
- Validate function parameters and return values
- Ensure correct data transformations

### Cross-Environment Support
- Test across different browsers
- Validate Node.js and browser compatibility
- Ensure consistent behavior

### Refactoring Confidence
- Safely refactor dynamic code
- Catch breaking changes early
- Document expected behavior

## Popular JavaScript Testing Frameworks

### Jest
Modern, batteries-included testing framework from Facebook.

**Key Features:**
- Zero configuration for most projects
- Built-in test runner, assertions, and mocking
- Snapshot testing
- Code coverage out of the box
- Fast parallel test execution
- Great React integration

**Use Cases:**
- React applications
- Node.js applications
- General JavaScript projects

### Mocha + Chai
Flexible testing framework with assertion library.

**Key Features:**
- Highly configurable
- Multiple assertion styles
- Works in browser and Node.js
- Rich plugin ecosystem
- Async testing support

**Use Cases:**
- Custom test configurations
- Browser testing
- Backend Node.js applications

### Vitest
Next-generation testing framework powered by Vite.

**Key Features:**
- Extremely fast (Vite-powered)
- Jest-compatible API
- Native ESM support
- Component testing
- TypeScript support

**Use Cases:**
- Vite projects
- Modern JavaScript/TypeScript
- Component testing

### Testing Library
Family of testing utilities for DOM testing.

**Key Features:**
- User-centric testing approach
- Framework-agnostic (React, Vue, Angular, etc.)
- Encourages accessibility
- Simple, intuitive API

**Use Cases:**
- Frontend component testing
- User interaction testing
- Accessibility testing

## Testing Types

### Unit Testing
Test individual functions and modules in isolation.

```javascript
// Example with Jest
function add(a, b) {
  return a + b;
}

test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

### Integration Testing
Test how multiple modules work together.

```javascript
// Example with Jest
import { fetchUser, saveUser } from './userService';

test('user service integration', async () => {
  const user = await fetchUser(1);
  user.name = 'Updated Name';
  await saveUser(user);

  const updated = await fetchUser(1);
  expect(updated.name).toBe('Updated Name');
});
```

### End-to-End Testing
Test complete user workflows in a real browser.

**Popular Tools:**
- Playwright - Modern, fast, reliable
- Cypress - Developer-friendly, great DX
- Puppeteer - Chrome automation

## Best Practices

### Test Structure
Follow the AAA pattern:
- **Arrange** - Set up test data
- **Act** - Execute the code being tested
- **Assert** - Verify the results

```javascript
test('user registration', () => {
  // Arrange
  const userData = { email: 'test@example.com', password: 'secure123' };

  // Act
  const result = registerUser(userData);

  // Assert
  expect(result.success).toBe(true);
  expect(result.user.email).toBe(userData.email);
});
```

### Naming Conventions
Write descriptive test names:

```javascript
// Good
test('should throw error when email is invalid', () => {});

// Better
test('registerUser throws ValidationError when email is missing @ symbol', () => {});
```

### Test Independence
Each test should be independent:

```javascript
// Bad - tests depend on each other
let user;
test('creates user', () => {
  user = createUser();
});
test('updates user', () => {
  updateUser(user); // Depends on previous test
});

// Good - each test is independent
test('creates user', () => {
  const user = createUser();
  expect(user).toBeDefined();
});

test('updates user', () => {
  const user = createUser(); // Create fresh data
  updateUser(user);
  expect(user.updated).toBe(true);
});
```

### Mocking
Mock external dependencies:

```javascript
// Mock API calls
jest.mock('./api');

test('fetches user data', async () => {
  api.getUser.mockResolvedValue({ id: 1, name: 'Test' });

  const user = await fetchUserData(1);

  expect(user.name).toBe('Test');
  expect(api.getUser).toHaveBeenCalledWith(1);
});
```

### Async Testing
Handle promises and async/await:

```javascript
// Using async/await
test('async data fetch', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

// Using promises
test('promise-based fetch', () => {
  return fetchData().then(data => {
    expect(data).toBeDefined();
  });
});
```

## Testing Philosophy

Effective JavaScript tests are:
- **Fast** - Run in milliseconds, not seconds
- **Isolated** - No dependencies on other tests
- **Repeatable** - Same results every time
- **Self-validating** - Clear pass/fail
- **Thorough** - Cover edge cases and errors

## Code Coverage

Track which code is tested:

```bash
# Jest coverage
npm test -- --coverage

# Coverage thresholds in package.json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Getting Started

### Basic Jest Setup

```bash
# Install Jest
npm install --save-dev jest

# Add test script to package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Your First Test

```javascript
// sum.js
export function sum(a, b) {
  return a + b;
}

// sum.test.js
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

```bash
# Run tests
npm test
```

## Next Steps

After mastering testing basics, explore:
- **Test-Driven Development (TDD)** - Write tests first
- **Mocking Libraries** - Jest mocks, Sinon.js
- **E2E Testing** - Playwright, Cypress
- **Visual Regression Testing** - Percy, Chromatic
- **Performance Testing** - Lighthouse, WebPageTest
- **Continuous Integration** - Run tests in CI/CD pipelines

## Related Topics

- [JavaScript Fundamentals](../fundamentals/) - Core JavaScript concepts
- [TypeScript Testing](../../typescript/testing/) - Type-safe testing
