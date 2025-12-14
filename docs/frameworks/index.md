---
sidebar_position: 5
---

# Frontend Frameworks

Modern frontend frameworks make building interactive user interfaces faster, more maintainable, and scalable. Choose from industry-leading frameworks like React, Angular, and AngularJS.

## Available Frameworks

### [React](./react/)
A JavaScript library for building user interfaces with a component-based architecture.

**What you'll learn:**
- Components, JSX, and props
- Hooks (useState, useEffect, custom hooks)
- State management and routing
- Testing with React Testing Library

**Best for:** Single-page applications, mobile apps (React Native), flexible projects

**Popularity:** 220K+ GitHub stars, used by Facebook, Netflix, Airbnb

---

### [Angular](./angular/)
A complete framework for building dynamic web applications with TypeScript.

**What you'll learn:**
- Components, services, and dependency injection
- RxJS and reactive programming
- Forms, routing, and HTTP
- Testing with Jasmine and Karma

**Best for:** Enterprise applications, large teams, full-featured projects

**Popularity:** 95K+ GitHub stars, used by Google, Microsoft, Forbes

---

### [AngularJS](./angularjs/)
The original Angular framework (v1.x) - now in long-term support.

**What you'll learn:**
- Controllers, directives, and services
- Two-way data binding
- Routing and forms
- Migration strategies to modern Angular

**Best for:** Maintaining legacy applications, understanding Angular evolution

**Status:** End of Life (December 2021) - migrate to modern frameworks

---

## Framework Comparison

| Feature | React | Angular | AngularJS |
|---------|-------|---------|-----------|
| **Type** | Library | Framework | Framework |
| **Language** | JavaScript/JSX | TypeScript | JavaScript |
| **Learning Curve** | Moderate | Steep | Moderate |
| **Size** | Small (~40KB) | Large (~500KB) | Medium (~150KB) |
| **Architecture** | Component-based | MVC/MVVM | MVC/MVVM |
| **Data Binding** | One-way | Two-way | Two-way |
| **Mobile** | React Native | Ionic/NativeScript | Ionic (legacy) |
| **State Management** | Context, Redux | Services, NgRx | Services, $scope |
| **CLI** | Create React App | Angular CLI | None (manual setup) |
| **Testing** | Jest, RTL | Jasmine, Karma | Jasmine, Karma |
| **Status** | Active | Active | EOL (End of Life) |

## When to Use Each Framework

### Choose React if:
- You want flexibility and control
- You prefer a minimalist library over a full framework
- You need to integrate with existing projects easily
- You want a large ecosystem of third-party libraries
- You're building mobile apps with React Native
- Your team prefers JavaScript over TypeScript

### Choose Angular if:
- You need a complete, opinionated framework
- You're building large-scale enterprise applications
- You prefer TypeScript and strong typing
- You want everything included out-of-the-box
- Your team values structure and conventions
- You need built-in solutions (routing, HTTP, forms, etc.)

### Choose AngularJS if:
- You're maintaining an existing AngularJS application
- You need to understand legacy code
- ⚠️ **Not recommended for new projects** (End of Life)

## Learning Paths

### React Developer Path
1. [JavaScript](../languages/javascript/)
2. [React fundamentals](./react/fundamentals/)
3. [React testing](./react/react-testing)
4. State management (Redux, Context API)
5. Next.js for server-side rendering

### Angular Developer Path
1. [TypeScript](../languages/typescript/)
2. [Angular fundamentals](./angular/fundamentals/)
3. [Angular testing](./angular/angular-testing/)
4. RxJS and reactive programming
5. NgRx for state management

### Migrating from AngularJS
1. Review [AngularJS fundamentals](./angularjs/fundamentals/)
2. Learn [Angular fundamentals](./angular/fundamentals/)
3. Incremental upgrade or full rewrite

## Common Concepts

All modern frameworks share similar concepts:

### Components
Reusable UI building blocks with their own logic and styling.

```jsx
// React
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

```typescript
// Angular
@Component({
  selector: 'app-button',
  template: '<button (click)="onClick()">{{ label }}</button>'
})
export class ButtonComponent {
  @Input() label: string;
  @Output() clicked = new EventEmitter();

  onClick() {
    this.clicked.emit();
  }
}
```

### State Management
Managing application data and UI state.

- **React:** useState, useReducer, Context API, Redux
- **Angular:** Services, RxJS BehaviorSubjects, NgRx
- **AngularJS:** $scope, Services

### Routing
Navigate between different views/pages without full page reload.

- **React:** React Router
- **Angular:** Angular Router (built-in)
- **AngularJS:** ngRoute, UI-Router

### Forms
Handle user input with validation.

- **React:** Controlled components, Formik, React Hook Form
- **Angular:** Template-driven forms, Reactive forms (built-in)
- **AngularJS:** ng-model, ng-form

## Testing Your Framework

Every framework needs testing:

- **[React Testing](./react/react-testing)** - React Testing Library, Jest
- **[Angular Testing](./angular/angular-testing)** - Jasmine, Karma, TestBed
- **[AngularJS Testing](./angularjs/angularjs-testing)** - Jasmine, Karma, Protractor
- **[Testing Fundamentals](../testing/fundamentals/)** - Cross-framework concepts

## Framework Ecosystem

### React Ecosystem
- **State Management:** Redux, MobX, Zustand, Recoil
- **Routing:** React Router, Reach Router
- **SSR/SSG:** Next.js, Gatsby
- **Mobile:** React Native
- **UI Libraries:** Material-UI, Ant Design, Chakra UI
- **Forms:** Formik, React Hook Form

### Angular Ecosystem
- **State Management:** NgRx, Akita, NGXS
- **UI Libraries:** Angular Material, PrimeNG, ng-bootstrap
- **Mobile:** Ionic, NativeScript
- **SSR:** Angular Universal
- **Testing:** Angular Testing Library, Spectator

### AngularJS Ecosystem (Legacy)
- **Routing:** UI-Router
- **UI Libraries:** Angular Material (v1), UI Bootstrap
- **Mobile:** Ionic (v1)
- **State Management:** angular-redux

## Migration Guides

### From AngularJS to Angular
- Hybrid approach (ngUpgrade)
- Component-by-component migration
- Full rewrite considerations

### From Other Frameworks to React
- Similar component model
- Different state management approach
- JSX instead of templates

### From React to Angular
- TypeScript learning curve
- Opinionated structure
- RxJS for async operations

## Performance Considerations

### React
- Virtual DOM for efficient updates
- Code splitting with React.lazy
- Memoization (useMemo, useCallback, React.memo)
- Server-side rendering with Next.js

### Angular
- Ahead-of-Time (AOT) compilation
- Tree shaking and dead code elimination
- Lazy loading routes
- OnPush change detection strategy

### AngularJS
- Digest cycle can be slow with many watchers
- One-time binding for static data
- track by in ng-repeat
- Limited optimization options

## Industry Usage

### React
- **Companies:** Facebook, Netflix, Airbnb, Uber, Instagram
- **Market Share:** ~40% of frameworks
- **Job Market:** Highest demand

### Angular
- **Companies:** Google, Microsoft, Forbes, Deutsche Bank, Samsung
- **Market Share:** ~20% of frameworks
- **Job Market:** Strong enterprise demand

### AngularJS
- **Companies:** Legacy applications only
- **Market Share:** Declining rapidly
- **Job Market:** Maintenance work only

## Getting Started

Ready to dive in?

1. **New to frontend frameworks?** Start with [React](./react/) - it's the most popular and has abundant resources
2. **Enterprise developer?** Try [Angular](./angular/) for a complete, opinionated solution
3. **Maintaining legacy code?** Review [AngularJS](./angularjs/) fundamentals and plan migration

## Resources

### React
- [React Official Docs](https://react.dev/)
- [React Tutorial](https://react.dev/learn)
- [Create React App](https://create-react-app.dev/)

### Angular
- [Angular Official Docs](https://angular.io/docs)
- [Angular Tutorial](https://angular.io/tutorial)
- [Angular CLI](https://angular.io/cli)

### AngularJS
- [AngularJS Official Docs](https://docs.angularjs.org/)
- [AngularJS to Angular Migration](https://angular.io/guide/upgrade)

---

**The best framework is the one that fits your project needs and team expertise. Start learning today!**
