---
sidebar_position: 4
---

# Vitest Testing

Vitest is a blazing fast unit test framework powered by Vite. It provides a Jest-compatible API with native TypeScript support, making it the modern choice for testing TypeScript applications.

## Why Vitest for TypeScript?

### Strengths
- **Extremely Fast** - 10-100x faster than Jest (Vite-powered)
- **Native TypeScript** - No transpilation needed, works out of the box
- **Native ESM** - First-class ES modules support
- **Jest Compatible** - Drop-in replacement with familiar API
- **Hot Module Replacement** - Instant test reruns
- **Component Testing** - Built-in support for testing UI components
- **Modern DX** - Beautiful UI, watch mode, parallel execution

### Use Cases
- Modern TypeScript/JavaScript projects
- Vite-based applications
- Projects using ES modules
- Component testing (React, Vue, Svelte)
- Migration from Jest

## Installation

```bash
# Install Vitest
npm install --save-dev vitest

# Optional: Install UI for browser-based test runner
npm install --save-dev @vitest/ui

# Optional: Install coverage tool
npm install --save-dev @vitest/coverage-v8
```

## Configuration

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.test.ts',
        'src/**/*.spec.ts'
      ]
    },
    // Mock functions and modules
    mockReset: true,
    restoreMocks: true
  }
});
```

### With Path Aliases
```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    }
  }
});
```

### package.json Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest --coverage"
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Basic Examples

### Simple Unit Tests

```typescript
// src/calculator.ts
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}

// src/calculator.test.ts
import { describe, test, expect } from 'vitest';
import { Calculator } from './calculator';

describe('Calculator', () => {
  const calc = new Calculator();

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(calc.add(2, 3)).toBe(5);
    });

    test('adds negative numbers', () => {
      expect(calc.add(-5, -3)).toBe(-8);
    });

    test('adds with zero', () => {
      expect(calc.add(10, 0)).toBe(10);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(calc.divide(10, 2)).toBe(5);
    });

    test('throws on division by zero', () => {
      expect(() => calc.divide(10, 0)).toThrow('Cannot divide by zero');
    });
  });
});
```

## Type-Safe Testing

### Testing with Interfaces

```typescript
// src/types.ts
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface TaskManager {
  addTask(task: Omit<Task, 'id' | 'createdAt'>): Task;
  getTask(id: string): Task | undefined;
  updateTask(id: string, updates: Partial<Task>): Task | undefined;
  deleteTask(id: string): boolean;
  getAllTasks(): Task[];
}

// src/taskManager.ts
import { Task, TaskManager } from './types';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryTaskManager implements TaskManager {
  private tasks = new Map<string, Task>();

  addTask(taskData: Omit<Task, 'id' | 'createdAt'>): Task {
    const task: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date()
    };
    this.tasks.set(task.id, task);
    return task;
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  updateTask(id: string, updates: Partial<Task>): Task | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;

    const updated = { ...task, ...updates };
    this.tasks.set(id, updated);
    return updated;
  }

  deleteTask(id: string): boolean {
    return this.tasks.delete(id);
  }

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }
}

// src/taskManager.test.ts
import { describe, test, expect, beforeEach } from 'vitest';
import { InMemoryTaskManager } from './taskManager';

describe('InMemoryTaskManager', () => {
  let manager: InMemoryTaskManager;

  beforeEach(() => {
    manager = new InMemoryTaskManager();
  });

  describe('addTask', () => {
    test('creates task with generated ID and timestamp', () => {
      const taskData = {
        title: 'Write tests',
        completed: false,
        priority: 'high' as const
      };

      const task = manager.addTask(taskData);

      expect(task).toMatchObject(taskData);
      expect(task.id).toBeDefined();
      expect(task.createdAt).toBeInstanceOf(Date);
    });

    test('generates unique IDs for tasks', () => {
      const task1 = manager.addTask({
        title: 'Task 1',
        completed: false,
        priority: 'low'
      });
      const task2 = manager.addTask({
        title: 'Task 2',
        completed: false,
        priority: 'high'
      });

      expect(task1.id).not.toBe(task2.id);
    });
  });

  describe('getTask', () => {
    test('retrieves existing task', () => {
      const created = manager.addTask({
        title: 'Test Task',
        completed: false,
        priority: 'medium'
      });

      const retrieved = manager.getTask(created.id);

      expect(retrieved).toEqual(created);
    });

    test('returns undefined for non-existent task', () => {
      const result = manager.getTask('non-existent-id');
      expect(result).toBeUndefined();
    });
  });

  describe('updateTask', () => {
    test('updates task fields', () => {
      const task = manager.addTask({
        title: 'Original Title',
        completed: false,
        priority: 'low'
      });

      const updated = manager.updateTask(task.id, {
        title: 'Updated Title',
        completed: true
      });

      expect(updated).toBeDefined();
      expect(updated!.title).toBe('Updated Title');
      expect(updated!.completed).toBe(true);
      expect(updated!.priority).toBe('low'); // unchanged
    });

    test('returns undefined for non-existent task', () => {
      const result = manager.updateTask('non-existent', { completed: true });
      expect(result).toBeUndefined();
    });
  });

  describe('deleteTask', () => {
    test('deletes existing task', () => {
      const task = manager.addTask({
        title: 'To Delete',
        completed: false,
        priority: 'low'
      });

      const deleted = manager.deleteTask(task.id);
      expect(deleted).toBe(true);

      const retrieved = manager.getTask(task.id);
      expect(retrieved).toBeUndefined();
    });

    test('returns false for non-existent task', () => {
      const result = manager.deleteTask('non-existent');
      expect(result).toBe(false);
    });
  });

  describe('getAllTasks', () => {
    test('returns all tasks', () => {
      manager.addTask({ title: 'Task 1', completed: false, priority: 'low' });
      manager.addTask({ title: 'Task 2', completed: true, priority: 'high' });

      const tasks = manager.getAllTasks();

      expect(tasks).toHaveLength(2);
    });

    test('returns empty array when no tasks', () => {
      const tasks = manager.getAllTasks();
      expect(tasks).toHaveLength(0);
    });
  });
});
```

## Mocking with Vitest

### Type-Safe Mocks

```typescript
// src/services/emailService.ts
export interface EmailService {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}

export class SMTPEmailService implements EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // SMTP implementation
    console.log(`Sending email to ${to}`);
  }
}

// src/services/notificationService.ts
import { EmailService } from './emailService';

export class NotificationService {
  constructor(private emailService: EmailService) {}

  async notifyUser(email: string, message: string): Promise<void> {
    await this.emailService.sendEmail(
      email,
      'Notification',
      message
    );
  }
}

// src/services/notificationService.test.ts
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { NotificationService } from './notificationService';
import { EmailService } from './emailService';

describe('NotificationService', () => {
  let mockEmailService: EmailService;
  let notificationService: NotificationService;

  beforeEach(() => {
    mockEmailService = {
      sendEmail: vi.fn()
    };
    notificationService = new NotificationService(mockEmailService);
  });

  test('sends notification email', async () => {
    await notificationService.notifyUser(
      'user@example.com',
      'Hello, World!'
    );

    expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
      'user@example.com',
      'Notification',
      'Hello, World!'
    );
    expect(mockEmailService.sendEmail).toHaveBeenCalledTimes(1);
  });
});
```

### Mocking Modules

```typescript
// src/api/userApi.ts
export async function fetchUserById(id: number) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }
  return response.json();
}

// src/api/userApi.test.ts
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { fetchUserById } from './userApi';

// Mock global fetch
global.fetch = vi.fn();

describe('fetchUserById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe' };

    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUser
    });

    const result = await fetchUserById(1);

    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
  });

  test('throws error on failed request', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 404
    });

    await expect(fetchUserById(1)).rejects.toThrow('Failed to fetch user: 404');
  });
});
```

### Spies

```typescript
import { describe, test, expect, vi } from 'vitest';

describe('Spy examples', () => {
  test('spies on object method', () => {
    const obj = {
      getValue: () => 42
    };

    const spy = vi.spyOn(obj, 'getValue');

    obj.getValue();
    obj.getValue();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveReturnedWith(42);

    spy.mockRestore();
  });

  test('spies and mocks return value', () => {
    const obj = {
      getValue: () => 42
    };

    const spy = vi.spyOn(obj, 'getValue').mockReturnValue(100);

    expect(obj.getValue()).toBe(100);
    expect(spy).toHaveBeenCalled();
  });
});
```

## Testing Async Code

```typescript
// src/async.ts
export async function fetchData(url: string): Promise<any> {
  const response = await fetch(url);
  return response.json();
}

export async function processData(id: number): Promise<string> {
  const data = await fetchData(`https://api.example.com/data/${id}`);
  return `Processed: ${data.value}`;
}

// src/async.test.ts
import { describe, test, expect, vi } from 'vitest';
import { fetchData, processData } from './async';

global.fetch = vi.fn();

describe('Async operations', () => {
  test('fetchData retrieves data', async () => {
    const mockData = { id: 1, value: 'test' };

    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    const result = await fetchData('https://api.example.com/data/1');

    expect(result).toEqual(mockData);
  });

  test('processData transforms data', async () => {
    const mockData = { value: 'hello' };

    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    const result = await processData(1);

    expect(result).toBe('Processed: hello');
  });

  test('handles rejection', async () => {
    (fetch as any).mockRejectedValue(new Error('Network error'));

    await expect(fetchData('https://api.example.com/data/1'))
      .rejects
      .toThrow('Network error');
  });
});
```

## Testing Type Guards and Generics

### Type Guards

```typescript
// src/validation.ts
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

export function isValidationResult(obj: unknown): obj is ValidationResult {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'valid' in obj &&
    typeof (obj as any).valid === 'boolean'
  );
}

// src/validation.test.ts
import { describe, test, expect } from 'vitest';
import { isValidationResult, ValidationResult } from './validation';

describe('isValidationResult', () => {
  test('identifies valid ValidationResult', () => {
    const result: ValidationResult = { valid: true };
    expect(isValidationResult(result)).toBe(true);
  });

  test('identifies ValidationResult with errors', () => {
    const result: ValidationResult = {
      valid: false,
      errors: ['Error 1']
    };
    expect(isValidationResult(result)).toBe(true);
  });

  test('rejects invalid objects', () => {
    expect(isValidationResult(null)).toBe(false);
    expect(isValidationResult({})).toBe(false);
    expect(isValidationResult({ valid: 'yes' })).toBe(false);
  });
});
```

### Generic Functions

```typescript
// src/utils.ts
export function groupBy<T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

// src/utils.test.ts
import { describe, test, expect } from 'vitest';
import { groupBy } from './utils';

describe('groupBy', () => {
  test('groups objects by key', () => {
    const items = [
      { id: 1, category: 'A' },
      { id: 2, category: 'B' },
      { id: 3, category: 'A' }
    ];

    const result = groupBy(items, (item) => item.category);

    expect(result).toEqual({
      A: [{ id: 1, category: 'A' }, { id: 3, category: 'A' }],
      B: [{ id: 2, category: 'B' }]
    });
  });

  test('groups numbers by predicate', () => {
    const numbers = [1, 2, 3, 4, 5, 6];

    const result = groupBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'));

    expect(result).toEqual({
      odd: [1, 3, 5],
      even: [2, 4, 6]
    });
  });
});
```

## Snapshot Testing

```typescript
// src/formatter.ts
export interface Report {
  title: string;
  date: Date;
  items: string[];
  total: number;
}

export function formatReport(report: Report): string {
  return `
=== ${report.title} ===
Date: ${report.date.toISOString()}
Items: ${report.items.length}
Total: $${report.total.toFixed(2)}

Details:
${report.items.map((item, i) => `  ${i + 1}. ${item}`).join('\n')}
  `.trim();
}

// src/formatter.test.ts
import { describe, test, expect } from 'vitest';
import { formatReport, Report } from './formatter';

describe('formatReport', () => {
  test('formats report correctly', () => {
    const report: Report = {
      title: 'Monthly Report',
      date: new Date('2024-01-01T00:00:00.000Z'),
      items: ['Item 1', 'Item 2', 'Item 3'],
      total: 299.99
    };

    expect(formatReport(report)).toMatchSnapshot();
  });
});
```

## Benchmarking

Vitest includes built-in benchmarking:

```typescript
// src/performance.bench.ts
import { bench, describe } from 'vitest';

describe('Array operations', () => {
  const array = Array.from({ length: 10000 }, (_, i) => i);

  bench('for loop', () => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
  });

  bench('forEach', () => {
    let sum = 0;
    array.forEach((n) => (sum += n));
  });

  bench('reduce', () => {
    array.reduce((sum, n) => sum + n, 0);
  });
});
```

Run benchmarks:
```bash
vitest bench
```

## Code Coverage

```bash
# Run tests with coverage
npm test -- --coverage

# Watch mode with coverage
npm test -- --coverage --watch

# Coverage with specific reporter
npm test -- --coverage --reporter=html
```

### Coverage Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/*.d.ts'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
});
```

## Best Practices

### 1. Use describe.concurrent for Parallel Tests

```typescript
import { describe, test } from 'vitest';

describe.concurrent('Parallel tests', () => {
  test('test 1', async () => {
    // Runs in parallel with other tests
  });

  test('test 2', async () => {
    // Runs in parallel
  });
});
```

### 2. Use test.skip and test.only

```typescript
test.skip('skip this test', () => {
  // This test won't run
});

test.only('only run this test', () => {
  // Only this test will run
});
```

### 3. Use test.each for Parameterized Tests

```typescript
import { test, expect } from 'vitest';

test.each([
  [1, 2, 3],
  [2, 3, 5],
  [10, 20, 30]
])('adds %i + %i to equal %i', (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```

### 4. Custom Matchers

```typescript
import { expect } from 'vitest';

expect.extend({
  toBeWithinRange(received: number, min: number, max: number) {
    const pass = received >= min && received <= max;
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be within range ${min} - ${max}`
          : `expected ${received} to be within range ${min} - ${max}`
    };
  }
});

test('custom matcher', () => {
  expect(15).toBeWithinRange(10, 20);
});
```

## Common Vitest Matchers

```typescript
// Same as Jest - Vitest is API compatible
expect(value).toBe(5);
expect(obj).toEqual({ a: 1 });
expect(value).toBeTruthy();
expect(arr).toContain(item);
expect(fn).toThrow();
await expect(promise).resolves.toBe(value);

// Mock assertions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenCalledTimes(2);
```

## Migrating from Jest

Vitest is mostly compatible with Jest. Key differences:

1. **Configuration**: Use `vitest.config.ts` instead of `jest.config.js`
2. **Imports**: Can import from `vitest` or use globals
3. **Mocking**: Use `vi` instead of `jest`

```typescript
// Jest
import { jest } from '@jest/globals';
const mock = jest.fn();

// Vitest
import { vi } from 'vitest';
const mock = vi.fn();
```

## Related Topics

- [TypeScript Testing Overview](./index.md) - Testing framework comparison
- [Jest Testing](./jest.md) - Jest with TypeScript
- [Mocha + Chai Testing](./mocha-chai.md) - BDD/TDD style testing
- [Cypress E2E Testing](./cypress.md) - End-to-end testing
- [TypeScript Fundamentals](/docs/languages/typescript/fundamentals/) - Core TypeScript concepts
