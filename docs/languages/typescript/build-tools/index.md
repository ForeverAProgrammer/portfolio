---
sidebar_position: 2
---

# Build Tools

Configure and optimize your TypeScript build process with modern compilers and bundlers for fast, efficient development and production builds.

## What's Covered

This section covers the TypeScript compiler, build tools, bundlers, and configuration strategies for building TypeScript applications efficiently.

## The TypeScript Compiler (tsc)

### What is tsc?
The official TypeScript compiler that:
- Transpiles TypeScript to JavaScript
- Performs type checking
- Generates declaration files (.d.ts)
- Supports incremental compilation
- Enables project references

### Basic Usage

```bash
# Install TypeScript
npm install --save-dev typescript

# Initialize tsconfig.json
npx tsc --init

# Compile TypeScript files
npx tsc

# Watch mode
npx tsc --watch

# Type check only (no emit)
npx tsc --noEmit
```

## tsconfig.json Configuration

### Essential Settings

```json
{
  "compilerOptions": {
    // Language & Environment
    "target": "ES2020",                  // ECMAScript target version
    "lib": ["ES2020", "DOM"],            // Include library definitions
    "jsx": "react-jsx",                   // JSX support

    // Modules
    "module": "ESNext",                   // Module system
    "moduleResolution": "bundler",        // Module resolution strategy
    "resolveJsonModules": true,           // Import JSON files
    "esModuleInterop": true,              // CommonJS/ESM interop

    // Emit
    "outDir": "./dist",                   // Output directory
    "declaration": true,                  // Generate .d.ts files
    "declarationMap": true,               // Source maps for .d.ts
    "sourceMap": true,                    // Generate source maps
    "removeComments": true,               // Strip comments

    // Type Checking
    "strict": true,                       // Enable all strict checks
    "noImplicitAny": true,                // Error on implicit any
    "strictNullChecks": true,             // Strict null checking
    "strictFunctionTypes": true,          // Strict function types
    "noUnusedLocals": true,               // Error on unused locals
    "noUnusedParameters": true,           // Error on unused parameters
    "noImplicitReturns": true,            // Error on missing returns

    // Interop & Compatibility
    "skipLibCheck": true,                 // Skip type checking of .d.ts files
    "forceConsistentCasingInFileNames": true  // Consistent file naming
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### Configuration Presets

**For Node.js:**
```json
{
  "extends": "@tsconfig/node20/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

**For React:**
```json
{
  "extends": "@tsconfig/react/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

## Modern Build Tools

### Vite
Lightning-fast build tool with native TypeScript support.

**Key Features:**
- Instant server start
- Lightning-fast HMR (Hot Module Replacement)
- Native ESM support
- Optimized production builds
- TypeScript out of the box

**Setup:**
```bash
# Create Vite project with TypeScript
npm create vite@latest my-app -- --template react-ts

# Or add to existing project
npm install --save-dev vite
```

**Configuration (vite.config.ts):**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2020'
  }
});
```

### esbuild
Extremely fast JavaScript/TypeScript bundler written in Go.

**Key Features:**
- 10-100x faster than other bundlers
- Built-in TypeScript support
- Tree shaking
- Minification
- Source maps

**Setup:**
```bash
npm install --save-dev esbuild
```

**Build Script:**
```javascript
// build.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  target: 'node20',
  format: 'esm',
  sourcemap: true,
  minify: true
}).catch(() => process.exit(1));
```

### SWC
Rust-based TypeScript/JavaScript compiler (20x faster than Babel).

**Key Features:**
- Extremely fast compilation
- TypeScript support
- JSX/TSX transformation
- Plugin system
- Drop-in Babel replacement

**Setup:**
```bash
npm install --save-dev @swc/core @swc/cli
```

**Configuration (.swcrc):**
```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": true
    },
    "target": "es2020"
  },
  "module": {
    "type": "es6"
  }
}
```

### Webpack with ts-loader
Traditional bundler with TypeScript support.

**Setup:**
```bash
npm install --save-dev webpack webpack-cli ts-loader
```

**Configuration (webpack.config.js):**
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## Build Optimization Strategies

### Incremental Compilation
Enable faster rebuilds:

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  }
}
```

### Project References
For monorepos and large projects:

```json
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}

// packages/app/tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist"
  },
  "references": [
    { "path": "../core" }
  ]
}
```

### Skip Type Checking in Production
Use esbuild/swc for fast builds, tsc for type checking:

```json
{
  "scripts": {
    "build": "npm run type-check && npm run bundle",
    "type-check": "tsc --noEmit",
    "bundle": "esbuild src/index.ts --bundle --outfile=dist/index.js"
  }
}
```

### Tree Shaking
Remove unused code:

```json
{
  "compilerOptions": {
    "module": "ES2020",
    "moduleResolution": "bundler"
  }
}
```

## Development Workflow

### Watch Mode for Development

```bash
# TypeScript watch mode
tsc --watch

# Vite dev server
vite

# esbuild watch
esbuild src/index.ts --bundle --outfile=dist/index.js --watch

# ts-node for running TypeScript directly
npm install --save-dev ts-node
npx ts-node src/index.ts
```

### Hot Module Replacement (HMR)
Enable instant updates during development:

**Vite (automatic):**
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    hmr: true
  }
});
```

## Build Performance Tips

### 1. Use Modern Tools
- **esbuild** - 10-100x faster
- **swc** - 20x faster than Babel
- **Vite** - Instant server start

### 2. Enable Incremental Builds
```json
{
  "compilerOptions": {
    "incremental": true
  }
}
```

### 3. Skip Type Checking in Bundlers
Let bundlers focus on bundling, use tsc separately for type checking:

```bash
# Parallel: type check + bundle
npm-run-all --parallel type-check bundle
```

### 4. Optimize TypeScript Config
```json
{
  "compilerOptions": {
    "skipLibCheck": true,           // Skip checking node_modules
    "isolatedModules": true,        // Each file can be transpiled independently
    "noEmit": true                  // Don't emit when using bundler
  }
}
```

### 5. Use Project References
Split large projects into smaller ones for better caching.

## Build Tool Comparison

| Tool | Speed | TypeScript Support | Use Case |
|------|-------|-------------------|----------|
| **tsc** | Slow | Native | Type checking, declarations |
| **esbuild** | Fastest | Built-in | Production builds, bundling |
| **swc** | Very Fast | Built-in | Drop-in Babel replacement |
| **Vite** | Fast | Native | Modern web apps, HMR |
| **Webpack** | Moderate | Via loader | Complex apps, legacy support |
| **Rollup** | Moderate | Via plugin | Libraries, tree shaking |

## Common Patterns

### Dual Package (ESM + CommonJS)

```json
// package.json
{
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

**Build with tsup:**
```bash
npm install --save-dev tsup

# package.json
{
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts"
  }
}
```

### Library Publishing

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]
}
```

### Monorepo Setup

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

// packages/*/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

## Getting Started

### Quick Setup

**1. Initialize TypeScript:**
```bash
npm install --save-dev typescript
npx tsc --init
```

**2. Configure tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*"]
}
```

**3. Add Build Scripts:**
```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "type-check": "tsc --noEmit"
  }
}
```

**4. Optional: Add Fast Bundler:**
```bash
npm install --save-dev esbuild

# Add to scripts
{
  "scripts": {
    "bundle": "esbuild src/index.ts --bundle --outfile=dist/index.js --platform=node"
  }
}
```

## Best Practices

### 1. Separate Type Checking from Bundling
Use tsc for types, fast bundler for output.

### 2. Enable Strict Mode
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 3. Use Path Aliases
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

### 4. Generate Source Maps
```json
{
  "compilerOptions": {
    "sourceMap": true,
    "declarationMap": true
  }
}
```

### 5. Exclude Test Files from Build
```json
{
  "exclude": [
    "node_modules",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

## Next Steps

After mastering TypeScript build tools, explore:
- **Monorepo Tools** - Turborepo, Nx for multi-package projects
- **Bundle Analysis** - Optimize bundle size
- **Docker** - Containerize TypeScript apps
- **CI/CD** - Automate builds and deployments
- **Publishing** - Publish TypeScript libraries to npm

## Related Topics

- [TypeScript Fundamentals](../fundamentals/) - Core TypeScript concepts
- [TypeScript Testing](../testing/) - Test TypeScript code
