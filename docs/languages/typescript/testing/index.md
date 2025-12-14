---
sidebar_position: 3
---

# Testing

Write type-safe, reliable tests for your TypeScript applications using modern testing frameworks that leverage TypeScript's type system.

## What's Covered

This section covers testing frameworks, methodologies, and best practices for testing TypeScript code, including how to leverage static typing for better test quality and maintainability.

## Why Testing TypeScript is Different

### Type Safety Advantages
- Catch type errors at compile time, not test time
- Autocomplete and IntelliSense in tests
- Refactor with confidence
- Self-documenting test expectations

### Testing Challenges
- Configure test runners for TypeScript
- Handle type definitions for mocks
- Test type guards and assertions
- Balance type safety with test flexibility

## Testing TypeScript Code

### Type-Safe Test Setup
TypeScript provides additional safety in your tests:

```typescript
// Types ensure correct test data
interface User {
  id: number;
  name: string;
  email: string;
}

// Test with type safety
test('creates user', () => {
  const user: User = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com'
  };

  const result = createUser(user);
  expect(result.success).toBe(true);
});
```

### Mocking with Types
TypeScript ensures mocks match the real interfaces:

```typescript
// Define interface
interface UserService {
  getUser(id: number): Promise<User>;
  saveUser(user: User): Promise<void>;
}

// Type-safe mock
const mockUserService: jest.Mocked<UserService> = {
  getUser: jest.fn(),
  saveUser: jest.fn()
};

// TypeScript ensures we mock correctly
mockUserService.getUser.mockResolvedValue({
  id: 1,
  name: 'Test',
  email: 'test@example.com'
});
```

## Testing Frameworks for TypeScript

### [Mocha + Chai](./mocha-chai)
Flexible testing framework with BDD/TDD assertion styles.

**Key Features:**
- Highly configurable test framework
- Multiple assertion styles (BDD and TDD)
- Browser and Node.js support
- Rich plugin ecosystem
- First-class TypeScript support

**Use Cases:**
- Projects requiring custom test configurations
- Teams preferring BDD-style assertions
- Browser and Node.js testing

**[Read Mocha + Chai Guide →](./mocha-chai)**

### [Cypress](./cypress)
Next-generation end-to-end testing framework.

**Key Features:**
- First-class TypeScript support
- Real browser testing with time travel debugging
- Automatic waiting and retries
- Network stubbing and API testing
- Component testing support

**Use Cases:**
- End-to-end web application testing
- Integration testing of UI components
- API testing
- Visual regression testing

**[Read Cypress Guide →](./cypress)**

### [Jest with ts-jest](./jest)
Industry-standard testing framework with first-class TypeScript support.

**Key Features:**
- Zero configuration for most projects
- All-in-one: test runner, assertions, mocking, coverage
- Type-safe mocks with jest.Mocked&lt;T&gt;
- Snapshot testing
- Extensive ecosystem and community

**Use Cases:**
- React and Vue applications
- Node.js applications
- Any TypeScript/JavaScript project
- Unit and integration testing

**[Read Jest Guide →](./jest)**

### [Vitest](./vitest)
Blazing fast unit test framework powered by Vite.

**Key Features:**
- Extremely fast (10-100x faster than Jest)
- Native TypeScript and ESM support
- Jest-compatible API (easy migration)
- Built-in component testing
- Hot module replacement for tests

**Use Cases:**
- Modern TypeScript/JavaScript projects
- Vite-based applications
- Projects using ES modules
- Migration from Jest

**[Read Vitest Guide →](./vitest)**

### Testing Library
Type-safe DOM testing for TypeScript applications.

**Key Features:**
- TypeScript type definitions included
- Framework-specific libraries (React, Vue, etc.)
- User-centric testing approach
- Encourages accessibility best practices
- Works with Jest or Vitest

## Testing TypeScript-Specific Features

### Testing Type Guards
```typescript
// Type guard function
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
}

// Test the type guard
test('isUser validates user objects', () => {
  const validUser = { id: 1, name: 'Test', email: 'test@example.com' };
  const invalidUser = { id: 1, name: 'Test' }; // missing email

  expect(isUser(validUser)).toBe(true);
  expect(isUser(invalidUser)).toBe(false);
  expect(isUser(null)).toBe(false);
  expect(isUser('string')).toBe(false);
});
```

### Testing Generic Functions
```typescript
// Generic function
function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

// Test with different types
test('toArray handles various types', () => {
  expect(toArray(5)).toEqual([5]);
  expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
  expect(toArray('hello')).toEqual(['hello']);
  expect(toArray(['a', 'b'])).toEqual(['a', 'b']);
});
```

### Testing Enums
```typescript
enum Status {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

function getStatusColor(status: Status): string {
  switch (status) {
    case Status.Pending: return 'yellow';
    case Status.Active: return 'green';
    case Status.Completed: return 'blue';
  }
}

test('getStatusColor returns correct colors', () => {
  expect(getStatusColor(Status.Pending)).toBe('yellow');
  expect(getStatusColor(Status.Active)).toBe('green');
  expect(getStatusColor(Status.Completed)).toBe('blue');
});
```

### Testing Classes
```typescript
class UserRepository {
  private users: Map<number, User> = new Map();

  add(user: User): void {
    this.users.set(user.id, user);
  }

  get(id: number): User | undefined {
    return this.users.get(id);
  }

  getAll(): User[] {
    return Array.from(this.users.values());
  }
}

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  test('adds and retrieves users', () => {
    const user: User = { id: 1, name: 'Test', email: 'test@example.com' };

    repository.add(user);
    const retrieved = repository.get(1);

    expect(retrieved).toEqual(user);
  });

  test('getAll returns all users', () => {
    const user1: User = { id: 1, name: 'User 1', email: 'user1@example.com' };
    const user2: User = { id: 2, name: 'User 2', email: 'user2@example.com' };

    repository.add(user1);
    repository.add(user2);

    expect(repository.getAll()).toHaveLength(2);
  });
});
```

## Best Practices

### Use Type Definitions
Always define types for test data:

```typescript
// Good - type-safe
const testUser: User = {
  id: 1,
  name: 'Test',
  email: 'test@example.com'
};

// Bad - no type safety
const testUser = {
  id: 1,
  name: 'Test',
  email: 'test@example.com'
};
```

### Mock External Dependencies
Use typed mocks:

```typescript
// Create type-safe mock
const mockApiClient: jest.Mocked<ApiClient> = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
};

// Mock implementation with types
mockApiClient.get.mockResolvedValue<User>({
  id: 1,
  name: 'Test',
  email: 'test@example.com'
});
```

### Test Error Cases
TypeScript helps catch error scenarios:

```typescript
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

test('divide throws on division by zero', () => {
  expect(() => divide(10, 0)).toThrow('Division by zero');
});

test('divide returns correct result', () => {
  expect(divide(10, 2)).toBe(5);
});
```

### Use Test Utilities
Create type-safe test helpers:

```typescript
// Test factory function
function createTestUser(overrides?: Partial<User>): User {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    ...overrides
  };
}

// Use in tests
test('user with custom email', () => {
  const user = createTestUser({ email: 'custom@example.com' });
  expect(user.email).toBe('custom@example.com');
});
```

## Configuration Tips

### tsconfig.json for Tests
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["jest", "node"]
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Separate Test Config
```json
// tsconfig.test.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["jest", "node"]
  },
  "include": ["src/**/*", "**/*.test.ts", "**/*.spec.ts"]
}
```

## Testing Philosophy

Effective TypeScript tests:
- **Leverage Types** - Use TypeScript's type system to catch errors
- **Type-Safe Mocks** - Ensure mocks match real implementations
- **Test Types** - Validate type guards and generic functions
- **Fast** - Run quickly with proper configuration
- **Maintainable** - Easy to update when types change

## Getting Started

### Quick Setup with Jest

```bash
# Install dependencies
npm install --save-dev jest ts-jest @types/jest typescript

# Initialize ts-jest
npx ts-jest config:init

# Add test script
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Your First TypeScript Test

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// math.test.ts
import { add } from './math';

test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});

// TypeScript will catch this error at compile time
// test('type error', () => {
//   expect(add('2', '3')).toBe(5); // Error: Argument of type 'string' is not assignable
// });
```

## Next Steps

After mastering TypeScript testing, explore:
- **Advanced Mocking** - Mock complex types and interfaces
- **E2E Testing** - Playwright with TypeScript
- **Component Testing** - Test React/Vue components with types
- **API Testing** - Type-safe API integration tests
- **Test-Driven Development** - Write types and tests first
- **Property-Based Testing** - Fast-check for TypeScript

## Related Topics

- [TypeScript Fundamentals](../fundamentals/) - Core TypeScript concepts
- [TypeScript Build Tools](../build-tools/) - Configure TypeScript compiler
- [JavaScript Testing](../../javascript/testing/) - JavaScript testing basics
