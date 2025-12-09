---
sidebar_position: 1
---

# ES6+ Features

Modern JavaScript (ES6/ES2015 and beyond) introduced powerful features that make code cleaner, more expressive, and easier to maintain.

## Arrow Functions

Shorter syntax for function expressions with lexical `this` binding.

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter (parentheses optional)
const square = x => x * x;

// With block body
const greet = name => {
  const message = `Hello, ${name}!`;
  return message;
};

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
```

**Key difference - `this` binding:**

```javascript
// Traditional function - 'this' depends on how it's called
function Timer() {
  this.seconds = 0;

  setInterval(function() {
    this.seconds++; // ❌ 'this' is undefined or window
  }, 1000);
}

// Arrow function - 'this' is lexically bound
function Timer() {
  this.seconds = 0;

  setInterval(() => {
    this.seconds++; // ✅ 'this' refers to Timer instance
  }, 1000);
}
```

## Template Literals

String interpolation and multi-line strings using backticks.

```javascript
const name = 'Alice';
const age = 30;

// String interpolation
const greeting = `Hello, ${name}! You are ${age} years old.`;

// Expressions in templates
const message = `Next year you'll be ${age + 1}`;

// Multi-line strings
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Age: ${age}</p>
  </div>
`;

// Tagged templates (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<mark>${values[i] || ''}</mark>`;
  }, '');
}

const emphasized = highlight`Hello, ${name}! You are ${age} years old.`;
```

## Destructuring

Extract values from arrays and objects into variables.

### Array Destructuring

```javascript
const colors = ['red', 'green', 'blue'];

// Traditional
const first = colors[0];
const second = colors[1];

// Destructuring
const [first, second, third] = colors;

// Skip elements
const [, , third] = colors;

// Rest operator
const [primary, ...others] = colors;
console.log(others); // ['green', 'blue']

// Default values
const [a, b, c, d = 'yellow'] = colors;

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x]; // x=2, y=1
```

### Object Destructuring

```javascript
const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Basic destructuring
const { name, age } = user;

// Rename variables
const { name: userName, age: userAge } = user;

// Default values
const { name, role = 'user' } = user;

// Nested destructuring
const { address: { city, country } } = user;

// Rest operator
const { name, ...details } = user;

// Function parameters
function displayUser({ name, age, email }) {
  console.log(`${name} (${age}): ${email}`);
}

displayUser(user);
```

## Spread and Rest Operators

### Spread Operator (`...`)

Expand iterables into individual elements.

```javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
const copy = [...arr1]; // Shallow copy

// Objects
const defaults = { theme: 'light', language: 'en' };
const userPrefs = { theme: 'dark' };

const settings = { ...defaults, ...userPrefs };
// { theme: 'dark', language: 'en' }

// Function arguments
const numbers = [1, 5, 3, 9, 2];
const max = Math.max(...numbers);

// Copying with modifications
const original = { a: 1, b: 2, c: 3 };
const updated = { ...original, b: 20, d: 4 };
// { a: 1, b: 20, c: 3, d: 4 }
```

### Rest Operator (`...`)

Collect multiple elements into an array.

```javascript
// Function parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4); // 10

// With named parameters
function greet(greeting, ...names) {
  return `${greeting}, ${names.join(' and ')}!`;
}

greet('Hello', 'Alice', 'Bob', 'Charlie');
// "Hello, Alice and Bob and Charlie!"
```

## let and const

Block-scoped variable declarations.

```javascript
// var - function scoped (avoid in modern code)
function example() {
  var x = 1;
  if (true) {
    var x = 2; // Same variable
    console.log(x); // 2
  }
  console.log(x); // 2
}

// let - block scoped, can be reassigned
function example() {
  let x = 1;
  if (true) {
    let x = 2; // Different variable
    console.log(x); // 2
  }
  console.log(x); // 1
}

// const - block scoped, cannot be reassigned
const PI = 3.14159;
PI = 3.14; // ❌ Error

// Objects and arrays with const
const user = { name: 'Alice' };
user.name = 'Bob'; // ✅ OK - modifying property
user = {}; // ❌ Error - reassigning

const numbers = [1, 2, 3];
numbers.push(4); // ✅ OK - modifying array
numbers = []; // ❌ Error - reassigning
```

## Default Parameters

Provide default values for function parameters.

```javascript
// Traditional approach
function greet(name, greeting) {
  greeting = greeting || 'Hello';
  return `${greeting}, ${name}!`;
}

// ES6 default parameters
function greet(name, greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

greet('Alice'); // "Hello, Alice!"
greet('Bob', 'Hi'); // "Hi, Bob!"

// Using previous parameters
function createUser(name, role = 'user', displayName = name) {
  return { name, role, displayName };
}

// Expressions as defaults
function log(message, timestamp = Date.now()) {
  console.log(`[${timestamp}] ${message}`);
}
```

## Enhanced Object Literals

Concise syntax for object properties and methods.

```javascript
const name = 'Alice';
const age = 30;

// Property shorthand
const user = {
  name,    // Instead of name: name
  age      // Instead of age: age
};

// Method shorthand
const calculator = {
  // Instead of add: function(a, b) { ... }
  add(a, b) {
    return a + b;
  },

  subtract(a, b) {
    return a - b;
  }
};

// Computed property names
const propName = 'email';
const user = {
  name: 'Alice',
  [propName]: 'alice@example.com',
  [`is${propName}Verified`]: true
};
// { name: 'Alice', email: 'alice@example.com', isemailVerified: true }
```

## Classes

Syntactic sugar for prototype-based inheritance.

```javascript
class User {
  // Constructor
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  // Instance method
  greet() {
    return `Hello, I'm ${this.name}`;
  }

  // Getter
  get age() {
    const now = new Date();
    return now.getFullYear() - this.createdAt.getFullYear();
  }

  // Setter
  set displayName(value) {
    this.name = value;
  }

  // Static method
  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.name, data.email);
  }
}

// Usage
const alice = new User('Alice', 'alice@example.com');
alice.greet(); // "Hello, I'm Alice"

// Inheritance
class Admin extends User {
  constructor(name, email, permissions) {
    super(name, email); // Call parent constructor
    this.permissions = permissions;
  }

  hasPermission(permission) {
    return this.permissions.includes(permission);
  }

  // Override parent method
  greet() {
    return `${super.greet()} (Admin)`;
  }
}

const bob = new Admin('Bob', 'bob@example.com', ['read', 'write']);
bob.greet(); // "Hello, I'm Bob (Admin)"
```

## Import/Export (Modules)

Organize code into reusable modules.

```javascript
// math.js - Named exports
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Alternative named export syntax
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

export { multiply, divide };

// Default export (one per module)
export default class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

// app.js - Importing
import Calculator from './math.js'; // Default import
import { add, subtract, PI } from './math.js'; // Named imports
import { multiply as mult } from './math.js'; // Rename import
import * as math from './math.js'; // Import all

// Usage
const calc = new Calculator();
const result = add(5, 3);
const pi = math.PI;
```

## Other ES6+ Features

### Optional Chaining (`?.`)

```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'New York'
  }
};

// Traditional
const zipCode = user && user.address && user.address.zipCode;

// Optional chaining (ES2020)
const zipCode = user?.address?.zipCode; // undefined (no error)

// With arrays
const firstUser = users?.[0];

// With functions
const result = obj.method?.();
```

### Nullish Coalescing (`??`)

```javascript
// || returns right side if left is falsy (0, '', false, null, undefined)
const count = 0;
const display = count || 10; // 10 (unexpected!)

// ?? returns right side only if left is null or undefined (ES2020)
const count = 0;
const display = count ?? 10; // 0 (correct!)

const name = null;
const displayName = name ?? 'Anonymous'; // 'Anonymous'
```

### Array Methods

```javascript
// find - first matching element
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const user = users.find(u => u.id === 2); // { id: 2, name: 'Bob' }

// findIndex - index of first match
const index = users.findIndex(u => u.name === 'Bob'); // 1

// includes - check if array contains value
const numbers = [1, 2, 3];
numbers.includes(2); // true

// Array.from - create array from iterable
const str = 'hello';
const chars = Array.from(str); // ['h', 'e', 'l', 'l', 'o']

// flat - flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
nested.flat(); // [1, 2, 3, 4, [5, 6]]
nested.flat(2); // [1, 2, 3, 4, 5, 6]

// flatMap - map then flatten
const sentences = ['Hello world', 'How are you'];
const words = sentences.flatMap(s => s.split(' '));
// ['Hello', 'world', 'How', 'are', 'you']
```

## Browser Compatibility

Most ES6+ features are supported in modern browsers. For older browsers, use transpilers:

- **Babel** - Transpile ES6+ to ES5
- **TypeScript** - Superset of JavaScript with type checking and transpilation

```bash
# Install Babel
npm install --save-dev @babel/core @babel/cli @babel/preset-env

# Transpile
npx babel src --out-dir dist
```

## Best Practices

1. **Use `const` by default**, `let` when reassignment is needed, avoid `var`
2. **Prefer arrow functions** for callbacks and anonymous functions
3. **Use template literals** for string interpolation
4. **Destructure** objects and arrays for cleaner code
5. **Use spread operator** instead of `Object.assign()` or array concatenation
6. **Leverage default parameters** instead of manual checks
7. **Use classes** for object-oriented code
8. **Organize code** with modules (import/export)

## Resources

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
- [ES6 Features](http://es6-features.org/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

## Next Steps

- Learn [Async Programming](./async-programming) for handling asynchronous operations
- Explore [Modules](./modules) for better code organization
- Follow [Best Practices](./best-practices) for professional JavaScript development
