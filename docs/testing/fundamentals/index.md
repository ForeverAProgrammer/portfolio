---
sidebar_position: 0
---

# Testing Fundamentals

Learn the universal principles of software testing that apply across all languages and frameworks. These fundamentals form the foundation for writing reliable, maintainable tests.

## What You'll Learn

- **[Testing Basics](./testing-basics)** - Why test, types of tests, and testing pyramid
- **[Testing Types](./testing-types)** - Unit, integration, E2E testing
- **[Test-Driven Development (TDD)](./tdd)** - Write tests first
- **[Behavior-Driven Development (BDD)](./bdd)** - Describe behavior in plain language

## Why Testing Matters

### For Developers
- **Confidence** - Know your code works as expected
- **Refactoring Safety** - Change code without breaking functionality
- **Documentation** - Tests document how code should behave
- **Bug Prevention** - Catch issues before production

### For Teams
- **Collaboration** - Tests clarify requirements
- **Code Review** - Tests show intent and edge cases
- **Onboarding** - New developers learn from tests
- **Quality** - Maintain standards across the codebase

### For Business
- **Cost Savings** - Bugs caught early cost less to fix
- **Faster Delivery** - Confidence enables rapid deployment
- **Customer Satisfaction** - Fewer bugs in production
- **Compliance** - Meet quality standards and regulations

## The Testing Pyramid

```
        /\
       /E2E\        Few tests (slow, brittle, expensive)
      /______\
     /        \
    /Integration\ Some tests (moderate speed and cost)
   /__________  \
  /              \
 /  Unit Tests    \ Many tests (fast, cheap, reliable)
/__________________\
```

### Unit Tests (70%)
Test individual functions or methods in isolation.

**Characteristics:**
- Very fast (milliseconds)
- No external dependencies
- Test one thing at a time
- Easy to maintain

**Example:**
```javascript
function add(a, b) {
  return a + b;
}

test('add should sum two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

### Integration Tests (20%)
Test how multiple components work together.

**Characteristics:**
- Moderate speed (seconds)
- May use real dependencies (databases, APIs)
- Test component interactions
- More complex setup

**Example:**
```javascript
test('user service should save to database', async () => {
  const user = await userService.create({ name: 'Alice' });
  const saved = await database.findById(user.id);
  expect(saved.name).toBe('Alice');
});
```

### End-to-End Tests (10%)
Test the entire application from user perspective.

**Characteristics:**
- Slow (minutes)
- Tests real user workflows
- Use real browsers
- Brittle and expensive

**Example:**
```javascript
test('user can login and view dashboard', async () => {
  await page.goto('http://localhost:3000');
  await page.fill('#email', 'user@example.com');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Test Types Explained

### Unit Tests
Focus on individual units of code (functions, methods, classes).

**When to use:**
- Testing business logic
- Testing pure functions
- Testing utility functions
- Testing algorithms

### Integration Tests
Test how components work together.

**When to use:**
- Testing API endpoints
- Testing database operations
- Testing service interactions
- Testing third-party integrations

### End-to-End Tests
Test complete user workflows.

**When to use:**
- Critical user paths (login, checkout)
- Cross-browser compatibility
- Visual regression testing
- Smoke tests for deployments

### Other Test Types

**Acceptance Tests:**
- Verify software meets requirements
- Often written in BDD style
- Stakeholder-readable

**Performance Tests:**
- Load testing
- Stress testing
- Benchmark testing

**Security Tests:**
- Penetration testing
- Vulnerability scanning
- Authentication testing

## Best Practices

### 1. Follow AAA Pattern

**Arrange, Act, Assert** - Structure every test clearly.

```javascript
test('user can be created', () => {
  // Arrange - Set up test data
  const userData = { name: 'Alice', email: 'alice@example.com' };

  // Act - Perform the action
  const user = createUser(userData);

  // Assert - Verify the result
  expect(user.name).toBe('Alice');
  expect(user.email).toBe('alice@example.com');
});
```

### 2. Test Behavior, Not Implementation

```javascript
// ❌ Bad - Testing implementation details
test('add function uses + operator', () => {
  const source = add.toString();
  expect(source).toContain('+');
});

// ✅ Good - Testing behavior
test('add returns sum of two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

### 3. One Assert Per Test (When Possible)

```javascript
// ❌ Bad - Testing multiple things
test('user creation', () => {
  const user = createUser({ name: 'Alice' });
  expect(user.name).toBe('Alice');
  expect(user.id).toBeDefined();
  expect(user.createdAt).toBeInstanceOf(Date);
  expect(user.isActive).toBe(true);
});

// ✅ Good - Separate tests for separate concerns
test('user should have provided name', () => {
  const user = createUser({ name: 'Alice' });
  expect(user.name).toBe('Alice');
});

test('user should have generated id', () => {
  const user = createUser({ name: 'Alice' });
  expect(user.id).toBeDefined();
});
```

### 4. Use Descriptive Test Names

```javascript
// ❌ Bad
test('test1', () => { ... });
test('it works', () => { ... });

// ✅ Good
test('should return sum of two positive numbers', () => { ... });
test('should throw error when dividing by zero', () => { ... });
test('should create user with valid email', () => { ... });
```

### 5. Test Edge Cases

```javascript
test('add should handle positive numbers', () => {
  expect(add(2, 3)).toBe(5);
});

test('add should handle negative numbers', () => {
  expect(add(-2, -3)).toBe(-5);
});

test('add should handle zero', () => {
  expect(add(0, 5)).toBe(5);
});

test('add should handle decimals', () => {
  expect(add(0.1, 0.2)).toBeCloseTo(0.3);
});
```

## Common Testing Mistakes

### 1. Not Testing Edge Cases
Only testing happy paths leaves bugs undiscovered.

### 2. Testing Too Much Implementation
Tests break when refactoring, even though behavior hasn't changed.

### 3. Slow Tests
Tests that take minutes to run won't be run frequently.

### 4. Flaky Tests
Tests that randomly fail reduce confidence and waste time.

### 5. No Test Isolation
Tests that depend on each other create cascading failures.

### 6. Poor Test Names
Vague names make it hard to understand what broke.

## Language-Specific Testing

After mastering these fundamentals, explore language-specific testing:

- **[Java Testing](../../languages/java/testing/)** - JUnit 5, Mockito
- **[JavaScript Testing](../../languages/javascript/testing/)** - Jest, Mocha
- **[TypeScript Testing](../../languages/typescript/testing/)** - Jest with TypeScript
- **[React Testing](../../frameworks/react/react-testing)** - React Testing Library
- **[Angular Testing](../../frameworks/angular/angular-testing)** - Jasmine, Karma

## Testing Practices

### [Test-Driven Development (TDD)](./tdd)
Write tests before code.

**Benefits:**
- Better design
- Higher test coverage
- Fewer bugs

### [Test Doubles](./test-doubles)
Mocks, stubs, spies, and fakes for isolating tests.

**Learn:**
- When to use each type
- Mocking frameworks
- Best practices

## Resources

- [Testing JavaScript](https://testingjavascript.com/) - Kent C. Dodds
- [Test Driven Development](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530) - Kent Beck
- [Growing Object-Oriented Software, Guided by Tests](https://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627)
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) - Martin Fowler

## Next Steps

1. Read [Testing Basics](./testing-basics) for detailed fundamentals
2. Explore [Testing Types](./testing-types) to understand unit, integration, and E2E tests
3. Learn [Test-Driven Development (TDD)](./tdd) methodology
4. Discover [Behavior-Driven Development (BDD)](./bdd) for stakeholder collaboration
5. Master [Test Doubles](./test-doubles) (mocks, stubs, spies)
6. Choose your language/framework and apply these concepts

---

**Good tests are an investment in your codebase. Start testing today!**
