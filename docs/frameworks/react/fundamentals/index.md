---
sidebar_position: 1
---

# React Fundamentals

A declarative, component-based JavaScript library for building user interfaces, maintained by Meta (Facebook) and a community of developers.

## What is React?

React is a **JavaScript library** (not a full framework) for building user interfaces, particularly single-page applications where you need a fast, interactive user experience. It focuses on the view layer and uses a virtual DOM to efficiently update and render components.

### Key Characteristics

- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Describe what the UI should look like, React handles the updates
- **Learn Once, Write Anywhere**: Build web apps, mobile apps (React Native), desktop apps
- **Virtual DOM**: Efficient rendering through a lightweight representation of the actual DOM
- **Unidirectional Data Flow**: Data flows down from parent to child components
- **JSX**: Write HTML-like syntax in JavaScript

## Quick Start

### Installation

**Create New React App (Vite - Recommended)**:
```bash
# Using Vite (faster, modern)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

**Create React App (Traditional)**:
```bash
# Using Create React App
npx create-react-app my-app
cd my-app
npm start
```

**Add React to Existing Project**:
```bash
npm install react react-dom
```

### Your First React Component

**App.jsx**:
```jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Hello React!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;
```

**main.jsx** (Entry point):
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Core Concepts

### 1. Components

Components are the building blocks of React applications.

**Functional Components (Modern Approach)**:
```jsx
// Simple component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow function syntax
const Greeting = ({ name, age }) => {
  return (
    <div>
      <h2>Welcome {name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};

// Usage
<Welcome name="Alice" />
<Greeting name="Bob" age={30} />
```

**Class Components (Legacy)**:
```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### 2. JSX (JavaScript XML)

JSX allows you to write HTML-like syntax in JavaScript.

```jsx
// JSX syntax
const element = <h1>Hello, world!</h1>;

// With expressions
const name = 'Alice';
const element = <h1>Hello, {name}!</h1>;

// With attributes
const element = <img src={user.avatarUrl} alt={user.name} />;

// Multi-line JSX
const element = (
  <div>
    <h1>Hello!</h1>
    <p>Welcome to React</p>
  </div>
);

// JSX is transformed to:
const element = React.createElement(
  'h1',
  null,
  'Hello, world!'
);
```

**JSX Rules**:
- Must return a single parent element
- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- Self-closing tags must end with `/>`
- JavaScript expressions use `{}`

```jsx
// ✅ Good - single parent
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// ✅ Good - using Fragment
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);

// ❌ Bad - multiple parents
return (
  <h1>Title</h1>
  <p>Content</p>
);
```

### 3. Props (Properties)

Props are used to pass data from parent to child components.

```jsx
// Parent component
function App() {
  return (
    <div>
      <UserCard
        name="Alice"
        email="alice@example.com"
        age={28}
        isActive={true}
      />
    </div>
  );
}

// Child component
function UserCard({ name, email, age, isActive }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      <span>{isActive ? 'Active' : 'Inactive'}</span>
    </div>
  );
}

// With default props
function Button({ text = 'Click me', onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

// Props are read-only
function Welcome({ name }) {
  // ❌ Never do this
  // name = 'Modified'; // Props are immutable

  return <h1>Hello, {name}!</h1>;
}
```

**Prop Types (Type Checking)**:
```jsx
import PropTypes from 'prop-types';

function UserCard({ name, email, age, isActive }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number,
  isActive: PropTypes.bool
};

UserCard.defaultProps = {
  age: 0,
  isActive: false
};
```

### 4. State

State is used to manage data that changes over time within a component.

**useState Hook**:
```jsx
import { useState } from 'react';

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Multiple state variables
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
    </form>
  );
}

// Object state
function UserProfile() {
  const [user, setUser] = useState({
    name: 'Alice',
    email: 'alice@example.com',
    age: 28
  });

  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };

  return (
    <div>
      <p>{user.name} - {user.email}</p>
      <button onClick={() => updateName('Bob')}>Change Name</button>
    </div>
  );
}
```

### 5. Event Handling

```jsx
function EventExamples() {
  const [text, setText] = useState('');

  // Click event
  const handleClick = () => {
    alert('Button clicked!');
  };

  // With event object
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  // Input change
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // With parameters
  const handleDelete = (id) => {
    console.log(`Deleting item ${id}`);
  };

  return (
    <div>
      {/* Click event */}
      <button onClick={handleClick}>Click Me</button>

      {/* Inline arrow function */}
      <button onClick={() => console.log('Clicked')}>Log</button>

      {/* With parameter */}
      <button onClick={() => handleDelete(123)}>Delete</button>

      {/* Form submission */}
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={handleChange}
          onFocus={() => console.log('Focused')}
          onBlur={() => console.log('Blurred')}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

### 6. Conditional Rendering

```jsx
function UserGreeting({ isLoggedIn, username }) {
  // Using if/else
  if (isLoggedIn) {
    return <h1>Welcome back, {username}!</h1>;
  }
  return <h1>Please sign in.</h1>;
}

function Dashboard({ user }) {
  // Using ternary operator
  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
}

function Notifications({ count }) {
  // Using && operator
  return (
    <div>
      {count > 0 && <p>You have {count} notifications</p>}
      {count === 0 && <p>No new notifications</p>}
    </div>
  );
}

function Status({ status }) {
  // Using switch/case
  switch(status) {
    case 'loading':
      return <Spinner />;
    case 'error':
      return <ErrorMessage />;
    case 'success':
      return <SuccessMessage />;
    default:
      return null;
  }
}
```

### 7. Lists and Keys

```jsx
function UserList() {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => handleDelete(todo.id)}
        />
      ))}
    </ul>
  );
}

// ⚠️ Keys should be stable, unique identifiers
// ❌ Avoid using array index as key if items can be reordered
{items.map((item, index) => (
  <li key={index}>{item}</li>  // Avoid this if possible
))}

// ✅ Use unique IDs
{items.map((item) => (
  <li key={item.id}>{item.name}</li>
))}
```

## React Hooks

Hooks let you use state and other React features in functional components.

### useState

```jsx
const [state, setState] = useState(initialValue);

// Examples
const [count, setCount] = useState(0);
const [name, setName] = useState('Alice');
const [isActive, setIsActive] = useState(true);
const [items, setItems] = useState([]);
const [user, setUser] = useState({ name: '', email: '' });

// Lazy initialization (expensive computation)
const [data, setData] = useState(() => {
  return expensiveComputation();
});
```

### useEffect

Handle side effects like data fetching, subscriptions, or manual DOM manipulation.

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs after every render
  useEffect(() => {
    console.log('Component rendered');
  });

  // Runs once on mount (empty dependency array)
  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  // Runs when userId changes
  useEffect(() => {
    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });

    // Cleanup function
    return () => {
      // Cancel request, clear timers, etc.
    };
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  return <div>{user.name}</div>;
}

// Common patterns
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  return <p>Seconds: {seconds}</p>;
}
```

### useContext

Share data across components without prop drilling.

```jsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme === 'light' ? '#fff' : '#333' }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### useReducer

Alternative to useState for complex state logic.

```jsx
import { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

### useRef

Access DOM elements or persist values across renders.

```jsx
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}

// Storing mutable value (doesn't cause re-render)
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### useMemo and useCallback

Optimize performance by memoizing values and functions.

```jsx
import { useMemo, useCallback, useState } from 'react';

function ExpensiveComponent({ items }) {
  // Memoize expensive calculation
  const total = useMemo(() => {
    console.log('Calculating total...');
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]); // Only recalculate when items change

  return <p>Total: ${total}</p>;
}

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // Memoize callback function
  const handleAddItem = useCallback((item) => {
    setItems(prevItems => [...prevItems, item]);
  }, []); // Function reference stays the same

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ChildComponent onAddItem={handleAddItem} />
    </div>
  );
}
```

### Custom Hooks

Create reusable stateful logic.

```jsx
// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

## Routing (React Router)

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Access route parameters
function UserDetail() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}

// Programmatic navigation
function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // After login
    navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

## State Management

### Context API (Built-in)

For simple global state:

```jsx
// Create context
const AppContext = createContext();

// Provider
function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for consuming context
function useApp() {
  return useContext(AppContext);
}

// Usage in components
function Header() {
  const { user } = useApp();
  return <p>Welcome, {user?.name}</p>;
}
```

### Redux (Popular Library)

For complex applications:

```bash
npm install @reduxjs/toolkit react-redux
```

```jsx
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Create slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Create store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// Component
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>
        Increment
      </button>
    </div>
  );
}

// App wrapper
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

## Pros and Cons

### Pros ✅

**1. Flexibility**
- Not opinionated about structure
- Choose your own tools and libraries
- Easy to integrate with existing projects

**2. Component Reusability**
- Build once, use everywhere
- Rich ecosystem of third-party components
- Easy to share components across projects

**3. Virtual DOM**
- Fast and efficient rendering
- Optimized updates
- Great performance for dynamic UIs

**4. Large Ecosystem**
- Huge community and resources
- Thousands of libraries and tools
- Extensive documentation and tutorials

**5. Developer Experience**
- JSX makes templates readable
- React DevTools for debugging
- Hot module replacement
- Great error messages

**6. React Native**
- Reuse skills for mobile development
- Share code between web and mobile
- Large mobile development community

**7. Backed by Meta**
- Well-maintained and stable
- Regular updates and improvements
- Used in production by Facebook, Instagram, Netflix, etc.

**8. Learning Curve**
- Simple core concepts
- Focus on JavaScript skills
- Modern functional programming patterns

### Cons ❌

**1. Just a View Library**
- Need additional libraries for routing, state management
- More decisions to make
- Can lead to analysis paralysis

**2. JSX Learning Curve**
- Mixing HTML and JavaScript feels weird initially
- Need to learn JSX syntax quirks
- Build setup required

**3. Rapid Changes**
- Ecosystem changes frequently
- Best practices evolve quickly
- Tutorials become outdated

**4. SEO Challenges**
- Client-side rendering by default
- Need Next.js or SSR for better SEO
- Initial page load can be slow

**5. Boilerplate Code**
- Can be verbose for simple tasks
- Redux adds significant boilerplate
- Configuration complexity

**6. Documentation**
- Official docs assume JavaScript knowledge
- Third-party libraries have varying doc quality
- Version mismatches in tutorials

**7. Bundle Size**
- React + ecosystem can be large
- Need careful optimization
- Longer initial load times

## When to Use React

### Great For:

- **Single Page Applications (SPAs)**
- **Complex, interactive UIs** with frequent updates
- **Projects requiring flexibility** in architecture
- **Teams with strong JavaScript skills**
- **Cross-platform development** (web + React Native)
- **Large-scale applications** with many developers
- **Projects needing rich ecosystem** of libraries
- **Progressive enhancement** of existing sites

### Not Ideal For:

- **Simple static websites** (use plain HTML/CSS or static generators)
- **SEO-critical sites** without SSR (unless using Next.js)
- **Projects requiring built-in solutions** (prefer Angular)
- **Teams preferring opinionated frameworks**
- **Very small projects** (overhead not worth it)

## Popular React Libraries

### UI Component Libraries
- **Material-UI (MUI)** - Material Design components
- **Ant Design** - Enterprise-grade UI
- **Chakra UI** - Accessible components
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Copy-paste components

### Routing
- **React Router** - Standard routing solution
- **TanStack Router** - Type-safe routing

### State Management
- **Redux Toolkit** - Predictable state container
- **Zustand** - Minimal state management
- **Jotai** - Atomic state management
- **MobX** - Observable state
- **Recoil** - Facebook's state library

### Data Fetching
- **TanStack Query (React Query)** - Server state management
- **SWR** - Stale-while-revalidate
- **Apollo Client** - GraphQL client
- **Axios** - HTTP client

### Forms
- **React Hook Form** - Performant forms
- **Formik** - Form management
- **Yup** - Validation schema

### Testing
- **React Testing Library** - User-centric testing
- **Jest** - Test runner
- **Vitest** - Fast test runner
- **Cypress** - E2E testing

### Meta-Frameworks
- **Next.js** - SSR, SSG, routing, API routes
- **Remix** - Full-stack framework
- **Gatsby** - Static site generator

## Best Practices

### 1. Component Organization

```jsx
// ✅ Good - Single responsibility
function UserCard({ user }) {
  return (
    <div>
      <UserAvatar src={user.avatar} />
      <UserInfo name={user.name} email={user.email} />
      <UserActions userId={user.id} />
    </div>
  );
}

// ❌ Avoid - Too many responsibilities
function MegaComponent() {
  // Don't put everything in one component
}
```

### 2. Props Destructuring

```jsx
// ✅ Good
function User({ name, email, age }) {
  return <div>{name} - {email}</div>;
}

// ❌ Avoid
function User(props) {
  return <div>{props.name} - {props.email}</div>;
}
```

### 3. Conditional Rendering

```jsx
// ✅ Good - Clear and readable
{isLoggedIn && <UserDashboard />}
{error && <ErrorMessage error={error} />}

// ❌ Avoid - Complex nested ternaries
{isLoggedIn ? (
  user ? (
    user.isAdmin ? <AdminPanel /> : <UserPanel />
  ) : <Loading />
) : <Login />}
```

### 4. State Management

```jsx
// ✅ Good - Keep state close to where it's used
function Form() {
  const [email, setEmail] = useState('');
  // ...
}

// ✅ Good - Lift state up when needed
function Parent() {
  const [sharedState, setSharedState] = useState('');
  return (
    <>
      <ChildA state={sharedState} setState={setSharedState} />
      <ChildB state={sharedState} />
    </>
  );
}
```

### 5. useEffect Cleanup

```jsx
// ✅ Good - Cleanup side effects
useEffect(() => {
  const subscription = subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### 6. Key Props in Lists

```jsx
// ✅ Good - Stable unique keys
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// ❌ Avoid - Index as key (when items can reorder)
{users.map((user, index) => (
  <UserCard key={index} user={user} />
))}
```

## Resources

### Official Documentation
- [React Docs](https://react.dev/) - Official documentation
- [React Tutorial](https://react.dev/learn) - Interactive tutorial
- [React API Reference](https://react.dev/reference/react)

### Learning Resources
- [React Roadmap](https://roadmap.sh/react) - Learning path
- [Full Stack Open](https://fullstackopen.com/) - Free course
- [Epic React](https://epicreact.dev/) - Kent C. Dodds course
- [React Patterns](https://reactpatterns.com/) - Common patterns

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools) - Browser extension
- [Vite](https://vitejs.dev/) - Fast build tool
- [Create React App](https://create-react-app.dev/) - Zero-config setup

### Community
- [React GitHub](https://github.com/facebook/react)
- [React Discord](https://discord.gg/react)
- [r/reactjs](https://www.reddit.com/r/reactjs/)

## Next Steps

After learning React basics:
1. **Build projects** - Todo app, weather app, e-commerce
2. **Learn React Router** - For multi-page applications
3. **State Management** - Redux Toolkit or Zustand
4. **Data Fetching** - React Query or SWR
5. **Testing** - React Testing Library (see [React Testing Guide](../react-testing))
6. **Next.js** - For production-ready applications
7. **TypeScript** - Add type safety to React
8. **Performance Optimization** - Code splitting, lazy loading, memoization
