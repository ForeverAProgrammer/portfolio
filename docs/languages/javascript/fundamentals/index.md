---
sidebar_position: 0
---

# JavaScript Fundamentals

Modern JavaScript (ES6+) is the foundation of web development. This section covers essential JavaScript concepts, best practices, and modern features.

## What You'll Learn

- **ES6+ Features** - Modern JavaScript syntax and features
- **Async Programming** - Promises, async/await, and callbacks
- **Modules** - Import/export and module systems
- **Best Practices** - Writing clean, maintainable JavaScript code

## Quick Start

JavaScript runs in browsers and Node.js environments. No installation needed for browser JavaScript:

```html
<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Demo</title>
</head>
<body>
  <h1 id="greeting">Hello</h1>

  <script>
    // Your JavaScript code here
    document.getElementById('greeting').textContent = 'Hello, JavaScript!';
  </script>
</body>
</html>
```

For Node.js development:

```bash
# Install Node.js (includes npm)
# Download from https://nodejs.org/

# Verify installation
node --version
npm --version

# Run JavaScript file
node app.js
```

## Core Topics

### 1. ES6+ Features

Modern JavaScript includes powerful features that make code cleaner and more expressive.

**Key features:**
- Arrow functions
- Template literals
- Destructuring
- Spread/rest operators
- let/const
- Classes
- Modules

### 2. Async Programming

Handle asynchronous operations with promises and async/await.

**Topics covered:**
- Callbacks and callback hell
- Promises
- Async/await
- Error handling
- Fetch API

### 3. Modules

Organize code into reusable modules.

**Topics covered:**
- ES6 modules (import/export)
- CommonJS (require/module.exports)
- Module bundlers
- Dynamic imports

### 4. Best Practices

Write professional, maintainable JavaScript code.

**Topics covered:**
- Code organization
- Naming conventions
- Error handling
- Performance optimization
- Security considerations

## Next Steps

1. Start with [ES6 Features](./es6-features) to learn modern JavaScript syntax
2. Master [Async Programming](./async-programming) for handling asynchronous operations
3. Learn [Modules](./modules) for code organization
4. Follow [Best Practices](./best-practices) for professional development

## Related Topics

- [JavaScript Testing](../testing/) - Test your JavaScript code with Jest and Mocha
- [Build Tools](../build-tools/) - Webpack, Vite, and modern build systems
- [React](../../frameworks/react/) - Build UIs with React
- [TypeScript](../../typescript/) - Add static typing to JavaScript
