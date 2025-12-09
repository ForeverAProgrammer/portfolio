---
sidebar_position: 1
---

# Testing Basics

Understand the different types of software testing and when to use each approach for maximum code quality and confidence.

## Testing Types Overview

Software testing is essential for ensuring code quality, preventing regressions, and maintaining confidence when making changes. Different types of tests serve different purposes and run at different stages of development.

### The Testing Pyramid

```
        /\
       /E2E\          ← Few, slow, expensive
      /------\
     /  API   \       ← Moderate number
    /----------\
   / Unit Tests \     ← Many, fast, cheap
  /--------------\
```

The testing pyramid represents the ideal distribution of tests in your test suite:
- **Unit Tests (70%)** - Fast, isolated, testing individual components
- **Integration Tests (20%)** - Testing how components work together
- **End-to-End Tests (10%)** - Testing complete user workflows

## Unit Testing

### What is Unit Testing?

Unit testing validates individual units of code (methods, functions, classes) in isolation from external dependencies.

**Characteristics:**
- Tests one thing at a time
- Runs in milliseconds
- No external dependencies (databases, APIs, file system)
- Uses mocks/stubs for dependencies
- Easy to write and maintain

### When to Use Unit Tests

**Test:**
- Business logic and algorithms
- Data transformations and calculations
- Validation logic
- Edge cases and boundary conditions
- Error handling

**Don't Test:**
- Framework code
- Simple getters/setters without logic
- Third-party libraries
- Configuration files

### Unit Testing Examples

#### Java (JUnit 5)

```java
// Class under test
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double divide(int numerator, int denominator) {
        if (denominator == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        return (double) numerator / denominator;
    }
}

// Unit tests with JUnit 5
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    @Test
    void shouldAddTwoNumbers() {
        Calculator calc = new Calculator();

        int result = calc.add(5, 3);

        assertEquals(8, result);
    }

    @Test
    void shouldDivideTwoNumbers() {
        Calculator calc = new Calculator();

        double result = calc.divide(10, 2);

        assertEquals(5.0, result, 0.001);
    }

    @Test
    void shouldThrowExceptionWhenDividingByZero() {
        Calculator calc = new Calculator();

        assertThrows(IllegalArgumentException.class,
            () -> calc.divide(10, 0));
    }
}
```

#### JavaScript (Jest)

```javascript
// calculator.js - Module under test
class Calculator {
    add(a, b) {
        return a + b;
    }

    divide(numerator, denominator) {
        if (denominator === 0) {
            throw new Error('Cannot divide by zero');
        }
        return numerator / denominator;
    }
}

module.exports = Calculator;

// calculator.test.js - Unit tests with Jest
const Calculator = require('./calculator');

describe('Calculator', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    test('should add two numbers', () => {
        const result = calc.add(5, 3);

        expect(result).toBe(8);
    });

    test('should divide two numbers', () => {
        const result = calc.divide(10, 2);

        expect(result).toBe(5);
    });

    test('should throw error when dividing by zero', () => {
        expect(() => {
            calc.divide(10, 0);
        }).toThrow('Cannot divide by zero');
    });
});
```

#### TypeScript (Jest)

```typescript
// calculator.ts - Class under test
export class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    divide(numerator: number, denominator: number): number {
        if (denominator === 0) {
            throw new Error('Cannot divide by zero');
        }
        return numerator / denominator;
    }
}

// calculator.test.ts - Unit tests with Jest
import { Calculator } from './calculator';

describe('Calculator', () => {
    let calc: Calculator;

    beforeEach(() => {
        calc = new Calculator();
    });

    test('should add two numbers', () => {
        const result = calc.add(5, 3);

        expect(result).toBe(8);
    });

    test('should divide two numbers', () => {
        const result = calc.divide(10, 2);

        expect(result).toBe(5);
    });

    test('should throw error when dividing by zero', () => {
        expect(() => {
            calc.divide(10, 0);
        }).toThrow('Cannot divide by zero');
    });
});
```

### Best Practices for Unit Tests

**1. Follow the AAA Pattern**
```java
@Test
void testName() {
    // Arrange - Set up test data and dependencies
    UserService service = new UserService();
    User user = new User("john@example.com");

    // Act - Execute the method under test
    boolean result = service.validateEmail(user);

    // Assert - Verify the outcome
    assertTrue(result);
}
```

**2. Use Descriptive Test Names**
```java
// ✅ Good - describes what is being tested
@Test
void shouldReturnTrueWhenEmailIsValid()

@Test
void shouldThrowExceptionWhenUserNotFound()

// ❌ Bad - unclear what is being tested
@Test
void testEmail()

@Test
void test1()
```

**3. Test One Thing Per Test**
```java
// ✅ Good - focused test
@Test
void shouldCalculateSubtotal() {
    Order order = createOrderWithItems();
    assertEquals(100.00, order.getSubtotal());
}

@Test
void shouldCalculateTax() {
    Order order = createOrderWithItems();
    assertEquals(8.00, order.getTax());
}

// ❌ Bad - testing multiple things
@Test
void shouldCalculateOrder() {
    Order order = createOrderWithItems();
    assertEquals(100.00, order.getSubtotal());
    assertEquals(8.00, order.getTax());
    assertEquals(108.00, order.getTotal());
    // If first assertion fails, we don't see the rest
}
```

## Integration Testing

### What is Integration Testing?

Integration testing validates that different modules, services, or components work correctly together.

**Characteristics:**
- Tests interactions between components
- Uses real dependencies (databases, APIs, file system)
- Slower than unit tests
- Requires setup/teardown of resources
- More realistic than unit tests

### When to Use Integration Tests

**Test:**
- Database queries and transactions
- API endpoints with real HTTP calls
- File system operations
- Message queue interactions
- Cache behavior
- Security/authentication flows

### Integration Testing Examples

#### Java (Spring Boot + JUnit)

```java
@SpringBootTest
@AutoConfigureTestDatabase
class UserRepositoryIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void shouldSaveAndRetrieveUser() {
        // Arrange
        User user = new User("john@example.com", "John Doe");

        // Act
        User saved = userRepository.save(user);
        User found = userRepository.findById(saved.getId()).orElse(null);

        // Assert
        assertNotNull(found);
        assertEquals("john@example.com", found.getEmail());
        assertEquals("John Doe", found.getName());
    }

    @Test
    void shouldFindUserByEmail() {
        // Arrange
        userRepository.save(new User("john@example.com", "John"));
        userRepository.save(new User("jane@example.com", "Jane"));

        // Act
        User found = userRepository.findByEmail("jane@example.com");

        // Assert
        assertNotNull(found);
        assertEquals("Jane", found.getName());
    }
}
```

#### JavaScript (Jest + Supertest for API testing)

```javascript
// userService.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../database');

describe('User Service Integration Tests', () => {
    beforeEach(async () => {
        // Clean database before each test
        await db.users.deleteAll();
    });

    afterAll(async () => {
        // Close database connection
        await db.close();
    });

    test('should create and retrieve user', async () => {
        // Arrange
        const newUser = {
            email: 'john@example.com',
            name: 'John Doe'
        };

        // Act
        const createResponse = await request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201);

        const userId = createResponse.body.id;

        const getResponse = await request(app)
            .get(`/api/users/${userId}`)
            .expect(200);

        // Assert
        expect(getResponse.body.email).toBe('john@example.com');
        expect(getResponse.body.name).toBe('John Doe');
    });

    test('should find user by email', async () => {
        // Arrange
        await request(app)
            .post('/api/users')
            .send({ email: 'john@example.com', name: 'John' });

        await request(app)
            .post('/api/users')
            .send({ email: 'jane@example.com', name: 'Jane' });

        // Act
        const response = await request(app)
            .get('/api/users/email/jane@example.com')
            .expect(200);

        // Assert
        expect(response.body.name).toBe('Jane');
    });
});
```

#### TypeScript (Jest + Supertest for API testing)

```typescript
// userService.test.ts
import request from 'supertest';
import app from '../app';
import db from '../database';
import { User } from '../types';

describe('User Service Integration Tests', () => {
    beforeEach(async () => {
        await db.users.deleteAll();
    });

    afterAll(async () => {
        await db.close();
    });

    test('should create and retrieve user', async () => {
        // Arrange
        const newUser: Partial<User> = {
            email: 'john@example.com',
            name: 'John Doe'
        };

        // Act
        const createResponse = await request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201);

        const userId: string = createResponse.body.id;

        const getResponse = await request(app)
            .get(`/api/users/${userId}`)
            .expect(200);

        // Assert
        expect(getResponse.body.email).toBe('john@example.com');
        expect(getResponse.body.name).toBe('John Doe');
    });

    test('should find user by email', async () => {
        // Arrange
        await request(app)
            .post('/api/users')
            .send({ email: 'john@example.com', name: 'John' });

        await request(app)
            .post('/api/users')
            .send({ email: 'jane@example.com', name: 'Jane' });

        // Act
        const response = await request(app)
            .get('/api/users/email/jane@example.com')
            .expect(200);

        // Assert
        expect(response.body.name).toBe('Jane');
    });
});
```

### Best Practices for Integration Tests

**1. Isolate Test Data**
```java
@BeforeEach
void setUp() {
    // Clean database before each test
    database.deleteAll();
}

@AfterEach
void tearDown() {
    // Clean up resources
    database.deleteAll();
}
```

**2. Use Test Databases**
```yaml
# application-test.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: create-drop
```

**3. Use Test Containers (for Docker)**
```java
@Testcontainers
class DatabaseIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:15");

    @Test
    void testDatabaseConnection() {
        // Test with real PostgreSQL container
    }
}
```

## End-to-End (E2E) Testing

### What is E2E Testing?

End-to-end testing validates complete user workflows from start to finish, simulating real user behavior.

**Characteristics:**
- Tests entire application stack
- Simulates real user interactions
- Runs in browser (for web apps)
- Slowest test type
- Most brittle and expensive to maintain

### When to Use E2E Tests

**Test:**
- Critical user journeys (login, checkout, signup)
- Multi-step workflows
- Cross-system integrations
- User interface interactions
- Business-critical paths

### E2E Testing Example

```javascript
// Using Playwright for E2E testing
const { test, expect } = require('@playwright/test');

test('user can complete checkout process', async ({ page }) => {
    // Navigate to product page
    await page.goto('https://example.com/products');

    // Add product to cart
    await page.click('[data-test="add-to-cart"]');

    // Go to cart
    await page.click('[data-test="cart-icon"]');

    // Verify item is in cart
    await expect(page.locator('[data-test="cart-item"]')).toBeVisible();

    // Proceed to checkout
    await page.click('[data-test="checkout-button"]');

    // Fill shipping information
    await page.fill('[data-test="email"]', 'user@example.com');
    await page.fill('[data-test="address"]', '123 Main St');

    // Complete purchase
    await page.click('[data-test="place-order"]');

    // Verify order confirmation
    await expect(page.locator('[data-test="order-confirmation"]'))
        .toContainText('Order confirmed');
});
```

### Best Practices for E2E Tests

**1. Test Critical Paths Only**
```javascript
// ✅ Good - critical user journey
test('user can purchase product', async ({ page }) => {
    // Complete checkout flow
});

// ❌ Bad - testing every UI variation
test('button is blue', async ({ page }) => {
    // Too granular for E2E
});
```

**2. Use Stable Selectors**
```javascript
// ✅ Good - data attributes for testing
await page.click('[data-test="submit-button"]');

// ❌ Bad - fragile CSS selectors
await page.click('.container > div:nth-child(3) > button.blue');
```

**3. Keep Tests Independent**
```javascript
// ✅ Good - each test is independent
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await login(page, 'test@example.com', 'password');
});

// ❌ Bad - tests depend on each other
test('step 1: create account', async () => {});
test('step 2: login', async () => {}); // Breaks if step 1 fails
```

## API Testing

### What is API Testing?

API testing validates that APIs work correctly, return expected data, and handle errors properly.

**Characteristics:**
- Tests HTTP endpoints
- Validates request/response contracts
- Faster than E2E tests
- Tests business logic through API layer
- No UI dependencies

### API Testing Example

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserApiTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldCreateUser() {
        // Arrange
        UserRequest request = new UserRequest("john@example.com", "John Doe");

        // Act
        ResponseEntity<User> response = restTemplate.postForEntity(
            "/api/users",
            request,
            User.class
        );

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("john@example.com", response.getBody().getEmail());
    }

    @Test
    void shouldReturnBadRequestForInvalidEmail() {
        // Arrange
        UserRequest request = new UserRequest("invalid-email", "John");

        // Act
        ResponseEntity<String> response = restTemplate.postForEntity(
            "/api/users",
            request,
            String.class
        );

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
```

## Test Coverage

### What is Test Coverage?

Test coverage measures the percentage of your code that is executed during tests.

**Types of Coverage:**
- **Line Coverage** - Percentage of code lines executed
- **Branch Coverage** - Percentage of decision branches (if/else) tested
- **Function Coverage** - Percentage of functions called
- **Statement Coverage** - Percentage of statements executed

### Coverage Goals

- **Unit Tests**: Aim for 70-80% coverage
- **Critical Code**: 90-100% coverage
- **Legacy Code**: Can start lower, improve gradually
- **Focus on behavior**, not just numbers

### Measuring Coverage

```bash
# Java with JaCoCo
./gradlew test jacocoTestReport

# JavaScript with Jest
npm test -- --coverage

# View coverage report
open build/reports/jacoco/test/html/index.html
```

## Testing Best Practices

### General Principles

**1. Fast Feedback**
- Unit tests should run in seconds
- Integration tests in minutes
- E2E tests can take longer

**2. Deterministic Tests**
- Same input = Same output
- No random data in assertions
- No dependency on external services (use mocks)

**3. Independent Tests**
- Tests should not depend on each other
- Tests should run in any order
- Clean up after each test

**4. Readable Tests**
- Clear test names
- Follow AAA pattern
- Minimal setup code

### Test Naming Conventions

```java
// Format: should[ExpectedBehavior]When[StateUnderTest]
@Test
void shouldReturnTrueWhenEmailIsValid()

@Test
void shouldThrowExceptionWhenUserNotFound()

@Test
void shouldCalculateDiscountWhenUserIsPremiumMember()
```

## Common Testing Anti-Patterns

### Testing Implementation Details

```java
// Bad - testing internal implementation
@Test
void shouldCallRepositoryFindById() {
    verify(repository).findById(anyLong());
}

// Good - testing behavior
@Test
void shouldReturnUserWhenIdExists() {
    User user = service.getUserById(1L);
    assertNotNull(user);
}
```

### Fragile Tests

```java
// Bad - breaks with any UI change
assertEquals("Welcome, John Doe! You have 5 items.", message);

// Good - tests essential behavior
assertTrue(message.contains("Welcome"));
assertTrue(message.contains("John Doe"));
```

### Slow Tests

```java
// Bad - unnecessary delays
@Test
void shouldProcessOrder() {
    Thread.sleep(5000); // Don't do this!
    // test code
}

// Good - use mocks/stubs
@Test
void shouldProcessOrder() {
    when(paymentService.process()).thenReturn(success);
    // test code runs instantly
}
```

## Testing Tools & Frameworks by Language

### Java Testing Ecosystem

#### Unit Testing
- **JUnit 5** (Jupiter) - Modern Java testing framework
  ```xml
  <!-- Maven dependency -->
  <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.10.0</version>
      <scope>test</scope>
  </dependency>
  ```
- **TestNG** - Alternative to JUnit with more features

#### Mocking & Assertions
- **Mockito** - Most popular Java mocking framework
- **AssertJ** - Fluent assertions library
- **Hamcrest** - Matcher-based assertions

#### Integration Testing
- **Spring Boot Test** - Testing Spring applications
- **TestContainers** - Docker containers for integration tests
- **H2 Database** - In-memory database for testing

#### API Testing
- **REST Assured** - Testing REST APIs
- **MockMVC** - Testing Spring MVC controllers

### JavaScript Testing Ecosystem

#### Unit Testing
- **Jest** - Complete testing framework (most popular)
  ```json
  // package.json
  {
    "scripts": {
      "test": "jest",
      "test:watch": "jest --watch",
      "test:coverage": "jest --coverage"
    },
    "devDependencies": {
      "jest": "^29.7.0"
    }
  }
  ```
- **Mocha** - Flexible test framework
- **Vitest** - Fast Vite-native testing

#### Mocking & Assertions
- **Jest built-in mocks** - Jest includes mocking
- **Sinon** - Standalone mocking library
- **Chai** - BDD/TDD assertion library
- **Testing Library** - DOM testing utilities

#### Integration Testing
- **Supertest** - HTTP assertion library for API testing
  ```javascript
  const request = require('supertest');
  const app = require('../app');

  test('GET /api/users returns 200', async () => {
    await request(app)
      .get('/api/users')
      .expect(200);
  });
  ```

#### E2E Testing
- **Playwright** - Modern, fast E2E testing
- **Cypress** - Developer-friendly E2E framework
- **Puppeteer** - Chrome DevTools Protocol

### TypeScript Testing Ecosystem

#### Unit Testing
- **Jest with ts-jest** - Jest configured for TypeScript
  ```json
  // jest.config.js
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.test.ts']
  };
  ```
- **Vitest** - TypeScript-first testing (Vite ecosystem)

#### Type Testing
- **tsd** - Test TypeScript type definitions
- **@types/jest** - Jest type definitions

#### Mocking & Assertions
- **Jest** - Full mocking capabilities with TS support
- **ts-mockito** - TypeScript-specific mocking
- **Testing Library** - React/DOM testing with TS

#### Integration Testing
- **Supertest with TypeScript** - Typed API testing
  ```typescript
  import request from 'supertest';
  import app from '../app';

  describe('API Tests', () => {
    test('GET /api/users returns 200', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body).toHaveLength(5);
    });
  });
  ```

#### E2E Testing
- **Playwright** - Full TypeScript support
- **Cypress** - TypeScript support with types

### Cross-Language Tools

#### E2E Testing
- **Selenium WebDriver** - Works with Java, JavaScript/TypeScript
- **Playwright** - Supports TypeScript, JavaScript, Java, Python
- **Cypress** - JavaScript/TypeScript only

#### API Testing
- **Postman/Newman** - API testing and automation
- **Pact** - Contract testing (multiple languages)
- **WireMock** - API mocking (Java, Node.js)

#### Coverage Tools
- **JaCoCo** - Java code coverage
- **Jest --coverage** - JavaScript/TypeScript coverage
- **Istanbul/nyc** - JavaScript coverage reporter

### Test Runners Comparison

| Feature | Jest (JS/TS) | JUnit 5 (Java) | Vitest (TS) |
|---------|-------------|---------------|-------------|
| Speed | Fast | Fast | Very Fast |
| Watch Mode | ✅ | ✅ | ✅ |
| Parallel Tests | ✅ | ✅ | ✅ |
| Snapshot Testing | ✅ | ❌ | ✅ |
| Built-in Mocking | ✅ | ❌ | ✅ |
| Coverage | ✅ | Needs JaCoCo | ✅ |
| TypeScript | Good | N/A | Excellent |
| Setup Complexity | Low | Medium | Low |

### Recommended Tool Combinations

#### Java Project
```
JUnit 5 + Mockito + AssertJ + TestContainers + JaCoCo
```

#### JavaScript/Node.js Project
```
Jest + Supertest + Testing Library + Playwright
```

#### TypeScript Project
```
Vitest/Jest + ts-jest + Supertest + Playwright + tsd
```

#### Full-Stack Project
```
Backend: JUnit 5 + Mockito
Frontend: Jest + Testing Library
E2E: Playwright (TypeScript) or Cypress
API: REST Assured (Java) or Supertest (Node.js)
```

## Next Steps

Now that you understand testing fundamentals, explore:
- **[JUnit 5 Guide](../../languages/java/testing/junit5)** - Complete JUnit testing guide
- **Test-Driven Development (TDD)** - Write tests first
- **Behavior-Driven Development (BDD)** - Given/When/Then style
- **Mutation Testing** - Verify test effectiveness
