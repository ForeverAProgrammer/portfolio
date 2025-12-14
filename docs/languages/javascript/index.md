---
sidebar_position: 2
---

# JavaScript

JavaScript is the programming language of the web, enabling interactive and dynamic content in browsers and powering server-side applications with Node.js.

## What You'll Learn

Comprehensive JavaScript development from modern ES6+ features to testing and build tools.

### [Fundamentals](./fundamentals/)
Master modern JavaScript (ES6+) syntax and core concepts.

**Topics covered:**
- ES6+ features (arrow functions, destructuring, modules)
- Async programming (promises, async/await)
- Modern JavaScript best practices
- Browser and Node.js APIs

### [Testing](./testing/)
Write reliable, maintainable tests for your JavaScript applications.

**Topics covered:**
- Jest testing framework (setup and examples)
- Testing framework comparisons
- Unit and integration testing
- Best practices and patterns

## Quick Start

### Installation

JavaScript runs in all modern browsers. For Node.js development:

```bash
# Install Node.js (includes npm)
# Download from: https://nodejs.org/

# Verify installation
node --version
npm --version
```

### Your First JavaScript Program

**Browser:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Hello JavaScript</title>
</head>
<body>
  <h1 id="greeting">Hello</h1>

  <script>
    document.getElementById('greeting').textContent = 'Hello, JavaScript!';
    console.log('JavaScript is running!');
  </script>
</body>
</html>
```

**Node.js:**
```javascript
// hello.js
console.log('Hello, JavaScript!');

// Run with: node hello.js
```

## Why JavaScript?

### Strengths
- **Universal** - Runs in every browser and on servers (Node.js)
- **Versatile** - Frontend, backend, mobile, desktop applications
- **Huge Ecosystem** - npm has millions of packages
- **Active Community** - Largest developer community
- **Modern Features** - Continuously evolving (ES6+, ES2020+)
- **Async by Nature** - Built for handling asynchronous operations
- **Easy to Learn** - Low barrier to entry, forgiving syntax

### Use Cases
- Web applications (React, Vue, Angular)
- Server-side applications (Node.js, Express, Nest.js)
- Mobile apps (React Native, Ionic)
- Desktop apps (Electron)
- Real-time applications (WebSockets, Socket.io)
- APIs and microservices
- Browser extensions
- Game development

## Learning Path

1. **Start with [Fundamentals](./fundamentals/)** - Learn modern JavaScript syntax and core concepts
2. **Learn [Testing](./testing/)** - Write tests with Jest
3. **Explore Frameworks** - [React](../../frameworks/react/), Vue, or [AngularJS](../../frameworks/angularjs/) for frontend
4. **Build APIs** - Express.js or Nest.js for backend

## JavaScript Ecosystem

### Frontend Frameworks
- **React** - Component-based UI library
- **Vue** - Progressive framework
- **Angular** - Full-featured framework
- **Svelte** - Compiled framework

### Backend/Runtime
- **Node.js** - JavaScript runtime built on V8
- **Deno** - Secure TypeScript/JavaScript runtime
- **Bun** - Fast all-in-one JavaScript runtime

### Build Tools
- **Vite** - Next-generation frontend tooling
- **Webpack** - Module bundler
- **esbuild** - Extremely fast bundler
- **Rollup** - Module bundler for libraries

### Package Managers
- **npm** - Default Node.js package manager
- **yarn** - Fast, reliable package manager
- **pnpm** - Fast, disk-efficient package manager

## Modern JavaScript (ES6+)

JavaScript has evolved significantly with yearly updates:

### ES6 (2015) - Major Update
- Arrow functions
- Classes
- Modules (import/export)
- Template literals
- Destructuring
- Promises
- let/const

### ES2016-ES2023
- Async/await (ES2017)
- Optional chaining `?.` (ES2020)
- Nullish coalescing `??` (ES2020)
- Array methods (flat, flatMap)
- Object methods (entries, values)
- Top-level await (ES2022)

## Related Topics

- [TypeScript](../typescript/) - Typed superset of JavaScript
- [React](../../frameworks/react/) - Build user interfaces

---

**Start your JavaScript journey today!**
