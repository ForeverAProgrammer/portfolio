---
sidebar_position: 1
---

# Mocha + Chai Testing

Mocha is a flexible JavaScript test framework, and Chai is a BDD/TDD assertion library. Together they provide a powerful, highly configurable testing solution for TypeScript applications.

## Why Mocha + Chai for TypeScript?

### Strengths
- **Flexibility** - Choose your own assertion library, mocking tools
- **Multiple Styles** - BDD (should/expect) and TDD (assert) styles
- **Browser Support** - Runs in both Node.js and browsers
- **Async Support** - First-class promise and async/await support
- **Rich Ecosystem** - Extensive plugin ecosystem
- **TypeScript Support** - Type definitions available

### Use Cases
- Projects requiring custom test configurations
- Teams preferring BDD-style assertions
- Browser and Node.js testing
- Migrating from older test frameworks
- Projects needing specific reporters

## Installation

```bash
# Install Mocha, Chai, and TypeScript support
npm install --save-dev mocha chai @types/mocha @types/chai

# Install ts-node to run TypeScript tests
npm install --save-dev ts-node

# Optional: Chai plugins
npm install --save-dev @types/chai-as-promised  # For promise assertions
```

## Configuration

### package.json
```json
{
  "scripts": {
    "test": "mocha --require ts-node/register 'tests/**/*.test.ts'",
    "test:watch": "mocha --require ts-node/register --watch --watch-files 'src/**/*.ts,tests/**/*.test.ts' 'tests/**/*.test.ts'",
    "test:coverage": "nyc mocha --require ts-node/register 'tests/**/*.test.ts'"
  }
}
```

### .mocharc.json
```json
{
  "require": ["ts-node/register"],
  "extensions": ["ts"],
  "spec": ["tests/**/*.test.ts"],
  "watch-files": ["src/**/*.ts", "tests/**/*.test.ts"],
  "timeout": 3000
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
    "types": ["mocha", "chai", "node"]
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}
```

## Basic Examples

### Simple Unit Test

```typescript
// src/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// tests/math.test.ts
import { expect } from 'chai';
import { add, multiply } from '../src/math';

describe('Math utilities', () => {
  describe('add()', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).to.equal(5);
    });

    it('should handle negative numbers', () => {
      expect(add(-5, 3)).to.equal(-2);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).to.equal(5);
    });
  });

  describe('multiply()', () => {
    it('should multiply two numbers', () => {
      expect(multiply(3, 4)).to.equal(12);
    });

    it('should handle zero', () => {
      expect(multiply(5, 0)).to.equal(0);
    });
  });
});
```

### Assertion Styles

Chai supports multiple assertion styles:

```typescript
import { expect, assert, should } from 'chai';

describe('Assertion styles', () => {
  // Expect style (BDD) - most popular
  it('expect style', () => {
    const name = 'TypeScript';
    expect(name).to.be.a('string');
    expect(name).to.have.length(10);
    expect(name).to.include('Script');
  });

  // Assert style (TDD)
  it('assert style', () => {
    const value = 42;
    assert.typeOf(value, 'number');
    assert.equal(value, 42);
    assert.isAbove(value, 40);
  });

  // Should style (BDD) - requires initialization
  it('should style', () => {
    should();
    const arr = [1, 2, 3];
    arr.should.have.length(3);
    arr.should.include(2);
  });
});
```

## Type-Safe Testing

### Testing Interfaces

```typescript
// src/types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface UserService {
  getUser(id: number): User | undefined;
  createUser(data: Omit<User, 'id'>): User;
  updateUser(id: number, data: Partial<User>): User | undefined;
  deleteUser(id: number): boolean;
}

// src/userService.ts
export class UserServiceImpl implements UserService {
  private users: Map<number, User> = new Map();
  private nextId = 1;

  getUser(id: number): User | undefined {
    return this.users.get(id);
  }

  createUser(data: Omit<User, 'id'>): User {
    const user: User = { ...data, id: this.nextId++ };
    this.users.set(user.id, user);
    return user;
  }

  updateUser(id: number, data: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updated = { ...user, ...data };
    this.users.set(id, updated);
    return updated;
  }

  deleteUser(id: number): boolean {
    return this.users.delete(id);
  }
}

// tests/userService.test.ts
import { expect } from 'chai';
import { UserServiceImpl } from '../src/userService';
import { User } from '../src/types';

describe('UserService', () => {
  let service: UserServiceImpl;

  beforeEach(() => {
    service = new UserServiceImpl();
  });

  describe('createUser()', () => {
    it('should create a user with generated ID', () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user' as const
      };

      const user = service.createUser(userData);

      expect(user).to.have.property('id');
      expect(user.id).to.be.a('number');
      expect(user.name).to.equal('John Doe');
      expect(user.email).to.equal('john@example.com');
      expect(user.role).to.equal('user');
    });

    it('should assign unique IDs', () => {
      const user1 = service.createUser({
        name: 'User 1',
        email: 'user1@example.com',
        role: 'user'
      });
      const user2 = service.createUser({
        name: 'User 2',
        email: 'user2@example.com',
        role: 'admin'
      });

      expect(user1.id).to.not.equal(user2.id);
    });
  });

  describe('getUser()', () => {
    it('should retrieve existing user', () => {
      const created = service.createUser({
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      });

      const retrieved = service.getUser(created.id);

      expect(retrieved).to.deep.equal(created);
    });

    it('should return undefined for non-existent user', () => {
      const user = service.getUser(999);
      expect(user).to.be.undefined;
    });
  });

  describe('updateUser()', () => {
    it('should update user fields', () => {
      const created = service.createUser({
        name: 'Original Name',
        email: 'original@example.com',
        role: 'user'
      });

      const updated = service.updateUser(created.id, {
        name: 'Updated Name'
      });

      expect(updated).to.not.be.undefined;
      expect(updated!.name).to.equal('Updated Name');
      expect(updated!.email).to.equal('original@example.com'); // unchanged
    });

    it('should return undefined for non-existent user', () => {
      const result = service.updateUser(999, { name: 'Test' });
      expect(result).to.be.undefined;
    });
  });

  describe('deleteUser()', () => {
    it('should delete existing user', () => {
      const user = service.createUser({
        name: 'To Delete',
        email: 'delete@example.com',
        role: 'user'
      });

      const deleted = service.deleteUser(user.id);
      expect(deleted).to.be.true;

      const retrieved = service.getUser(user.id);
      expect(retrieved).to.be.undefined;
    });

    it('should return false for non-existent user', () => {
      const result = service.deleteUser(999);
      expect(result).to.be.false;
    });
  });
});
```

## Async Testing

### Testing Promises

```typescript
// src/api.ts
export interface Post {
  id: number;
  title: string;
  body: string;
}

export class ApiClient {
  async fetchPost(id: number): Promise<Post> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async createPost(data: Omit<Post, 'id'>): Promise<Post> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// tests/api.test.ts
import { expect } from 'chai';
import { ApiClient } from '../src/api';

describe('ApiClient', () => {
  let client: ApiClient;

  beforeEach(() => {
    client = new ApiClient();
  });

  describe('fetchPost()', () => {
    it('should fetch a post by ID', async () => {
      const post = await client.fetchPost(1);

      expect(post).to.be.an('object');
      expect(post).to.have.property('id', 1);
      expect(post).to.have.property('title');
      expect(post).to.have.property('body');
    });

    it('should throw error for invalid ID', async () => {
      try {
        await client.fetchPost(99999);
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });

  describe('createPost()', () => {
    it('should create a new post', async () => {
      const newPost = {
        title: 'Test Post',
        body: 'This is a test post'
      };

      const created = await client.createPost(newPost);

      expect(created).to.have.property('id');
      expect(created.title).to.equal(newPost.title);
      expect(created.body).to.equal(newPost.body);
    });
  });
});
```

### Using chai-as-promised

```typescript
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Promise assertions', () => {
  it('should eventually resolve', () => {
    const promise = Promise.resolve('success');
    return expect(promise).to.eventually.equal('success');
  });

  it('should be rejected', () => {
    const promise = Promise.reject(new Error('Failed'));
    return expect(promise).to.be.rejectedWith(Error, 'Failed');
  });

  it('should fulfill with expected value', async () => {
    const getData = async (): Promise<string> => {
      return 'data';
    };

    await expect(getData()).to.eventually.equal('data');
  });
});
```

## Testing Type Guards

```typescript
// src/guards.ts
export interface Circle {
  kind: 'circle';
  radius: number;
}

export interface Square {
  kind: 'square';
  sideLength: number;
}

export type Shape = Circle | Square;

export function isCircle(shape: Shape): shape is Circle {
  return shape.kind === 'circle';
}

export function isSquare(shape: Shape): shape is Square {
  return shape.kind === 'square';
}

export function getArea(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.sideLength ** 2;
  }
}

// tests/guards.test.ts
import { expect } from 'chai';
import { isCircle, isSquare, getArea, Circle, Square } from '../src/guards';

describe('Shape type guards', () => {
  const circle: Circle = { kind: 'circle', radius: 5 };
  const square: Square = { kind: 'square', sideLength: 4 };

  describe('isCircle()', () => {
    it('should identify circles', () => {
      expect(isCircle(circle)).to.be.true;
    });

    it('should reject squares', () => {
      expect(isCircle(square)).to.be.false;
    });
  });

  describe('isSquare()', () => {
    it('should identify squares', () => {
      expect(isSquare(square)).to.be.true;
    });

    it('should reject circles', () => {
      expect(isSquare(circle)).to.be.false;
    });
  });

  describe('getArea()', () => {
    it('should calculate circle area', () => {
      const area = getArea(circle);
      expect(area).to.be.closeTo(78.54, 0.01);
    });

    it('should calculate square area', () => {
      const area = getArea(square);
      expect(area).to.equal(16);
    });
  });
});
```

## Testing Generics

```typescript
// src/queue.ts
export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// tests/queue.test.ts
import { expect } from 'chai';
import { Queue } from '../src/queue';

describe('Queue<T>', () => {
  describe('with numbers', () => {
    let queue: Queue<number>;

    beforeEach(() => {
      queue = new Queue<number>();
    });

    it('should enqueue and dequeue numbers', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.dequeue()).to.equal(1);
      expect(queue.dequeue()).to.equal(2);
      expect(queue.size()).to.equal(1);
    });

    it('should peek without removing', () => {
      queue.enqueue(42);

      expect(queue.peek()).to.equal(42);
      expect(queue.size()).to.equal(1);
    });
  });

  describe('with strings', () => {
    let queue: Queue<string>;

    beforeEach(() => {
      queue = new Queue<string>();
    });

    it('should work with string types', () => {
      queue.enqueue('first');
      queue.enqueue('second');

      expect(queue.dequeue()).to.equal('first');
      expect(queue.size()).to.equal(1);
    });
  });

  describe('with objects', () => {
    interface Task {
      id: number;
      name: string;
    }

    let queue: Queue<Task>;

    beforeEach(() => {
      queue = new Queue<Task>();
    });

    it('should handle complex objects', () => {
      const task1: Task = { id: 1, name: 'Task 1' };
      const task2: Task = { id: 2, name: 'Task 2' };

      queue.enqueue(task1);
      queue.enqueue(task2);

      expect(queue.dequeue()).to.deep.equal(task1);
      expect(queue.peek()).to.deep.equal(task2);
    });
  });

  describe('edge cases', () => {
    it('should return undefined when dequeuing empty queue', () => {
      const queue = new Queue<number>();
      expect(queue.dequeue()).to.be.undefined;
    });

    it('should correctly report empty status', () => {
      const queue = new Queue<number>();
      expect(queue.isEmpty()).to.be.true;

      queue.enqueue(1);
      expect(queue.isEmpty()).to.be.false;

      queue.dequeue();
      expect(queue.isEmpty()).to.be.true;
    });
  });
});
```

## Code Coverage with NYC

### Installation
```bash
npm install --save-dev nyc
```

### Configuration (.nycrc.json)
```json
{
  "extends": "@istanbuljs/nyc-config-typescript",
  "all": true,
  "check-coverage": true,
  "branches": 80,
  "lines": 80,
  "functions": 80,
  "statements": 80,
  "reporter": ["text", "html", "lcov"],
  "include": ["src/**/*.ts"],
  "exclude": ["**/*.d.ts", "**/*.test.ts", "tests/**"]
}
```

### package.json
```json
{
  "scripts": {
    "test:coverage": "nyc mocha",
    "coverage:report": "nyc report --reporter=html"
  }
}
```

## Best Practices

### 1. Organize Tests by Feature
```typescript
describe('UserService', () => {
  describe('Authentication', () => {
    it('should authenticate valid credentials');
    it('should reject invalid credentials');
  });

  describe('Registration', () => {
    it('should register new users');
    it('should prevent duplicate emails');
  });
});
```

### 2. Use Type-Safe Test Data
```typescript
interface TestUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function createTestUser(overrides?: Partial<TestUser>): TestUser {
  return {
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    ...overrides
  };
}
```

### 3. Test Error Conditions
```typescript
it('should throw error for invalid input', () => {
  expect(() => validateEmail('invalid')).to.throw(Error, 'Invalid email');
});
```

### 4. Use Hooks for Setup/Teardown
```typescript
describe('Database tests', () => {
  before(() => {
    // Run once before all tests
  });

  beforeEach(() => {
    // Run before each test
  });

  afterEach(() => {
    // Run after each test
  });

  after(() => {
    // Run once after all tests
  });
});
```

## Common Chai Assertions

```typescript
// Equality
expect(value).to.equal(42);
expect(obj).to.deep.equal({ a: 1 });
expect(value).to.eql(expected); // Deep equality

// Type checking
expect(value).to.be.a('string');
expect(value).to.be.an('array');
expect(value).to.be.instanceof(MyClass);

// Truthiness
expect(value).to.be.true;
expect(value).to.be.false;
expect(value).to.be.null;
expect(value).to.be.undefined;
expect(value).to.exist;

// Comparisons
expect(value).to.be.above(10);
expect(value).to.be.below(100);
expect(value).to.be.within(1, 10);

// Strings
expect(str).to.include('substring');
expect(str).to.match(/regex/);
expect(str).to.have.length(5);

// Arrays
expect(arr).to.have.length(3);
expect(arr).to.include(2);
expect(arr).to.have.members([1, 2, 3]);
expect(arr).to.be.empty;

// Objects
expect(obj).to.have.property('name');
expect(obj).to.have.property('age', 25);
expect(obj).to.have.keys(['name', 'age']);
expect(obj).to.deep.include({ name: 'John' });

// Functions
expect(fn).to.throw();
expect(fn).to.throw(Error);
expect(fn).to.throw(Error, 'message');

// Promises
expect(promise).to.eventually.equal('value');
expect(promise).to.be.fulfilled;
expect(promise).to.be.rejected;
```

## Related Topics

- [TypeScript Testing Overview](./index.md) - Testing framework comparison
- [Cypress E2E Testing](./cypress.md) - End-to-end testing with Cypress
- [TypeScript Fundamentals](/docs/languages/typescript/fundamentals/) - Core TypeScript concepts
