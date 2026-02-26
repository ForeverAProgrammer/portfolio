---
sidebar_position: 2
---

# JUnit 5 Testing Guide

JUnit 5 is the latest version of the most popular testing framework for Java. This guide covers integration with Gradle, creating tests, and managing test execution.

## What is JUnit 5?

**JUnit 5** (also known as JUnit Jupiter) is a complete rewrite of JUnit with:

- Modern Java features (Java 8+)
- More flexible architecture
- Better extension model
- Lambda support
- Parameterized tests
- Dynamic tests

### JUnit 5 Architecture

JUnit 5 consists of three modules:
1. **JUnit Platform** - Foundation for launching tests
2. **JUnit Jupiter** - New programming model and extension model
3. **JUnit Vintage** - Support for JUnit 3 and 4 tests

## Gradle Integration

### build.gradle Configuration

```groovy
plugins {
    id 'java'
}

repositories {
    mavenCentral()
}

dependencies {
    // JUnit 5 (Jupiter)
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.1'

    // Optional: JUnit Jupiter API (if you need to separate API from engine)
    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.10.1'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.10.1'

    // Optional: Parameterized tests
    testImplementation 'org.junit.jupiter:junit-jupiter-params:5.10.1'

    // Optional: Support for JUnit 4 tests
    testRuntimeOnly 'org.junit.vintage:junit-vintage-engine:5.10.1'
}

test {
    useJUnitPlatform()

    // Optional test configuration
    testLogging {
        events "passed", "skipped", "failed"
        exceptionFormat "full"
    }
}
```

### Kotlin DSL (build.gradle.kts)

```kotlin
plugins {
    java
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.1")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.test {
    useJUnitPlatform()
}
```

## Basic Test Structure

### Simple Test Class

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    @Test
    void testAddition() {
        Calculator calc = new Calculator();
        int result = calc.add(2, 3);
        assertEquals(5, result);
    }

    @Test
    void testSubtraction() {
        Calculator calc = new Calculator();
        int result = calc.subtract(5, 3);
        assertEquals(2, result);
    }
}
```

### Test Lifecycle Annotations

```java
import org.junit.jupiter.api.*;

class LifecycleTest {

    @BeforeAll
    static void setupAll() {
        // Runs once before all tests in this class
        System.out.println("Setting up test class");
    }

    @BeforeEach
    void setupEach() {
        // Runs before each test method
        System.out.println("Setting up test");
    }

    @Test
    void test1() {
        System.out.println("Running test 1");
    }

    @Test
    void test2() {
        System.out.println("Running test 2");
    }

    @AfterEach
    void teardownEach() {
        // Runs after each test method
        System.out.println("Tearing down test");
    }

    @AfterAll
    static void teardownAll() {
        // Runs once after all tests in this class
        System.out.println("Tearing down test class");
    }
}
```

**Execution order:**
```
setupAll()
  setupEach()
    test1()
  teardownEach()
  setupEach()
    test2()
  teardownEach()
teardownAll()
```

## Assertions

### Basic Assertions

```java
import static org.junit.jupiter.api.Assertions.*;

class AssertionsTest {

    @Test
    void testBasicAssertions() {
        // Equality
        assertEquals(4, 2 + 2);
        assertEquals("hello", "hello");
        assertEquals(5.0, 5.0, 0.001); // With delta for floating point

        // Boolean
        assertTrue(5 > 3);
        assertFalse(5 < 3);

        // Null checks
        assertNull(null);
        assertNotNull("not null");

        // Same object reference
        String str1 = "test";
        String str2 = str1;
        assertSame(str1, str2);
        assertNotSame("test", new String("test"));

        // Array equality
        int[] expected = {1, 2, 3};
        int[] actual = {1, 2, 3};
        assertArrayEquals(expected, actual);
    }
}
```

### Grouped Assertions

```java
@Test
void testGroupedAssertions() {
    Address address = new Address("Main St", "Springfield", "12345");

    assertAll("address",
        () -> assertEquals("Main St", address.getStreet()),
        () -> assertEquals("Springfield", address.getCity()),
        () -> assertEquals("12345", address.getZipCode())
    );
}
```

### Exception Testing

```java
@Test
void testException() {
    // Assert exception is thrown
    assertThrows(IllegalArgumentException.class, () -> {
        throw new IllegalArgumentException("Invalid argument");
    });

    // Assert and capture exception
    Exception exception = assertThrows(ArithmeticException.class, () -> {
        int result = 10 / 0;
    });
    assertEquals("/ by zero", exception.getMessage());
}
```

### Timeout Assertions

```java
@Test
void testTimeout() {
    // Fails if takes longer than 100ms
    assertTimeout(Duration.ofMillis(100), () -> {
        Thread.sleep(50);
    });
}

@Test
void testTimeoutPreemptively() {
    // Aborts execution after timeout
    assertTimeoutPreemptively(Duration.ofMillis(100), () -> {
        Thread.sleep(50);
    });
}
```

### AssertJ Fluent Assertions (Recommended)

For more readable assertions, use AssertJ:

```groovy
// Add to build.gradle
testImplementation 'org.assertj:assertj-core:3.24.2'
```

```java
import static org.assertj.core.api.Assertions.*;

class AssertJExampleTest {

    @Test
    void demonstrateAssertJ() {
        // More readable than JUnit assertions
        assertThat(2 + 2).isEqualTo(4);
        assertThat("Hello").startsWith("He").endsWith("lo");

        // Collections
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        assertThat(names)
            .hasSize(3)
            .contains("Alice", "Bob")
            .doesNotContain("Dave");

        // Exceptions
        assertThatThrownBy(() -> divide(1, 0))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("Cannot divide by zero");

        // Objects
        Person person = new Person("John", 30);
        assertThat(person)
            .extracting("name", "age")
            .containsExactly("John", 30);

        // Numbers
        assertThat(10).isGreaterThan(5).isLessThan(20);

        // Strings
        assertThat("JUnit 5").contains("Unit").doesNotContain("Python");
    }
}
```

## Test Display Names

```java
@DisplayName("Calculator Tests")
class CalculatorTest {

    @Test
    @DisplayName("Adding two positive numbers")
    void testAddition() {
        assertEquals(5, calculator.add(2, 3));
    }

    @Test
    @DisplayName("2 + 3 = 5")
    void testAdditionWithSymbols() {
        assertEquals(5, calculator.add(2, 3));
    }
}
```

## Disabling Tests

### Disable Individual Test

```java
@Test
@Disabled("Not implemented yet")
void testNotReady() {
    // Test code
}
```

### Disable Entire Test Class

```java
@Disabled("Feature not ready")
class FeatureTest {
    @Test
    void test1() { }

    @Test
    void test2() { }
}
```

### Conditional Execution

```java
@Test
@EnabledOnOs(OS.LINUX)
void testOnLinux() {
    // Only runs on Linux
}

@Test
@DisabledOnOs(OS.WINDOWS)
void testNotOnWindows() {
    // Doesn't run on Windows
}

@Test
@EnabledOnJre(JRE.JAVA_17)
void testOnJava17() {
    // Only runs on Java 17
}

@Test
@EnabledIfEnvironmentVariable(named = "ENV", matches = "prod")
void testInProduction() {
    // Only runs if ENV=prod
}

@Test
@EnabledIf("customCondition")
void testWithCustomCondition() {
    // Only runs if customCondition() returns true
}

boolean customCondition() {
    return System.getProperty("custom.property") != null;
}
```

## Parameterized Tests

### Value Source

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class ParameterizedTests {

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void testWithInts(int number) {
        assertTrue(number > 0);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Hello", "World", "JUnit"})
    void testWithStrings(String word) {
        assertNotNull(word);
        assertTrue(word.length() > 0);
    }
}
```

### CSV Source

```java
@ParameterizedTest
@CsvSource({
    "1, 2, 3",
    "5, 5, 10",
    "10, -5, 5"
})
void testAddition(int a, int b, int expected) {
    assertEquals(expected, calculator.add(a, b));
}
```

### CSV File Source

```java
@ParameterizedTest
@CsvFileSource(resources = "/test-data.csv", numLinesToSkip = 1)
void testWithCsvFile(int input, int expected) {
    assertEquals(expected, calculator.calculate(input));
}
```

### Method Source

```java
@ParameterizedTest
@MethodSource("provideTestData")
void testWithMethodSource(String input, int expected) {
    assertEquals(expected, input.length());
}

static Stream<Arguments> provideTestData() {
    return Stream.of(
        Arguments.of("hello", 5),
        Arguments.of("world", 5),
        Arguments.of("test", 4)
    );
}
```

### Enum Source

```java
enum Priority {
    LOW, MEDIUM, HIGH
}

@ParameterizedTest
@EnumSource(Priority.class)
void testWithEnums(Priority priority) {
    assertNotNull(priority);
}

@ParameterizedTest
@EnumSource(value = Priority.class, names = {"LOW", "MEDIUM"})
void testWithSelectedEnums(Priority priority) {
    assertNotEquals(Priority.HIGH, priority);
}
```

## Nested Tests

```java
@DisplayName("Stack Tests")
class StackTest {

    Stack<Integer> stack;

    @Nested
    @DisplayName("when new")
    class WhenNew {

        @BeforeEach
        void createNewStack() {
            stack = new Stack<>();
        }

        @Test
        @DisplayName("is empty")
        void isEmpty() {
            assertTrue(stack.isEmpty());
        }

        @Test
        @DisplayName("throws EmptyStackException when popped")
        void throwsExceptionWhenPopped() {
            assertThrows(EmptyStackException.class, stack::pop);
        }

        @Nested
        @DisplayName("after pushing an element")
        class AfterPushing {

            @BeforeEach
            void pushElement() {
                stack.push(42);
            }

            @Test
            @DisplayName("is not empty")
            void isNotEmpty() {
                assertFalse(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when popped")
            void returnElement() {
                assertEquals(42, stack.pop());
            }
        }
    }
}
```

## Test Execution Order

### Default Order (deterministic but not guaranteed)

```java
class DefaultOrderTest {
    @Test void test1() { }
    @Test void test2() { }
    @Test void test3() { }
}
```

### Method Name Order

```java
@TestMethodOrder(MethodOrderer.MethodName.class)
class OrderedByNameTest {
    @Test void test3() { }
    @Test void test1() { }
    @Test void test2() { }
    // Executes: test1, test2, test3
}
```

### Display Name Order

```java
@TestMethodOrder(MethodOrderer.DisplayName.class)
class OrderedByDisplayNameTest {
    @Test @DisplayName("C") void test1() { }
    @Test @DisplayName("A") void test2() { }
    @Test @DisplayName("B") void test3() { }
    // Executes in order: A, B, C
}
```

### Custom Order

```java
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class OrderedTest {
    @Test @Order(3) void test1() { }
    @Test @Order(1) void test2() { }
    @Test @Order(2) void test3() { }
    // Executes in order: test2, test3, test1
}
```

## Tags

```java
@Tag("fast")
@Test
void fastTest() {
    // Quick test
}

@Tag("slow")
@Test
void slowTest() {
    // Slower integration test
}

@Tag("integration")
@Tag("database")
@Test
void databaseIntegrationTest() {
    // Database test
}
```

### Running Tests by Tag (Gradle)

```groovy
test {
    useJUnitPlatform {
        includeTags 'fast'
        excludeTags 'slow', 'integration'
    }
}
```

Command line:
```bash
./gradlew test -Dgroups=fast
./gradlew test -DexcludedGroups=slow
```

## Test Instance Lifecycle

### Default: Per-Method

```java
class PerMethodTest {
    int counter = 0;

    @Test
    void test1() {
        counter++;
        assertEquals(1, counter); // Always 1
    }

    @Test
    void test2() {
        counter++;
        assertEquals(1, counter); // Always 1 (new instance)
    }
}
```

### Per-Class (shared state)

```java
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PerClassTest {
    int counter = 0;

    @Test
    void test1() {
        counter++;
        assertEquals(1, counter);
    }

    @Test
    void test2() {
        counter++;
        assertEquals(2, counter); // Shared state
    }
}
```

## Gradle Test Configuration

### Advanced Test Configuration

```groovy
test {
    useJUnitPlatform {
        // Include/exclude tags
        includeTags 'fast', 'unit'
        excludeTags 'slow', 'integration'

        // Include/exclude engines
        includeEngines 'junit-jupiter'
        excludeEngines 'junit-vintage'
    }

    // Test logging
    testLogging {
        events "passed", "skipped", "failed", "standardOut", "standardError"
        exceptionFormat "full"
        showStandardStreams = true
    }

    // Run tests in parallel
    maxParallelForks = Runtime.runtime.availableProcessors().intdiv(2) ?: 1

    // Fail fast
    failFast = true

    // Memory settings
    minHeapSize = "128m"
    maxHeapSize = "1g"

    // System properties
    systemProperty 'junit.jupiter.execution.parallel.enabled', 'true'

    // Reports
    reports {
        html.enabled = true
        junitXml.enabled = true
    }
}
```

### Separate Test Tasks

```groovy
// Fast unit tests
tasks.register('unitTest', Test) {
    useJUnitPlatform {
        includeTags 'unit'
    }
}

// Slow integration tests
tasks.register('integrationTest', Test) {
    useJUnitPlatform {
        includeTags 'integration'
    }
}

// Run all tests
test {
    dependsOn unitTest, integrationTest
}
```

## Parallel Execution

### Enable Parallel Tests

```groovy
test {
    systemProperty 'junit.jupiter.execution.parallel.enabled', 'true'
    systemProperty 'junit.jupiter.execution.parallel.mode.default', 'concurrent'
    systemProperty 'junit.jupiter.execution.parallel.config.strategy', 'dynamic'
}
```

### Control Parallelism

```java
@Execution(ExecutionMode.CONCURRENT)
class ParallelTest {
    @Test void test1() { }
    @Test void test2() { }
}

@Execution(ExecutionMode.SAME_THREAD)
class SequentialTest {
    @Test void test1() { }
    @Test void test2() { }
}
```

## Best Practices

1. **Use descriptive test names** - Clear what is being tested
2. **One assertion per test** - Or use assertAll() for grouped assertions
3. **Follow AAA pattern** - Arrange, Act, Assert
4. **Use @BeforeEach for common setup** - Keep tests DRY
5. **Test edge cases** - Null, empty, boundary values
6. **Use parameterized tests** - Avoid duplicate test code
7. **Tag your tests** - Enable selective execution
8. **Keep tests fast** - Separate unit from integration tests
9. **Use meaningful assertions** - Provide failure messages
10. **Clean up resources** - Use @AfterEach for cleanup

## Common Patterns

### AAA Pattern

```java
@Test
void testUserRegistration() {
    // Arrange
    UserService service = new UserService();
    User user = new User("john", "password");

    // Act
    boolean result = service.register(user);

    // Assert
    assertTrue(result);
    assertEquals("john", service.findUser("john").getUsername());
}
```

### Test Fixtures

```java
class UserServiceTest {
    UserService service;
    User testUser;

    @BeforeEach
    void setUp() {
        service = new UserService();
        testUser = new User("john", "password");
    }

    @Test
    void testRegister() {
        assertTrue(service.register(testUser));
    }

    @Test
    void testLogin() {
        service.register(testUser);
        assertTrue(service.login("john", "password"));
    }
}
```

## Mocking with Mockito

Mockito integrates seamlessly with JUnit 5 for mocking dependencies.

```groovy
// Add to build.gradle
testImplementation 'org.mockito:mockito-core:5.7.0'
testImplementation 'org.mockito:mockito-junit-jupiter:5.7.0'
```

### Basic Mocking

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @Test
    void shouldCreateUser() {
        // Arrange
        User mockUser = new User(1L, "john@example.com");
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        UserService service = new UserService(userRepository, emailService);

        // Act
        User result = service.createUser("john@example.com", "John");

        // Assert
        assertEquals(mockUser, result);
        verify(userRepository).save(any(User.class));
        verify(emailService).sendWelcomeEmail(mockUser);
    }
}
```

## Test Coverage with JaCoCo

JaCoCo measures code coverage and generates reports.

### Add JaCoCo Plugin

```groovy
plugins {
    id 'java'
    id 'jacoco'
}

jacoco {
    toolVersion = "0.8.11"
}

jacocoTestReport {
    reports {
        xml.required = true
        html.required = true
    }

    afterEvaluate {
        classDirectories.setFrom(files(classDirectories.files.collect {
            fileTree(dir: it, exclude: [
                '**/config/**',
                '**/entity/**',
                '**/dto/**'
            ])
        }))
    }
}

test {
    finalizedBy jacocoTestReport
}
```

### Run Tests with Coverage

```bash
# Run tests and generate coverage report
./gradlew clean test jacocoTestReport

# View report
open build/reports/jacoco/test/html/index.html
```

### Coverage Goals

```groovy
jacocoTestCoverageVerification {
    violationRules {
        rule {
            limit {
                minimum = 0.80  // 80% coverage
            }
        }

        rule {
            element = 'CLASS'
            excludes = ['**/config/**', '**/dto/**']

            limit {
                counter = 'LINE'
                value = 'COVEREDRATIO'
                minimum = 0.70
            }
        }
    }
}

check.dependsOn jacocoTestCoverageVerification
```

## Running Tests from Command Line

```bash
# Run all tests
./gradlew test

# Run specific test class
./gradlew test --tests "CalculatorTest"

# Run specific test method
./gradlew test --tests "CalculatorTest.testAddition"

# Run tests matching pattern
./gradlew test --tests "*Service*"

# Run tests by tag
./gradlew test -Dgroups=unit
./gradlew test -DexcludedGroups=integration

# Run with logging
./gradlew test --info

# Continuous testing (rerun on code changes)
./gradlew test --continuous

# Force rerun (ignore up-to-date check)
./gradlew clean test
```

## Resources

- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [JUnit 5 API Documentation](https://junit.org/junit5/docs/current/api/)
- [Gradle Testing Documentation](https://docs.gradle.org/current/userguide/java_testing.html)
- [Baeldung JUnit 5 Tutorial](https://www.baeldung.com/junit-5)
- [AssertJ Documentation](https://assertj.github.io/doc/)
- [Mockito Documentation](https://site.mockito.org/)
- [JaCoCo Documentation](https://www.jacoco.org/jacoco/trunk/doc/)

## Migration from JUnit 4

| JUnit 4 | JUnit 5 |
|---------|---------|
| `@Before` | `@BeforeEach` |
| `@After` | `@AfterEach` |
| `@BeforeClass` | `@BeforeAll` |
| `@AfterClass` | `@AfterAll` |
| `@Ignore` | `@Disabled` |
| `@Category` | `@Tag` |
| `@RunWith` | `@ExtendWith` |
| `Assert.assertEquals()` | `Assertions.assertEquals()` |
