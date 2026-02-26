---
sidebar_position: 3
---

# Test-Driven Development (TDD)

Test-Driven Development is a software development approach where you write tests **before** writing the code that makes them pass. This seemingly counterintuitive practice leads to better design, higher quality, and more maintainable code.

## What is TDD?

**Test-Driven Development (TDD)** is a development methodology that follows this cycle:

1. **Write a failing test** (Red)
2. **Write minimal code to make it pass** (Green)
3. **Refactor while keeping tests green** (Refactor)

This is called the **Red-Green-Refactor** cycle.

---

## The Red-Green-Refactor Cycle

```
┌─────────────────────────────────────┐
│                                     │
│  1. RED: Write a Failing Test       │
│     - Test something that doesn't   │
│       exist yet                     │
│     - Run test (it should fail)     │
│                                     │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│                                     │
│  2. GREEN: Make Test Pass           │
│     - Write minimal code            │
│     - Get test to pass              │
│     - Don't worry about perfection  │
│                                     │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│                                     │
│  3. REFACTOR: Improve Code          │
│     - Clean up code                 │
│     - Remove duplication            │
│     - Tests still pass!             │
│                                     │
└──────────────┬──────────────────────┘
               │
               └──────────► Repeat
```

---

## TDD Example: Building a Calculator

### Step 1: Red - Write a Failing Test

```javascript
// calculator.test.js
describe('Calculator', () => {
  test('add should return sum of two numbers', () => {
    const calc = new Calculator();
    expect(calc.add(2, 3)).toBe(5);
  });
});

// Run test: ❌ FAIL - Calculator is not defined
```

### Step 2: Green - Make Test Pass

```javascript
// calculator.js
class Calculator {
  add(a, b) {
    return a + b;
  }
}

module.exports = Calculator;

// Run test: ✅ PASS
```

### Step 3: Refactor - Improve (if needed)

```javascript
// Code is already clean and simple
// Move to next test
```

### Next Feature: Subtraction

**Red - Write failing test:**
```javascript
test('subtract should return difference of two numbers', () => {
  const calc = new Calculator();
  expect(calc.subtract(5, 3)).toBe(2);
});

// ❌ FAIL - subtract is not a function
```

**Green - Make it pass:**
```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }
}

// ✅ PASS
```

### Handle Edge Cases

**Red - Test division by zero:**
```javascript
test('divide should throw error when dividing by zero', () => {
  const calc = new Calculator();
  expect(() => calc.divide(10, 0)).toThrow('Cannot divide by zero');
});

// ❌ FAIL - divide is not a function
```

**Green - Implement:**
```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}

// ✅ PASS
```

---

## Why Use TDD?

### 1. Better Design

Writing tests first forces you to think about the API before implementation.

```javascript
// ❌ Without TDD - Design as you go
function processUser(user) {
  // What parameters do I need?
  // What should I return?
  // What edge cases exist?
}

// ✅ With TDD - Design up front
test('processUser should validate email format', () => {
  expect(() => processUser({ email: 'invalid' }))
    .toThrow('Invalid email format');
});

// Now you know:
// - Function takes a user object
// - Must have email validation
// - Should throw on invalid input
```

### 2. Higher Code Coverage

Every line of code is written to pass a test, ensuring high test coverage naturally.

### 3. Faster Debugging

When tests fail, you know exactly what broke because you just wrote the code.

### 4. Confidence to Refactor

Comprehensive tests give you confidence to improve code without fear of breaking functionality.

### 5. Living Documentation

Tests document how the code should behave and provide usage examples.

### 6. Fewer Bugs

Bugs are caught immediately during development, not in production.

---

## TDD Best Practices

### 1. Write the Smallest Test Possible

```javascript
// ❌ Too much in one test
test('user management', () => {
  const user = createUser({ name: 'Alice' });
  expect(user.name).toBe('Alice');
  expect(user.id).toBeDefined();
  expect(user.isActive).toBe(true);
  updateUser(user.id, { name: 'Bob' });
  expect(user.name).toBe('Bob');
  deleteUser(user.id);
  expect(findUser(user.id)).toBeNull();
});

// ✅ Small, focused tests
test('createUser should set user name', () => {
  const user = createUser({ name: 'Alice' });
  expect(user.name).toBe('Alice');
});

test('createUser should generate user id', () => {
  const user = createUser({ name: 'Alice' });
  expect(user.id).toBeDefined();
});
```

### 2. Test Behavior, Not Implementation

```javascript
// ❌ Testing implementation
test('add should use + operator', () => {
  const source = add.toString();
  expect(source).toContain('+');
});

// ✅ Testing behavior
test('add should return sum of two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

### 3. Follow AAA Pattern

**Arrange, Act, Assert** - Keep tests structured and readable.

```javascript
test('user service should create user with hashed password', () => {
  // Arrange
  const userData = {
    email: 'user@example.com',
    password: 'plaintext123'
  };

  // Act
  const user = userService.create(userData);

  // Assert
  expect(user.password).not.toBe('plaintext123');
  expect(user.password).toMatch(/^\$2[aby]\$/); // bcrypt hash
});
```

### 4. Write Tests That Fail for the Right Reason

```javascript
// ❌ Test that passes before implementation
test('add should return a number', () => {
  const result = add(2, 3);
  expect(typeof result).toBe('number');
  // This passes even with empty function returning undefined!
});

// ✅ Test that fails meaningfully
test('add should return sum of two numbers', () => {
  expect(add(2, 3)).toBe(5);
  // This fails with undefined !== 5
});
```

### 5. Keep Tests Fast

```javascript
// ❌ Slow test with unnecessary delays
test('user creation', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const user = await createUser({ name: 'Alice' });
  expect(user.name).toBe('Alice');
});

// ✅ Fast test
test('user creation', () => {
  const user = createUser({ name: 'Alice' });
  expect(user.name).toBe('Alice');
});
```

---

## Common TDD Mistakes

### 1. Writing Tests After Code

This defeats the purpose of TDD and loses the design benefits.

### 2. Writing Too Much Code at Once

**Stick to the cycle:**
- One failing test
- Minimal code to pass
- Refactor
- Repeat

### 3. Not Running Tests Frequently

Run tests after every small change to catch issues immediately.

### 4. Testing Implementation Details

Focus on behavior and public APIs, not internal implementation.

### 5. Skipping Refactor Step

Don't accumulate technical debt - refactor while tests are green.

---

## TDD vs. Traditional Development

### Traditional Approach

```
1. Write code
2. Manually test
3. Find bugs
4. Fix bugs
5. Write tests (maybe)
```

### TDD Approach

```
1. Write test (fails)
2. Write code (test passes)
3. Refactor
4. Repeat
```

### Comparison

| Aspect | Traditional | TDD |
|--------|------------|-----|
| **Design** | Design while coding | Design before coding |
| **Test Coverage** | Often incomplete | Comprehensive |
| **Bug Detection** | Late (QA or production) | Early (during development) |
| **Refactoring** | Risky | Safe and confident |
| **Documentation** | May be outdated | Tests are documentation |
| **Development Speed** | Fast initially, slows down | Slower initially, faster long-term |

---

## When to Use TDD

### Good Use Cases

**✅ Use TDD for:**
- Core business logic
- Complex algorithms
- Utility functions
- API endpoints
- Data transformations
- Bug fixes (write test that reproduces bug first)

**Example: Bug Fix with TDD**
```javascript
// 1. RED - Write test that reproduces bug
test('calculateTax should handle zero amount', () => {
  expect(calculateTax(0, 0.1)).toBe(0);
});
// ❌ FAIL - NaN returned

// 2. GREEN - Fix the bug
function calculateTax(amount, rate) {
  if (amount === 0) return 0; // Fix
  return amount * rate;
}
// ✅ PASS

// 3. REFACTOR (if needed)
```

### When TDD May Be Less Useful

**❓ Consider alternatives for:**
- UI styling and layouts
- Proof-of-concept code
- Prototypes and experiments
- Integration with poorly documented third-party APIs

---

## Real-World Example: User Registration

### Requirement: User Registration Feature

**Features:**
- Validate email format
- Require strong password
- Hash password before storing
- Generate unique user ID
- Return user object without password

### Step-by-Step TDD

**1. Email Validation (Red)**
```javascript
test('register should reject invalid email', () => {
  expect(() => register({ email: 'invalid', password: 'Strong123!' }))
    .toThrow('Invalid email format');
});
// ❌ FAIL - register is not defined
```

**2. Email Validation (Green)**
```javascript
function register({ email, password }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
}
// ✅ PASS
```

**3. Password Strength (Red)**
```javascript
test('register should reject weak password', () => {
  expect(() => register({ email: 'user@example.com', password: 'weak' }))
    .toThrow('Password must be at least 8 characters');
});
// ❌ FAIL
```

**4. Password Strength (Green)**
```javascript
function register({ email, password }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
}
// ✅ PASS
```

**5. Password Hashing (Red)**
```javascript
test('register should hash password', () => {
  const user = register({ email: 'user@example.com', password: 'Strong123!' });
  expect(user.password).not.toBe('Strong123!');
  expect(user.password).toMatch(/^\$2[aby]\$/); // bcrypt format
});
// ❌ FAIL - returns undefined
```

**6. Password Hashing (Green)**
```javascript
const bcrypt = require('bcrypt');

function register({ email, password }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  return {
    id: generateId(),
    email,
    password: hashedPassword
  };
}
// ✅ PASS
```

**7. Refactor**
```javascript
// Extract validation to separate functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
}

function validatePassword(password) {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
}

function register({ email, password }) {
  validateEmail(email);
  validatePassword(password);

  const hashedPassword = bcrypt.hashSync(password, 10);

  return {
    id: generateId(),
    email,
    password: hashedPassword
  };
}
// ✅ All tests still pass
```

---

## Tools for TDD

### JavaScript/TypeScript
- **Jest** - Full-featured testing framework
- **Mocha** - Flexible test framework
- **Vitest** - Fast Vite-native test framework

### Java
- **JUnit 5** - Standard testing framework
- **AssertJ** - Fluent assertions

### Python
- **pytest** - Feature-rich testing framework
- **unittest** - Built-in testing framework

### C#/.NET
- **xUnit** - Modern testing framework
- **NUnit** - Mature testing framework

---

## Resources

- [Test Driven Development: By Example](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530) - Kent Beck
- [Growing Object-Oriented Software, Guided by Tests](https://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627)
- [Test-Driven Development with Python](https://www.obeythetestinggoat.com/)
- [Uncle Bob's TDD Videos](http://www.butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd)

## Next Steps

1. Practice the Red-Green-Refactor cycle
2. Start with simple functions (calculators, validators)
3. Learn [Test Doubles](/docs/testing/fundamentals/test-doubles) for complex dependencies
4. Explore [BDD](/docs/testing/fundamentals/bdd) for behavior-focused testing
5. Apply TDD to your next feature

---

**Write tests first - your future self will thank you!**
