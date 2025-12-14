---
sidebar_position: 3
---

# Jest with TypeScript

Jest is a delightful JavaScript testing framework with a focus on simplicity. With ts-jest, it provides first-class TypeScript support, making it the industry standard for testing TypeScript applications.

## Why Jest for TypeScript?

### Strengths
- **Zero Configuration** - Works out of the box for most projects
- **All-in-One** - Test runner, assertions, mocking, and coverage in one package
- **Snapshot Testing** - Capture and compare component snapshots
- **Great DX** - Watch mode, parallel execution, clear error messages
- **Type Safety** - Full TypeScript support with jest.Mocked&lt;T&gt;
- **Rich Ecosystem** - Extensive community plugins and integrations

### Use Cases
- React and Vue applications
- Node.js applications
- API and backend testing
- Unit and integration testing
- Any TypeScript/JavaScript project

## Installation

```bash
# Install Jest and TypeScript support
npm install --save-dev jest ts-jest @types/jest typescript

# Initialize Jest with TypeScript
npx ts-jest config:init
```

## Configuration

### jest.config.js
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### jest.config.ts (TypeScript Config)
```typescript
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

export default config;
```

### package.json Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:verbose": "jest --verbose"
  }
}
```

### tsconfig.json
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
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Basic Examples

### Simple Unit Tests

```typescript
// src/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// src/math.test.ts
import { add, subtract, multiply, divide } from './math';

describe('Math utilities', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds negative numbers', () => {
      expect(add(-5, -3)).toBe(-8);
    });

    test('adds zero', () => {
      expect(add(10, 0)).toBe(10);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(subtract(10, 3)).toBe(7);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('throws error on division by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });
  });
});
```

## Type-Safe Testing

### Testing with Interfaces

```typescript
// src/types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  update(id: number, data: Partial<User>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
}

// src/userRepository.ts
export class InMemoryUserRepository implements UserRepository {
  private users = new Map<number, User>();
  private nextId = 1;

  async findById(id: number): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user: User = {
      ...userData,
      id: this.nextId++,
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;

    const updated = { ...user, ...data };
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    return this.users.delete(id);
  }
}

// src/userRepository.test.ts
import { InMemoryUserRepository } from './userRepository';
import { User } from './types';

describe('InMemoryUserRepository', () => {
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
  });

  describe('create', () => {
    test('creates a new user with generated ID and timestamp', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user' as const
      };

      const user = await repository.create(userData);

      expect(user).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      });
      expect(user.id).toBe(1);
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    test('assigns unique IDs to users', async () => {
      const user1 = await repository.create({
        name: 'User 1',
        email: 'user1@example.com',
        role: 'user'
      });
      const user2 = await repository.create({
        name: 'User 2',
        email: 'user2@example.com',
        role: 'admin'
      });

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });
  });

  describe('findById', () => {
    test('returns user when found', async () => {
      const created = await repository.create({
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      });

      const found = await repository.findById(created.id);

      expect(found).toEqual(created);
    });

    test('returns null when user not found', async () => {
      const result = await repository.findById(999);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    test('updates user fields', async () => {
      const user = await repository.create({
        name: 'Original Name',
        email: 'original@example.com',
        role: 'user'
      });

      const updated = await repository.update(user.id, {
        name: 'Updated Name'
      });

      expect(updated).not.toBeNull();
      expect(updated!.name).toBe('Updated Name');
      expect(updated!.email).toBe('original@example.com');
    });

    test('returns null for non-existent user', async () => {
      const result = await repository.update(999, { name: 'Test' });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    test('deletes existing user', async () => {
      const user = await repository.create({
        name: 'To Delete',
        email: 'delete@example.com',
        role: 'user'
      });

      const deleted = await repository.delete(user.id);
      expect(deleted).toBe(true);

      const found = await repository.findById(user.id);
      expect(found).toBeNull();
    });

    test('returns false for non-existent user', async () => {
      const result = await repository.delete(999);
      expect(result).toBe(false);
    });
  });
});
```

## Mocking with TypeScript

### Type-Safe Mocks with jest.Mocked

```typescript
// src/services/userService.ts
import { UserRepository, User } from '../types';

export class UserService {
  constructor(private repository: UserRepository) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    return user;
  }

  async registerUser(
    data: Omit<User, 'id' | 'createdAt'>
  ): Promise<User> {
    // Validate email
    if (!data.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    return this.repository.create(data);
  }
}

// src/services/userService.test.ts
import { UserService } from './userService';
import { UserRepository, User } from '../types';

// Create a mock repository with proper typing
const mockRepository: jest.Mocked<UserRepository> = {
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService(mockRepository);
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    test('returns user when found', async () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: new Date()
      };

      mockRepository.findById.mockResolvedValue(mockUser);

      const result = await service.getUserById(1);

      expect(result).toEqual(mockUser);
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    });

    test('throws error when user not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.getUserById(999)).rejects.toThrow(
        'User 999 not found'
      );
    });
  });

  describe('registerUser', () => {
    test('creates user with valid data', async () => {
      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: 'user' as const
      };

      const mockCreatedUser: User = {
        ...userData,
        id: 1,
        createdAt: new Date()
      };

      mockRepository.create.mockResolvedValue(mockCreatedUser);

      const result = await service.registerUser(userData);

      expect(result).toEqual(mockCreatedUser);
      expect(mockRepository.create).toHaveBeenCalledWith(userData);
    });

    test('throws error for invalid email', async () => {
      const userData = {
        name: 'Invalid User',
        email: 'notanemail',
        role: 'user' as const
      };

      await expect(service.registerUser(userData)).rejects.toThrow(
        'Invalid email format'
      );

      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });
});
```

### Mocking Modules

```typescript
// src/api/client.ts
export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// src/api/client.test.ts
import { fetchUser } from './client';

// Mock the global fetch
global.fetch = jest.fn();

describe('fetchUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches user successfully', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user' as const,
      createdAt: new Date()
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUser
    });

    const result = await fetchUser(1);

    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
  });

  test('throws error on failed request', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404
    });

    await expect(fetchUser(999)).rejects.toThrow('HTTP error! status: 404');
  });
});
```

## Testing Async Code

```typescript
// src/async.ts
export async function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve('data'), 100);
  });
}

export async function fetchWithError(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Failed to fetch')), 100);
  });
}

// src/async.test.ts
import { fetchData, fetchWithError } from './async';

describe('Async functions', () => {
  test('resolves with data', async () => {
    const result = await fetchData();
    expect(result).toBe('data');
  });

  test('handles promise rejection', async () => {
    await expect(fetchWithError()).rejects.toThrow('Failed to fetch');
  });

  test('using done callback', (done) => {
    fetchData().then((result) => {
      expect(result).toBe('data');
      done();
    });
  });

  test('using resolves matcher', () => {
    return expect(fetchData()).resolves.toBe('data');
  });
});
```

## Testing Type Guards and Generics

### Type Guards

```typescript
// src/guards.ts
export interface Dog {
  kind: 'dog';
  bark(): void;
}

export interface Cat {
  kind: 'cat';
  meow(): void;
}

export type Animal = Dog | Cat;

export function isDog(animal: Animal): animal is Dog {
  return animal.kind === 'dog';
}

export function isCat(animal: Animal): animal is Cat {
  return animal.kind === 'cat';
}

// src/guards.test.ts
import { isDog, isCat, Dog, Cat } from './guards';

describe('Animal type guards', () => {
  const dog: Dog = {
    kind: 'dog',
    bark: jest.fn()
  };

  const cat: Cat = {
    kind: 'cat',
    meow: jest.fn()
  };

  test('isDog identifies dogs', () => {
    expect(isDog(dog)).toBe(true);
    expect(isDog(cat)).toBe(false);
  });

  test('isCat identifies cats', () => {
    expect(isCat(cat)).toBe(true);
    expect(isCat(dog)).toBe(false);
  });
});
```

### Generic Functions

```typescript
// src/generics.ts
export function identity<T>(value: T): T {
  return value;
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// src/generics.test.ts
import { identity, toArray, first } from './generics';

describe('Generic functions', () => {
  describe('identity', () => {
    test('returns the same value for numbers', () => {
      expect(identity(42)).toBe(42);
    });

    test('returns the same value for strings', () => {
      expect(identity('hello')).toBe('hello');
    });

    test('returns the same object reference', () => {
      const obj = { a: 1 };
      expect(identity(obj)).toBe(obj);
    });
  });

  describe('toArray', () => {
    test('wraps single value in array', () => {
      expect(toArray(5)).toEqual([5]);
      expect(toArray('hello')).toEqual(['hello']);
    });

    test('returns array as-is', () => {
      expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('first', () => {
    test('returns first element', () => {
      expect(first([1, 2, 3])).toBe(1);
      expect(first(['a', 'b'])).toBe('a');
    });

    test('returns undefined for empty array', () => {
      expect(first([])).toBeUndefined();
    });
  });
});
```

## Snapshot Testing

```typescript
// src/formatUser.ts
import { User } from './types';

export function formatUserProfile(user: User): string {
  return `
    User Profile
    ------------
    ID: ${user.id}
    Name: ${user.name}
    Email: ${user.email}
    Role: ${user.role}
    Created: ${user.createdAt.toISOString()}
  `;
}

// src/formatUser.test.ts
import { formatUserProfile } from './formatUser';
import { User } from './types';

describe('formatUserProfile', () => {
  test('formats user profile correctly', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: new Date('2024-01-01T00:00:00.000Z')
    };

    expect(formatUserProfile(user)).toMatchInlineSnapshot(`
      "
          User Profile
          ------------
          ID: 1
          Name: John Doe
          Email: john@example.com
          Role: user
          Created: 2024-01-01T00:00:00.000Z
        "
    `);
  });
});
```

## Setup and Teardown

```typescript
describe('Database operations', () => {
  let db: Database;

  // Runs once before all tests in this describe block
  beforeAll(async () => {
    db = await connectToDatabase();
  });

  // Runs before each test
  beforeEach(async () => {
    await db.clear();
  });

  // Runs after each test
  afterEach(async () => {
    await db.clearCache();
  });

  // Runs once after all tests
  afterAll(async () => {
    await db.disconnect();
  });

  test('inserts data', async () => {
    await db.insert({ id: 1, name: 'Test' });
    const result = await db.findById(1);
    expect(result).toBeDefined();
  });
});
```

## Code Coverage

### Collecting Coverage

```bash
# Run tests with coverage
npm test -- --coverage

# Coverage with specific reporters
npm test -- --coverage --coverageReporters=text --coverageReporters=html

# Watch mode with coverage
npm test -- --watch --coverage
```

### Coverage Thresholds

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/critical/**/*.ts': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
};
```

## Best Practices

### 1. Use Descriptive Test Names

```typescript
// Good
test('should throw error when email is invalid', () => {});

// Better
test('registerUser throws ValidationError when email is missing @ symbol', () => {});
```

### 2. Organize Tests with describe Blocks

```typescript
describe('UserService', () => {
  describe('authentication', () => {
    test('authenticates valid credentials', () => {});
    test('rejects invalid credentials', () => {});
  });

  describe('registration', () => {
    test('creates new user', () => {});
    test('prevents duplicate emails', () => {});
  });
});
```

### 3. Use Test Factories

```typescript
function createTestUser(overrides?: Partial<User>): User {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    createdAt: new Date(),
    ...overrides
  };
}

test('updates user name', () => {
  const user = createTestUser({ name: 'Custom Name' });
  expect(user.name).toBe('Custom Name');
});
```

### 4. Avoid Test Interdependence

```typescript
// Bad - tests depend on each other
let sharedUser: User;
test('creates user', () => {
  sharedUser = createUser();
});
test('updates user', () => {
  updateUser(sharedUser); // Depends on previous test
});

// Good - each test is independent
test('creates user', () => {
  const user = createUser();
  expect(user).toBeDefined();
});
test('updates user', () => {
  const user = createUser();
  updateUser(user);
  expect(user.updated).toBe(true);
});
```

## Common Jest Matchers

```typescript
// Equality
expect(value).toBe(5);                    // Strict equality (===)
expect(obj).toEqual({ a: 1 });            // Deep equality
expect(value).toStrictEqual({ a: 1 });    // Strict deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(10);
expect(value).toBeGreaterThanOrEqual(10);
expect(value).toBeLessThan(100);
expect(value).toBeCloseTo(0.3, 5);        // Floating point

// Strings
expect(str).toMatch(/regex/);
expect(str).toContain('substring');

// Arrays and Iterables
expect(arr).toContain(item);
expect(arr).toHaveLength(3);
expect(arr).toContainEqual({ a: 1 });

// Objects
expect(obj).toHaveProperty('key');
expect(obj).toHaveProperty('key', 'value');
expect(obj).toMatchObject({ a: 1 });

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow(Error);
expect(() => fn()).toThrow('message');

// Promises
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();

// Mock functions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenLastCalledWith(arg);
```

## Related Topics

- [TypeScript Testing Overview](./index.md) - Testing framework comparison
- [Vitest Testing](./vitest.md) - Next-generation testing with Vitest
- [Mocha + Chai Testing](./mocha-chai.md) - BDD/TDD style testing
- [Cypress E2E Testing](./cypress.md) - End-to-end testing
- [TypeScript Fundamentals](../fundamentals/) - Core TypeScript concepts
