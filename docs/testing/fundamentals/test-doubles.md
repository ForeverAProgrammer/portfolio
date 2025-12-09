---
sidebar_position: 5
---

# Mocking and Test Doubles

Learn how to isolate code under test using mocks, stubs, spies, and other test doubles across Java, JavaScript, and TypeScript.

## What are Test Doubles?

Test doubles are objects that replace real dependencies in tests, allowing you to:
- **Isolate** the code under test
- **Control** behavior of dependencies
- **Verify** interactions with dependencies
- **Speed up** tests by avoiding slow operations

Think of test doubles like stunt doubles in movies—they stand in for the real thing during testing.

## Types of Test Doubles

### 1. Dummy
Objects passed around but never used. Used to fill parameter lists.

### 2. Stub
Provides canned answers to calls made during tests. Returns predefined values.

### 3. Spy
Records information about how it was called. Can verify interactions.

### 4. Mock
Pre-programmed with expectations about calls it will receive. Can verify behavior.

### 5. Fake
Working implementation, but simplified (e.g., in-memory database).

```
┌─────────────────────────────────────────────────┐
│          Test Doubles Spectrum                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Dummy  →  Stub  →  Spy  →  Mock  →  Fake     │
│                                                 │
│  Simple ──────────────────────────→ Complex    │
│  No logic ────────────────────→ Has logic      │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Java - Mockito

Mockito is the most popular mocking framework for Java.

### Setup

```xml
<!-- Maven -->
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
</dependency>
```

```groovy
// Gradle
testImplementation 'org.mockito:mockito-core:5.7.0'
testImplementation 'org.mockito:mockito-junit-jupiter:5.7.0'
```

### Creating Mocks

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
        // You can also create mocks manually
        UserRepository repo = mock(UserRepository.class);
    }
}
```

### Stubbing Methods

```java
@Test
void shouldFindUserById() {
    // Arrange - Stub the repository
    User mockUser = new User(1L, "john@example.com", "John");
    when(userRepository.findById(1L))
        .thenReturn(Optional.of(mockUser));

    UserService service = new UserService(userRepository);

    // Act
    User result = service.getUserById(1L);

    // Assert
    assertEquals("John", result.getName());
}

@Test
void shouldHandleMultipleCalls() {
    // Return different values on consecutive calls
    when(userRepository.count())
        .thenReturn(1L)
        .thenReturn(2L)
        .thenReturn(3L);

    assertEquals(1L, userRepository.count());
    assertEquals(2L, userRepository.count());
    assertEquals(3L, userRepository.count());
}
```

### Stubbing with Arguments

```java
@Test
void shouldStubBasedOnArguments() {
    // Exact argument matching
    when(userRepository.findById(1L))
        .thenReturn(Optional.of(new User(1L, "john@example.com")));

    // Argument matchers
    when(userRepository.findById(anyLong()))
        .thenReturn(Optional.empty());

    // Multiple arguments
    when(userRepository.findByEmailAndStatus(
        eq("john@example.com"),
        any(UserStatus.class)
    )).thenReturn(Optional.of(new User()));
}

@Test
void shouldUseArgumentCaptor() {
    ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

    UserService service = new UserService(userRepository);
    service.createUser("john@example.com", "John");

    // Verify and capture the argument
    verify(userRepository).save(userCaptor.capture());

    User capturedUser = userCaptor.getValue();
    assertEquals("john@example.com", capturedUser.getEmail());
}
```

### Throwing Exceptions

```java
@Test
void shouldHandleRepositoryException() {
    // Stub to throw exception
    when(userRepository.findById(anyLong()))
        .thenThrow(new DatabaseException("Connection failed"));

    UserService service = new UserService(userRepository);

    assertThrows(DatabaseException.class, () -> {
        service.getUserById(1L);
    });
}

@Test
void shouldThrowOnVoidMethod() {
    // For void methods, use doThrow
    doThrow(new EmailException("SMTP error"))
        .when(emailService).sendEmail(any());

    UserService service = new UserService(userRepository, emailService);

    assertThrows(EmailException.class, () -> {
        service.notifyUser(new User());
    });
}
```

### Verifying Interactions

```java
@Test
void shouldVerifyMethodCalls() {
    UserService service = new UserService(userRepository, emailService);
    service.createUser("john@example.com", "John");

    // Verify method was called
    verify(userRepository).save(any(User.class));

    // Verify exact number of invocations
    verify(emailService, times(1)).sendWelcomeEmail(any());

    // Verify never called
    verify(emailService, never()).sendPasswordResetEmail(any());

    // Verify at least / at most
    verify(userRepository, atLeast(1)).save(any());
    verify(userRepository, atMost(3)).save(any());
}

@Test
void shouldVerifyOrder() {
    InOrder inOrder = inOrder(userRepository, emailService);

    UserService service = new UserService(userRepository, emailService);
    service.createUserWithNotification("john@example.com", "John");

    // Verify order of calls
    inOrder.verify(userRepository).save(any(User.class));
    inOrder.verify(emailService).sendWelcomeEmail(any());
}
```

### Spying on Real Objects

```java
@Test
void shouldSpyOnRealObject() {
    // Spy calls real methods unless stubbed
    List<String> realList = new ArrayList<>();
    List<String> spyList = spy(realList);

    // Real method is called
    spyList.add("one");
    spyList.add("two");

    // Verify real behavior happened
    assertEquals(2, spyList.size());
    verify(spyList).add("one");

    // Can stub specific methods
    when(spyList.size()).thenReturn(100);
    assertEquals(100, spyList.size());
}

@Test
void shouldSpyOnUserService() {
    UserRepository realRepo = new InMemoryUserRepository();
    UserRepository spyRepo = spy(realRepo);

    // Most methods use real implementation
    // But we can stub specific methods
    doReturn(Optional.empty())
        .when(spyRepo).findById(999L);

    UserService service = new UserService(spyRepo);
    assertFalse(service.getUserById(999L).isPresent());
}
```

### Answer Interface

```java
@Test
void shouldUseCustomAnswer() {
    when(userRepository.save(any(User.class)))
        .thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(123L);
            return user;
        });

    User user = new User(null, "john@example.com");
    User saved = userRepository.save(user);

    assertEquals(123L, saved.getId());
}
```

## JavaScript - Jest

Jest has built-in mocking capabilities that are simple and powerful.

### Creating Mocks

```javascript
// userService.test.js
const UserRepository = require('./userRepository');
const EmailService = require('./emailService');
const UserService = require('./userService');

// Mock entire modules
jest.mock('./userRepository');
jest.mock('./emailService');

describe('UserService', () => {
    let userService;
    let mockUserRepository;
    let mockEmailService;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Create instances
        mockUserRepository = new UserRepository();
        mockEmailService = new EmailService();
        userService = new UserService(mockUserRepository, mockEmailService);
    });

    test('should create user', async () => {
        // Stub methods
        const mockUser = { id: 1, email: 'john@example.com', name: 'John' };
        mockUserRepository.save.mockResolvedValue(mockUser);

        const result = await userService.createUser('john@example.com', 'John');

        expect(result).toEqual(mockUser);
        expect(mockUserRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                email: 'john@example.com',
                name: 'John'
            })
        );
    });
});
```

### Manual Mocks

```javascript
// __mocks__/userRepository.js
class UserRepository {
    constructor() {
        this.findById = jest.fn();
        this.save = jest.fn();
        this.delete = jest.fn();
    }
}

module.exports = UserRepository;
```

### Mock Functions

```javascript
describe('Mock Functions', () => {
    test('should use mock function', () => {
        const mockFn = jest.fn();

        // Call the mock
        mockFn('hello');
        mockFn('world');

        // Verify calls
        expect(mockFn).toHaveBeenCalledTimes(2);
        expect(mockFn).toHaveBeenCalledWith('hello');
        expect(mockFn).toHaveBeenLastCalledWith('world');
    });

    test('should return values', () => {
        const mockFn = jest.fn()
            .mockReturnValue(42)
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(2);

        expect(mockFn()).toBe(1);  // First call
        expect(mockFn()).toBe(2);  // Second call
        expect(mockFn()).toBe(42); // Subsequent calls
    });

    test('should handle async functions', async () => {
        const mockFn = jest.fn()
            .mockResolvedValue('success')
            .mockResolvedValueOnce('first')
            .mockRejectedValueOnce(new Error('failed'));

        await expect(mockFn()).resolves.toBe('first');
        await expect(mockFn()).rejects.toThrow('failed');
        await expect(mockFn()).resolves.toBe('success');
    });
});
```

### Stubbing Methods

```javascript
describe('Stubbing', () => {
    test('should stub repository methods', async () => {
        const mockUser = { id: 1, name: 'John' };

        mockUserRepository.findById.mockResolvedValue(mockUser);

        const user = await userService.getUserById(1);

        expect(user).toEqual(mockUser);
        expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
    });

    test('should stub with different return values', () => {
        mockUserRepository.count
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(2)
            .mockReturnValueOnce(3);

        expect(mockUserRepository.count()).toBe(1);
        expect(mockUserRepository.count()).toBe(2);
        expect(mockUserRepository.count()).toBe(3);
    });
});
```

### Spying

```javascript
describe('Spying', () => {
    test('should spy on object methods', () => {
        const userRepo = {
            findById: (id) => ({ id, name: 'John' }),
            save: (user) => user
        };

        // Spy on methods
        const findByIdSpy = jest.spyOn(userRepo, 'findById');

        const user = userRepo.findById(1);

        expect(user.name).toBe('John');
        expect(findByIdSpy).toHaveBeenCalledWith(1);

        // Can also stub the spy
        findByIdSpy.mockReturnValue({ id: 2, name: 'Jane' });
        expect(userRepo.findById(1)).toEqual({ id: 2, name: 'Jane' });
    });

    test('should spy on class methods', () => {
        class Calculator {
            add(a, b) {
                return a + b;
            }
        }

        const calc = new Calculator();
        const addSpy = jest.spyOn(calc, 'add');

        calc.add(2, 3);

        expect(addSpy).toHaveBeenCalledWith(2, 3);
        expect(addSpy).toHaveReturnedWith(5);
    });
});
```

### Mock Implementation

```javascript
test('should use custom implementation', () => {
    mockUserRepository.save.mockImplementation((user) => {
        return {
            ...user,
            id: Math.random(),
            createdAt: new Date()
        };
    });

    const user = mockUserRepository.save({ email: 'john@example.com' });

    expect(user.id).toBeDefined();
    expect(user.createdAt).toBeDefined();
});
```

## JavaScript - testdouble.js

testdouble.js is an alternative to Jest mocks with a more opinionated API focused on test-driven development.

### Setup

```bash
npm install --save-dev testdouble
```

### Creating Test Doubles

```javascript
const td = require('testdouble');

describe('UserService with testdouble', () => {
    let userRepository;
    let emailService;
    let userService;

    beforeEach(() => {
        // Create test doubles
        userRepository = td.object(['findById', 'save', 'delete']);
        emailService = td.object(['sendWelcomeEmail', 'sendPasswordReset']);

        const UserService = require('./userService');
        userService = new UserService(userRepository, emailService);
    });

    afterEach(() => {
        // Clean up
        td.reset();
    });

    test('should create user', async () => {
        // Arrange - Stub the double
        const mockUser = { id: 1, email: 'john@example.com' };
        td.when(userRepository.save(td.matchers.anything()))
            .thenResolve(mockUser);

        // Act
        const result = await userService.createUser('john@example.com', 'John');

        // Assert
        expect(result).toEqual(mockUser);
        td.verify(userRepository.save(td.matchers.contains({
            email: 'john@example.com'
        })));
    });
});
```

### Stubbing with testdouble

```javascript
describe('Stubbing with testdouble', () => {
    test('should stub method calls', () => {
        const calc = td.object(['add', 'subtract']);

        // Stub with specific arguments
        td.when(calc.add(2, 3)).thenReturn(5);
        td.when(calc.add(5, 5)).thenReturn(10);

        expect(calc.add(2, 3)).toBe(5);
        expect(calc.add(5, 5)).toBe(10);
    });

    test('should use matchers', () => {
        const repo = td.object(['findById']);

        // Match any number
        td.when(repo.findById(td.matchers.isA(Number)))
            .thenReturn({ id: 1, name: 'User' });

        expect(repo.findById(1).name).toBe('User');
        expect(repo.findById(999).name).toBe('User');
    });

    test('should handle async', async () => {
        const api = td.object(['fetchUser']);

        td.when(api.fetchUser(1))
            .thenResolve({ id: 1, name: 'John' });

        const user = await api.fetchUser(1);
        expect(user.name).toBe('John');
    });

    test('should throw errors', () => {
        const service = td.object(['process']);

        td.when(service.process('invalid'))
            .thenThrow(new Error('Invalid input'));

        expect(() => service.process('invalid')).toThrow('Invalid input');
    });
});
```

### Verification with testdouble

```javascript
describe('Verification', () => {
    test('should verify method was called', () => {
        const logger = td.object(['log', 'error']);

        logger.log('Hello');
        logger.log('World');

        // Verify exact call
        td.verify(logger.log('Hello'));
        td.verify(logger.log('World'));

        // Verify with matchers
        td.verify(logger.log(td.matchers.isA(String)), { times: 2 });
    });

    test('should verify call count', () => {
        const service = td.object(['notify']);

        service.notify('user1');
        service.notify('user2');
        service.notify('user3');

        td.verify(service.notify(td.matchers.anything()), { times: 3 });
    });

    test('should verify never called', () => {
        const emailService = td.object(['send']);

        // Verify method was never called
        td.verify(emailService.send(td.matchers.anything()), { times: 0 });
    });
});
```

### Replacing Dependencies

```javascript
describe('Replacing modules', () => {
    test('should replace module dependency', () => {
        // Replace the module
        td.replace('./userRepository');
        const UserRepository = require('./userRepository');

        // Now UserRepository is a test double
        const repo = new UserRepository();
        td.when(repo.findAll()).thenReturn([]);

        expect(repo.findAll()).toEqual([]);
    });

    afterEach(() => {
        td.reset();
    });
});
```

## TypeScript - Jest with Type Safety

TypeScript adds type safety to your tests, catching errors at compile time.

### Setup

```bash
npm install --save-dev jest @types/jest ts-jest
```

```typescript
// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node'
};
```

### Type-Safe Mocks

```typescript
// userService.test.ts
import { UserRepository } from './userRepository';
import { EmailService } from './emailService';
import { UserService } from './userService';

// Mock modules
jest.mock('./userRepository');
jest.mock('./emailService');

describe('UserService', () => {
    let userService: UserService;
    let mockUserRepository: jest.Mocked<UserRepository>;
    let mockEmailService: jest.Mocked<EmailService>;

    beforeEach(() => {
        // Create typed mocks
        mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
        mockEmailService = new EmailService() as jest.Mocked<EmailService>;

        userService = new UserService(mockUserRepository, mockEmailService);
    });

    test('should create user', async () => {
        const mockUser: User = {
            id: 1,
            email: 'john@example.com',
            name: 'John'
        };

        mockUserRepository.save.mockResolvedValue(mockUser);

        const result = await userService.createUser('john@example.com', 'John');

        expect(result).toEqual(mockUser);
        expect(mockUserRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                email: 'john@example.com',
                name: 'John'
            })
        );
    });
});
```

### Manual Typed Mocks

```typescript
// __mocks__/userRepository.ts
import { User } from '../types';

export class UserRepository {
    findById = jest.fn<Promise<User | null>, [number]>();
    save = jest.fn<Promise<User>, [User]>();
    delete = jest.fn<Promise<void>, [number]>();
    findAll = jest.fn<Promise<User[]>, []>();
}
```

### Type-Safe Mock Functions

```typescript
describe('Type-Safe Mocks', () => {
    test('should use typed mock function', () => {
        // Explicitly typed mock
        const mockFn = jest.fn<string, [number, string]>();

        mockFn.mockReturnValue('result');

        const result = mockFn(1, 'test');

        expect(result).toBe('result');
        expect(mockFn).toHaveBeenCalledWith(1, 'test');
    });

    test('should mock interface', () => {
        interface Logger {
            log(message: string): void;
            error(message: string, error: Error): void;
        }

        const mockLogger: jest.Mocked<Logger> = {
            log: jest.fn(),
            error: jest.fn()
        };

        mockLogger.log('Hello');
        mockLogger.error('Error occurred', new Error('test'));

        expect(mockLogger.log).toHaveBeenCalledWith('Hello');
        expect(mockLogger.error).toHaveBeenCalledWith(
            'Error occurred',
            expect.any(Error)
        );
    });
});
```

### Partial Mocks

```typescript
describe('Partial Mocks', () => {
    test('should create partial mock', () => {
        const partialUser: Partial<User> = {
            email: 'john@example.com'
        };

        mockUserRepository.save.mockResolvedValue(partialUser as User);

        // TypeScript knows this is a User
        const user = await userService.createUser('john@example.com', 'John');
        expect(user.email).toBe('john@example.com');
    });

    test('should use Pick utility type', () => {
        type UserDTO = Pick<User, 'email' | 'name'>;

        const dto: UserDTO = {
            email: 'john@example.com',
            name: 'John'
        };

        mockUserRepository.save.mockImplementation(async (user: User) => ({
            ...user,
            id: 1
        }));
    });
});
```

### Spying with TypeScript

```typescript
describe('Spying', () => {
    test('should spy on class method', () => {
        class Calculator {
            add(a: number, b: number): number {
                return a + b;
            }

            multiply(a: number, b: number): number {
                return a * b;
            }
        }

        const calc = new Calculator();
        const addSpy = jest.spyOn(calc, 'add');

        calc.add(2, 3);

        expect(addSpy).toHaveBeenCalledWith(2, 3);
        expect(addSpy).toHaveReturnedWith(5);

        // TypeScript ensures type safety
        // calc.add('2', '3');  // ❌ Compile error
    });
});
```

## TypeScript - testdouble

```typescript
import * as td from 'testdouble';
import { UserRepository } from './userRepository';
import { User } from './types';

describe('UserService with testdouble', () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = td.object<UserRepository>();
    });

    afterEach(() => {
        td.reset();
    });

    test('should find user by id', async () => {
        const mockUser: User = {
            id: 1,
            email: 'john@example.com',
            name: 'John'
        };

        td.when(userRepository.findById(1)).thenResolve(mockUser);

        const result = await userRepository.findById(1);

        expect(result).toEqual(mockUser);
    });

    test('should verify with matchers', () => {
        const logger = td.object<{ log: (msg: string) => void }>();

        logger.log('Hello');

        td.verify(logger.log(td.matchers.isA(String)));
    });
});
```

## Best Practices

### 1. Mock at the Boundaries

```java
// ✅ Good - Mock external dependencies
@Test
void shouldProcessPayment() {
    PaymentGateway mockGateway = mock(PaymentGateway.class);
    when(mockGateway.charge(any())).thenReturn(true);

    PaymentService service = new PaymentService(mockGateway);
    assertTrue(service.processPayment(order));
}

// ❌ Bad - Mocking internal classes
@Test
void shouldCalculateTotal() {
    OrderCalculator mockCalc = mock(OrderCalculator.class);
    // Testing implementation details
}
```

### 2. Don't Mock What You Don't Own

```javascript
// ❌ Bad - Mocking third-party library
const axios = require('axios');
jest.mock('axios');

// ✅ Good - Create wrapper and mock your wrapper
class HttpClient {
    async get(url) {
        return axios.get(url);
    }
}

const mockHttpClient = {
    get: jest.fn()
};
```

### 3. Use Fakes for Complex Logic

```typescript
// ✅ Good - Fake implementation
class InMemoryUserRepository implements UserRepository {
    private users: Map<number, User> = new Map();

    async save(user: User): Promise<User> {
        const id = this.users.size + 1;
        const savedUser = { ...user, id };
        this.users.set(id, savedUser);
        return savedUser;
    }

    async findById(id: number): Promise<User | null> {
        return this.users.get(id) || null;
    }
}

// Use in tests
test('should create and retrieve user', async () => {
    const repo = new InMemoryUserRepository();
    const service = new UserService(repo);

    const created = await service.createUser('john@example.com', 'John');
    const found = await service.getUserById(created.id);

    expect(found).toEqual(created);
});
```

### 4. Keep Tests Readable

```java
// ✅ Good - Clear and readable
@Test
void shouldRejectInvalidEmail() {
    EmailValidator mockValidator = mock(EmailValidator.class);
    when(mockValidator.isValid("invalid")).thenReturn(false);

    UserService service = new UserService(mockValidator);

    assertThrows(ValidationException.class, () -> {
        service.registerUser("invalid", "password");
    });
}
```

### 5. Reset Mocks Between Tests

```javascript
// ✅ Good - Reset in beforeEach
beforeEach(() => {
    jest.clearAllMocks();
    // or jest.resetAllMocks();
});

// TypeScript + testdouble
afterEach(() => {
    td.reset();
});
```

## Common Patterns

### Repository Pattern Testing

```java
@Test
void shouldCacheUserLookup() {
    UserRepository mockRepo = mock(UserRepository.class);
    Cache mockCache = mock(Cache.class);

    User user = new User(1L, "john@example.com");
    when(mockCache.get("user:1")).thenReturn(null);
    when(mockRepo.findById(1L)).thenReturn(Optional.of(user));

    CachedUserRepository cachedRepo = new CachedUserRepository(mockRepo, mockCache);
    User result = cachedRepo.findById(1L);

    verify(mockCache).get("user:1");
    verify(mockRepo).findById(1L);
    verify(mockCache).put("user:1", user);
}
```

### Service Layer Testing

```typescript
describe('OrderService', () => {
    test('should create order and send notification', async () => {
        const mockOrderRepo: jest.Mocked<OrderRepository> = {
            save: jest.fn()
        };

        const mockNotificationService: jest.Mocked<NotificationService> = {
            sendOrderConfirmation: jest.fn()
        };

        const order: Order = {
            id: 1,
            items: [{ productId: 1, quantity: 2 }],
            total: 100
        };

        mockOrderRepo.save.mockResolvedValue(order);

        const service = new OrderService(mockOrderRepo, mockNotificationService);
        const result = await service.createOrder(order);

        expect(mockOrderRepo.save).toHaveBeenCalledWith(order);
        expect(mockNotificationService.sendOrderConfirmation)
            .toHaveBeenCalledWith(order);
    });
});
```

## Comparison: Mocking Frameworks

| Feature | Mockito (Java) | Jest (JS/TS) | testdouble.js |
|---------|---------------|-------------|----------------|
| Setup Complexity | Medium | Low | Low |
| Type Safety (TS) | N/A | Good | Good |
| API Style | Fluent | Simple | Explicit |
| Spy Support | ✅ | ✅ | ✅ |
| Argument Matchers | ✅ | ✅ | ✅ |
| Built-in Runner | ❌ | ✅ | ❌ |
| Verification | Explicit | Explicit | Explicit |
| Learning Curve | Medium | Low | Low |
| Community | Large | Very Large | Medium |

## Summary

**Test Doubles** are essential for:
- Isolating code under test
- Controlling dependencies
- Speeding up tests
- Making tests deterministic

**Choose the right tool:**
- **Java**: Mockito (standard choice)
- **JavaScript**: Jest (built-in, simple)
- **TypeScript**: Jest with types (best type safety)
- **TDD-focused**: testdouble.js (explicit, opinionated)

**Key Takeaway:** Mock external dependencies, not your own code. Use fakes for complex logic, mocks for verification, and stubs for simple return values.

## Next Steps

- **[Testing Fundamentals](./testing-basics)** - Core testing concepts
- **[TDD Guide](./tdd)** - Write tests first with mocks
- **[JUnit 5 Guide](./junit5)** - Java testing framework
- **[JUnit 5 Advanced](./junit5)** - Advanced testing patterns
