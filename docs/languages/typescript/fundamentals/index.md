---
sidebar_position: 0
---

# TypeScript Fundamentals

TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It adds static type checking, interfaces, and advanced features while maintaining JavaScript compatibility.

## What is TypeScript?

TypeScript = JavaScript + Static Types + Modern Features

**Key Benefits:**
- Catch errors at compile time instead of runtime
- Better IDE support (autocomplete, refactoring)
- Self-documenting code through type annotations
- Scales to large codebases
- Works with existing JavaScript libraries

## Quick Start

### Installation

```bash
# Install TypeScript globally
npm install -g typescript

# Verify installation
tsc --version

# Initialize TypeScript project
tsc --init
```

### First TypeScript File

```typescript
// hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message = greet('Alice');
console.log(message);

// greet(42); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'
```

### Compile and Run

```bash
# Compile TypeScript to JavaScript
tsc hello.ts

# This creates hello.js
node hello.js
```

## Core Concepts

### 1. Basic Types

```typescript
// Primitives
let name: string = 'Alice';
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['Alice', 'Bob'];

// Tuples
let person: [string, number] = ['Alice', 30];

// Enum
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;

// Any (avoid when possible)
let notSure: any = 4;
notSure = 'maybe a string';

// Unknown (safer than any)
let value: unknown = 'hello';
if (typeof value === 'string') {
  console.log(value.toUpperCase()); // ✅ OK after type check
}

// Void
function log(message: string): void {
  console.log(message);
}

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never (functions that never return)
function throwError(message: string): never {
  throw new Error(message);
}
```

### 2. Interfaces

Define the shape of objects.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Read-only
}

const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: new Date()
};

// user.createdAt = new Date(); // ❌ Error: readonly property

// Extending interfaces
interface Admin extends User {
  permissions: string[];
}

const admin: Admin = {
  id: 2,
  name: 'Bob',
  email: 'bob@example.com',
  createdAt: new Date(),
  permissions: ['read', 'write', 'delete']
};

// Function interfaces
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
```

### 3. Type Aliases

Create custom types.

```typescript
// Simple alias
type ID = number | string;

let userId: ID = 123;
userId = 'abc-123'; // ✅ OK

// Object type
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };

// Union types
type Status = 'pending' | 'approved' | 'rejected';

let orderStatus: Status = 'pending';
// orderStatus = 'invalid'; // ❌ Error

// Intersection types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type Staff = Person & Employee;

const staff: Staff = {
  name: 'Alice',
  age: 30,
  employeeId: 12345,
  department: 'Engineering'
};
```

### 4. Generics

Write reusable, type-safe code.

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>('hello');
const inferred = identity(true); // Type inferred as boolean

// Generic array function
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first = firstElement([1, 2, 3]); // number | undefined
const firstStr = firstElement(['a', 'b']); // string | undefined

// Generic interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: 'hello' };

// Generic class
class DataStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  get(index: number): T | undefined {
    return this.data[index];
  }

  getAll(): T[] {
    return [...this.data];
  }
}

const numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength('hello'); // ✅ OK
logLength([1, 2, 3]); // ✅ OK
logLength({ length: 10, value: 3 }); // ✅ OK
// logLength(42); // ❌ Error: number doesn't have length
```

### 5. Classes

TypeScript enhances JavaScript classes with access modifiers and more.

```typescript
class User {
  // Access modifiers: public (default), private, protected
  public id: number;
  private password: string;
  protected email: string;
  readonly createdAt: Date;

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }

  // Public method
  public greet(): string {
    return `Hello, my email is ${this.email}`;
  }

  // Private method
  private hashPassword(password: string): string {
    // Hashing logic
    return `hashed_${password}`;
  }

  // Getter
  get displayEmail(): string {
    return this.email.toLowerCase();
  }

  // Setter
  set updatePassword(newPassword: string) {
    this.password = this.hashPassword(newPassword);
  }

  // Static method
  static fromJSON(json: string): User {
    const data = JSON.parse(json);
    return new User(data.id, data.email, data.password);
  }
}

// Shorthand constructor (parameter properties)
class Product {
  constructor(
    public id: number,
    public name: string,
    private price: number
  ) {}

  getPrice(): number {
    return this.price;
  }
}

// Abstract classes
abstract class Animal {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log('Woof!');
  }
}

const dog = new Dog('Buddy');
dog.makeSound(); // Woof!
dog.move(); // Buddy is moving
```

### 6. Advanced Types

```typescript
// Utility Types

// Partial - make all properties optional
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
  return { ...todo, ...fieldsToUpdate };
}

// Required - make all properties required
type RequiredTodo = Required<Todo>;

// Readonly - make all properties readonly
type ReadonlyTodo = Readonly<Todo>;

// Pick - select specific properties
type TodoPreview = Pick<Todo, 'title' | 'completed'>;

// Omit - exclude specific properties
type TodoInfo = Omit<Todo, 'completed'>;

// Record - create object type with specific keys
type UserRoles = 'admin' | 'user' | 'guest';
type RolePermissions = Record<UserRoles, string[]>;

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};

// Mapped types
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type OptionalTodo = Optional<Todo>;

// Conditional types
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>; // 'yes'
type B = IsString<number>; // 'no'
```

## Type Inference

TypeScript can infer types automatically:

```typescript
// Type inferred as number
let x = 3;

// Type inferred as string[]
let names = ['Alice', 'Bob', 'Charlie'];

// Return type inferred
function add(a: number, b: number) {
  return a + b; // Inferred as number
}

// Best practice: Explicit types for function parameters, inferred for return values
```

## Type Assertions

Tell TypeScript you know better:

```typescript
// As syntax (preferred)
const input = document.getElementById('email') as HTMLInputElement;
input.value = 'test@example.com';

// Angle bracket syntax (not usable in TSX)
const input = <HTMLInputElement>document.getElementById('email');

// Non-null assertion operator
function getValue(id: string): string | null {
  return document.getElementById(id)?.textContent ?? null;
}

const value = getValue('myId')!; // Assert it's not null
```

## tsconfig.json

Configure TypeScript compilation:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Best Practices

1. **Enable strict mode** - `"strict": true` in tsconfig.json
2. **Avoid `any`** - Use `unknown` if type is truly unknown
3. **Use interfaces for objects** - Especially for public APIs
4. **Prefer type inference** - Don't over-annotate
5. **Use readonly** - For immutable data
6. **Leverage union types** - Instead of enums for simple cases
7. **Use generics** - For reusable, type-safe code
8. **Document with JSDoc** - For better IDE hints

## Common Patterns

### API Response Typing

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### Discriminated Unions

```typescript
interface SuccessResult {
  success: true;
  data: any;
}

interface ErrorResult {
  success: false;
  error: string;
}

type Result = SuccessResult | ErrorResult;

function handleResult(result: Result) {
  if (result.success) {
    console.log(result.data); // TypeScript knows this is SuccessResult
  } else {
    console.error(result.error); // TypeScript knows this is ErrorResult
  }
}
```

## Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions for JavaScript libraries
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
