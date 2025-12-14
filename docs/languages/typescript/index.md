---
sidebar_position: 3
---

# TypeScript

TypeScript is a strongly-typed superset of JavaScript that compiles to plain JavaScript, bringing static type checking and advanced tooling to JavaScript development.

## What You'll Learn

Comprehensive TypeScript development from fundamentals to testing and build tools.

### [Fundamentals](./fundamentals/)
Master TypeScript's type system and core concepts.

**Topics covered:**
- Basic types (primitives, arrays, tuples, enums)
- Interfaces and type aliases
- Generics and constraints
- Classes with access modifiers
- Advanced types (utility types, mapped types, conditional types)
- Type inference and assertions

### [Testing](./testing/)
Write type-safe, reliable tests for your TypeScript applications.

**Topics covered:**
- Jest with ts-jest configuration
- Vitest for modern TypeScript projects
- Type-safe mocking
- Testing TypeScript-specific features
- Component testing with types

### [Build Tools](./build-tools/)
Configure and optimize your TypeScript build process.

**Topics covered:**
- TypeScript compiler (tsc) and tsconfig.json
- Modern build tools (Vite, esbuild, SWC)
- Build optimization strategies
- Source maps and declarations
- Monorepo configuration

## Quick Start

### Installation

```bash
# Install TypeScript
npm install --save-dev typescript

# Initialize tsconfig.json
npx tsc --init

# Verify installation
npx tsc --version
```

### Your First TypeScript Program

```typescript
// hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message = greet("TypeScript");
console.log(message);

// TypeScript will catch this error at compile time:
// greet(42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
```

```bash
# Compile TypeScript to JavaScript
npx tsc hello.ts

# Run with Node.js
node hello.js

# Or use ts-node to run directly
npx ts-node hello.ts
```

## Why TypeScript?

### Strengths
- **Static Typing** - Catch errors at compile time, not runtime
- **Better Tooling** - Excellent IDE support with autocomplete and refactoring
- **Self-Documenting** - Types serve as inline documentation
- **Scalability** - Easier to maintain large codebases
- **JavaScript Compatibility** - All JavaScript is valid TypeScript
- **Gradual Adoption** - Add types incrementally to existing projects
- **Industry Standard** - Used by Google, Microsoft, Airbnb, Slack

### Use Cases
- Large-scale applications
- Team collaboration projects
- Enterprise software
- Libraries and frameworks
- Angular applications (TypeScript required)
- React applications (increasingly popular)
- Node.js backend services

## TypeScript vs JavaScript

| Feature | JavaScript | TypeScript |
|---------|-----------|-----------|
| **Typing** | Dynamic | Static (optional) |
| **Compile Step** | No | Yes (transpile to JS) |
| **Error Detection** | Runtime | Compile time |
| **Tooling** | Good | Excellent |
| **Learning Curve** | Easy | Moderate |
| **File Extension** | `.js` | `.ts` |
| **Refactoring** | Manual, risky | Automatic, safe |
| **Documentation** | Comments | Types + Comments |

## Learning Path

1. **Start with [Fundamentals](./fundamentals/)** - Learn types, interfaces, and generics
2. **Practice with [Testing](./testing/)** - Write type-safe tests
3. **Configure [Build Tools](./build-tools/)** - Set up compiler and bundlers
4. **Build Projects** - Apply TypeScript to real applications

## TypeScript Features

### Type System
- **Primitives:** `string`, `number`, `boolean`, `null`, `undefined`
- **Complex Types:** Arrays, tuples, objects, enums
- **Union Types:** `string | number`
- **Intersection Types:** `Type1 & Type2`
- **Literal Types:** `"success" | "error"`

### Advanced Features
- **Generics:** Write reusable, type-safe code
- **Utility Types:** `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>`
- **Mapped Types:** Transform existing types
- **Conditional Types:** Types based on conditions
- **Type Guards:** Runtime type checking
- **Decorators:** Metadata and annotations (experimental)

### Modern TypeScript (4.0+)
- Variadic tuple types
- Template literal types
- Optional chaining `?.` and nullish coalescing `??`
- `satisfies` operator (4.9+)
- `const` type parameters (5.0+)
- Decorators standardization (5.0+)

## TypeScript Ecosystem

### Frontend Frameworks
- **Angular** - TypeScript required
- **React** - Excellent TypeScript support
- **Vue** - First-class TypeScript support
- **Svelte** - TypeScript support

### Backend
- **Node.js** - Type-safe server development
- **NestJS** - TypeScript-first Node.js framework
- **Express** - Types via @types/express
- **Fastify** - Built-in TypeScript support

### Build Tools
- **tsc** - Official TypeScript compiler
- **Vite** - Fast dev server with TypeScript support
- **esbuild** - Extremely fast bundler
- **SWC** - Rust-based compiler (20x faster)
- **Webpack** - Module bundler with ts-loader

### Testing
- **Jest** - With ts-jest
- **Vitest** - Native TypeScript support
- **Testing Library** - Type-safe DOM testing
- **Playwright** - Type-safe E2E testing

## Configuration Example

### Basic tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,

    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Migration from JavaScript

### Gradual Migration
1. Rename `.js` files to `.ts` one at a time
2. Add types incrementally
3. Enable strict mode gradually
4. Fix type errors as you go

### Quick Start
```bash
# Add TypeScript to existing project
npm install --save-dev typescript @types/node

# Initialize config
npx tsc --init

# Rename files
mv index.js index.ts
```

## Related Topics

- [JavaScript](../javascript/) - TypeScript's superset language
- [Testing](../../testing/) - Universal testing concepts
- [React](../../frameworks/react/) - Build UIs with TypeScript
- [Angular](../../frameworks/angular/) - TypeScript-first framework

---

**Add type safety to your JavaScript - start with TypeScript today!**
