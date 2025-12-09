---
sidebar_position: 2
---

# Testing Types

Understand the different types of software testing and when to use each approach for maximum effectiveness. Each testing type serves a specific purpose in your testing strategy.

## Unit Testing

### What is Unit Testing?

**Unit testing** validates individual units of code (functions, methods, classes) in complete isolation from external dependencies.

### Characteristics

- **Fast** - Runs in milliseconds
- **Isolated** - No external dependencies
- **Focused** - Tests one thing at a time
- **Simple** - Easy to write and maintain
- **Reliable** - Deterministic results

### When to Use

**Test:**
- Business logic and algorithms
- Data transformations
- Validation functions
- Utility functions
- Edge cases and error handling

**Example:**
```javascript
function calculateDiscount(price, discountPercent) {
  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid input');
  }
  return price * (1 - discountPercent / 100);
}

// Unit test
test('calculateDiscount should apply percentage discount', () => {
  expect(calculateDiscount(100, 10)).toBe(90);
});

test('calculateDiscount should throw error for negative price', () => {
  expect(() => calculateDiscount(-100, 10)).toThrow('Invalid input');
});
```

### Best Practices

✅ Test behavior, not implementation
✅ One assertion per test (when possible)
✅ Use descriptive test names
✅ Test edge cases and error conditions
✅ Keep tests fast (< 1ms each)

---

## Integration Testing

### What is Integration Testing?

**Integration testing** validates how multiple components work together, including interactions with external systems like databases, APIs, and file systems.

### Characteristics

- **Moderate speed** - Runs in seconds
- **Real dependencies** - Uses actual databases, APIs
- **Component interaction** - Tests multiple units together
- **More complex** - Requires setup and teardown
- **More realistic** - Closer to production behavior

### When to Use

**Test:**
- API endpoints
- Database operations (CRUD)
- Service-to-service communication
- Third-party integrations
- Authentication and authorization
- Message queues and event handlers

**Example:**
```javascript
// Integration test with real database
describe('UserService', () => {
  let database;

  beforeAll(async () => {
    database = await setupTestDatabase();
  });

  afterAll(async () => {
    await database.close();
  });

  test('should create user and save to database', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const user = await userService.create(userData);

    // Verify it was saved
    const savedUser = await database.users.findById(user.id);
    expect(savedUser.email).toBe('test@example.com');
    expect(savedUser.name).toBe('Test User');
  });
});
```

### Best Practices

✅ Use test databases (not production!)
✅ Clean up data after each test
✅ Test realistic scenarios
✅ Mock external services when needed
✅ Keep tests independent

---

## End-to-End (E2E) Testing

### What is E2E Testing?

**End-to-End testing** validates complete user workflows from start to finish, testing the entire application stack as a user would experience it.

### Characteristics

- **Slow** - Runs in seconds to minutes
- **Real browser** - Uses actual browsers (Chrome, Firefox)
- **Full stack** - Tests UI, backend, database together
- **Brittle** - More likely to break
- **Expensive** - Time-consuming to write and maintain

### When to Use

**Test:**
- Critical user paths (login, checkout, signup)
- Complete workflows (create order, submit form)
- Cross-browser compatibility
- Visual regression
- Smoke tests before deployment

**Example:**
```javascript
// E2E test with Playwright
test('user can complete checkout process', async ({ page }) => {
  // Navigate to site
  await page.goto('https://example.com');

  // Add item to cart
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="cart-icon"]');

  // Proceed to checkout
  await page.click('[data-testid="checkout-button"]');

  // Fill shipping info
  await page.fill('#email', 'user@example.com');
  await page.fill('#address', '123 Main St');

  // Complete payment
  await page.fill('#card-number', '4242424242424242');
  await page.click('[data-testid="place-order"]');

  // Verify success
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page).toHaveURL(/\/order-confirmation/);
});
```

### Best Practices

✅ Test only critical paths
✅ Keep tests stable and reliable
✅ Use data-testid attributes
✅ Run in parallel when possible
✅ Use page object model for reusability

---

## Acceptance Testing

### What is Acceptance Testing?

**Acceptance testing** verifies that software meets business requirements and is acceptable to stakeholders. Often written in a format non-technical stakeholders can understand.

### Characteristics

- **Business-focused** - Tests requirements and specifications
- **Stakeholder-readable** - Often using BDD syntax
- **High-level** - Tests features, not implementation
- **Automated or manual** - Can be either

### When to Use

**Test:**
- User stories and requirements
- Business rules
- Feature acceptance criteria
- Compliance requirements

**Example (BDD style):**
```gherkin
Feature: User Login
  As a user
  I want to log in to my account
  So that I can access my personal dashboard

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid email "user@example.com"
    And I enter valid password "SecurePass123"
    And I click the "Login" button
    Then I should see my dashboard
    And I should see a welcome message with my name

  Scenario: Failed login with invalid password
    Given I am on the login page
    When I enter valid email "user@example.com"
    And I enter invalid password "wrongpassword"
    And I click the "Login" button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page
```

---

## Performance Testing

### What is Performance Testing?

**Performance testing** evaluates how the system performs under various conditions, including load, stress, and scalability testing.

### Types of Performance Tests

**Load Testing:**
- Test system under expected load
- Verify response times meet requirements
- Identify bottlenecks

**Stress Testing:**
- Test system beyond normal capacity
- Find breaking points
- Test recovery mechanisms

**Spike Testing:**
- Sudden increase in load
- Test auto-scaling
- Verify system stability

**Endurance Testing:**
- Sustained load over time
- Memory leaks
- Resource exhaustion

### When to Use

**Test:**
- API response times
- Database query performance
- Page load times
- Concurrent user capacity
- Resource usage under load

**Example:**
```javascript
// Performance test with k6
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 },   // Ramp up to 50 users
    { duration: '1m', target: 50 },    // Stay at 50 users
    { duration: '30s', target: 100 },  // Ramp up to 100 users
    { duration: '1m', target: 100 },   // Stay at 100 users
    { duration: '30s', target: 0 },    // Ramp down
  ],
};

export default function() {
  let response = http.get('https://api.example.com/users');

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

---

## Security Testing

### What is Security Testing?

**Security testing** identifies vulnerabilities and ensures the application is protected against threats.

### Types of Security Tests

**Vulnerability Scanning:**
- Automated scanning for known vulnerabilities
- Dependency checks
- Configuration issues

**Penetration Testing:**
- Ethical hacking
- Simulate real attacks
- Find security weaknesses

**Authentication Testing:**
- Password strength
- Session management
- OAuth flows

**Authorization Testing:**
- Access control
- Role-based permissions
- Data isolation

### Common Security Tests

```javascript
describe('Security Tests', () => {
  test('should prevent SQL injection', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    const response = await request(app)
      .post('/api/users/search')
      .send({ query: maliciousInput });

    expect(response.status).toBe(400);
    // Verify database still exists
    const users = await database.users.count();
    expect(users).toBeGreaterThan(0);
  });

  test('should prevent XSS attacks', async () => {
    const xssPayload = '<script>alert("XSS")</script>';
    const response = await request(app)
      .post('/api/comments')
      .send({ content: xssPayload });

    const savedComment = await database.comments.findById(response.body.id);
    expect(savedComment.content).not.toContain('<script>');
  });

  test('should require authentication for protected routes', async () => {
    const response = await request(app)
      .get('/api/user/profile');

    expect(response.status).toBe(401);
  });
});
```

---

## Smoke Testing

### What is Smoke Testing?

**Smoke testing** (or sanity testing) performs a quick check to verify that the critical functionality works before more thorough testing.

### Characteristics

- **Quick** - Takes minutes
- **High-level** - Tests basic functionality only
- **Go/No-Go** - Determines if further testing is worthwhile
- **Automated** - Typically runs in CI/CD pipeline

### When to Use

**Test:**
- After deployment
- After builds
- Before full test suite
- Critical paths only

**Example:**
```javascript
describe('Smoke Tests', () => {
  test('application starts successfully', async () => {
    const response = await fetch('http://localhost:3000/health');
    expect(response.status).toBe(200);
  });

  test('database connection works', async () => {
    const result = await database.query('SELECT 1');
    expect(result).toBeDefined();
  });

  test('API returns expected structure', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
  });

  test('authentication service is available', async () => {
    const response = await fetch('http://auth-service/health');
    expect(response.status).toBe(200);
  });
});
```

---

## Regression Testing

### What is Regression Testing?

**Regression testing** ensures that new changes haven't broken existing functionality. Typically involves re-running existing tests.

### When to Use

**Test:**
- After bug fixes
- After feature additions
- Before releases
- After refactoring

### Best Practices

✅ Automate regression tests
✅ Run in CI/CD pipeline
✅ Prioritize critical paths
✅ Use version control for tests
✅ Track test coverage

---

## Choosing the Right Test Type

### Decision Matrix

| Need | Test Type |
|------|-----------|
| Test business logic | Unit Tests |
| Test API endpoints | Integration Tests |
| Test user workflows | E2E Tests |
| Verify requirements | Acceptance Tests |
| Check performance | Load/Stress Tests |
| Find vulnerabilities | Security Tests |
| Quick health check | Smoke Tests |
| Prevent regressions | Regression Tests |

### Testing Strategy

**Start with:**
1. Unit tests for core logic (70%)
2. Integration tests for APIs (20%)
3. E2E tests for critical paths (10%)

**Add as needed:**
- Performance tests for scalability concerns
- Security tests for sensitive data
- Smoke tests for deployment verification

---

## Resources

- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) - Martin Fowler
- [Testing Strategies in a Microservices Architecture](https://martinfowler.com/articles/microservice-testing/)
- [Google Testing Blog](https://testing.googleblog.com/)

## Next Steps

1. Read [Testing Basics](./testing-basics) for fundamentals
2. Learn [Test-Driven Development](./tdd) methodology
3. Explore [Test Doubles](./test-doubles) (mocks, stubs, spies)
4. Apply to your language/framework

---

**Master different test types to build a comprehensive testing strategy!**
