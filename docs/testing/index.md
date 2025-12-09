---
sidebar_position: 8
---

# Testing

Master software testing fundamentals that apply across all languages and frameworks. Learn universal testing principles, practices, and patterns that will make you a better developer.

## What's Covered

This section covers cross-cutting testing concepts that apply regardless of the language or framework you're using. For language-specific testing guides, see the individual language and framework sections.

## Topics

### [Fundamentals](./fundamentals/)
Universal testing principles that apply across all languages and frameworks.

**You'll learn:**
- Testing types (Unit, Integration, E2E)
- The testing pyramid
- Best practices and patterns
- When to test and what to test
- Common anti-patterns to avoid

### [Practices](./practices/)
Testing methodologies and advanced patterns.

**You'll learn:**
- [Test-Driven Development (TDD)](./fundamentals/tdd) - Red, Green, Refactor cycle
- Behavior-Driven Development (BDD) - Given/When/Then
- [Test Doubles](./fundamentals/test-doubles) - Mocks, stubs, spies, fakes
- Code coverage strategies

## Language-Specific Testing

For language and framework-specific testing guides, visit:

### Java Testing
- **[JUnit 5 Guide](../languages/java/testing/junit5)** - Complete JUnit 5 testing
- **Build Tools** - Gradle and Maven integration

### JavaScript Testing
- **Jest** - Popular JavaScript testing framework
- **Mocha** - Flexible test runner
- **Mocking** - Test doubles in JavaScript

### TypeScript Testing
- **Jest with TypeScript** - Type-safe testing
- **Type Testing** - Testing type definitions

### Framework Testing
- **[React Testing](../frameworks/react/react-testing)** - React Testing Library, Jest
- **[Angular Testing](../frameworks/angular/angular-testing)** - Jasmine, Karma, TestBed
- **[AngularJS Testing](../frameworks/angularjs/angularjs-testing)** - Legacy framework testing

---

## Why Testing Matters

### Code Quality
- Catch bugs early in development
- Ensure code behaves as expected
- Prevent regressions
- Serve as living documentation

### Development Speed
- Faster debugging and troubleshooting
- Safe refactoring
- Confidence to make changes
- Easier integration

### Team Benefits
- Better collaboration
- Clearer specifications
- Reduced maintenance costs
- Professional development practices

## Testing Principles

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

**Unit Tests (70%)**
- Test individual methods/classes
- Fast execution
- No external dependencies
- Easy to maintain

**Integration Tests (20%)**
- Test component interactions
- Database, APIs, file system
- Slower than unit tests
- More complex setup

**End-to-End Tests (10%)**
- Test complete user workflows
- Slowest execution
- Most brittle
- Highest maintenance cost

## Best Practices

### Test Structure (AAA Pattern)

```java
@Test
void shouldCalculateTotalPrice() {
    // Arrange - Set up test data
    ShoppingCart cart = new ShoppingCart();
    cart.addItem(new Item("Laptop", 999.99));
    cart.addItem(new Item("Mouse", 29.99));

    // Act - Execute the operation
    double total = cart.calculateTotal();

    // Assert - Verify the result
    assertEquals(1029.98, total, 0.01);
}
```

### Test Naming

```java
// Good test names describe behavior
@Test
void shouldThrowExceptionWhenDividingByZero()

@Test
void shouldReturnEmptyListWhenNoResultsFound()

@Test
void shouldCalculateDiscountFor PremiumMembers()
```

### One Assertion Per Test (Generally)

```java
// ✅ Good - focused test
@Test
void shouldReturnCorrectUserName() {
    User user = userService.getUserById(1);
    assertEquals("John Doe", user.getName());
}

@Test
void shouldReturnCorrectUserEmail() {
    User user = userService.getUserById(1);
    assertEquals("john@example.com", user.getEmail());
}

// ❌ Avoid - multiple unrelated assertions
@Test
void shouldReturnCorrectUser() {
    User user = userService.getUserById(1);
    assertEquals("John Doe", user.getName());
    assertEquals("john@example.com", user.getEmail());
    assertTrue(user.isActive());
    // If first assertion fails, we don't know about the rest
}
```

## Common Testing Patterns

### Test Fixtures

```java
class UserServiceTest {
    private UserService userService;
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        userService = new UserService(userRepository);
    }

    @AfterEach
    void tearDown() {
        // Clean up resources if needed
    }
}
```

### Parameterized Tests

```java
@ParameterizedTest
@ValueSource(ints = {1, 3, 5, 7, 9})
void shouldReturnTrueForOddNumbers(int number) {
    assertTrue(NumberUtils.isOdd(number));
}

@ParameterizedTest
@CsvSource({
    "apple, 5",
    "banana, 6",
    "cherry, 6"
})
void shouldReturnCorrectLength(String word, int expectedLength) {
    assertEquals(expectedLength, word.length());
}
```

### Exception Testing

```java
@Test
void shouldThrowExceptionForInvalidInput() {
    Calculator calc = new Calculator();

    assertThrows(
        IllegalArgumentException.class,
        () -> calc.divide(10, 0)
    );
}
```

## Test Coverage

### What to Test

✅ **Test:**
- Business logic
- Edge cases and boundary conditions
- Error handling
- Complex algorithms
- Critical paths

❌ **Don't Test:**
- Getters/setters (unless they have logic)
- Framework code
- Third-party libraries
- Simple constructors

### Coverage Goals

- **Unit Tests**: Aim for 70-80% code coverage
- **Focus on behavior**, not just coverage numbers
- **Critical code** should have close to 100% coverage
- **Legacy code** can have lower coverage initially

## Tools & Frameworks

### Testing Frameworks
- **JUnit 5** - Primary testing framework
- **TestNG** - Alternative to JUnit
- **Spock** - Groovy-based testing

### Mocking
- **Mockito** - Most popular mocking framework
- **EasyMock** - Alternative mocking framework
- **PowerMock** - For mocking static methods

### Assertion Libraries
- **AssertJ** - Fluent assertions
- **Hamcrest** - Matcher-based assertions
- **Truth** - Google's assertion library

### Test Data
- **Faker** - Generate fake data
- **TestContainers** - Docker containers for integration tests
- **H2 Database** - In-memory database for testing

## Getting Started

### Beginners
1. Start with simple unit tests
2. Learn JUnit basics (assertions, lifecycle)
3. Practice test-driven development (TDD)
4. Understand the testing pyramid

### Experienced Developers
1. Master mocking and test doubles
2. Learn integration testing patterns
3. Implement CI/CD with automated tests
4. Explore advanced JUnit 5 features

## Next Steps

After mastering testing basics, explore:
- **Test-Driven Development (TDD)** - Write tests first
- **Behavior-Driven Development (BDD)** - Given/When/Then
- **Mutation Testing** - Verify test effectiveness
- **Performance Testing** - JMH benchmarking
- **Contract Testing** - API contract verification
