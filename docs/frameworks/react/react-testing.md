---
sidebar_position: 6
---

# React Testing Guide

Comprehensive guide to testing React applications with Jest, React Testing Library, and modern testing practices.

## Overview

Testing React applications ensures your components work correctly, handle user interactions properly, and maintain expected behavior as your app evolves.

### Testing Philosophy

**React Testing Library** follows these principles:
- Test your app the way users interact with it
- Avoid testing implementation details
- Focus on behavior, not internals
- Write maintainable, confidence-inspiring tests

## Setup

### Create React App (Built-in)

Create React App includes Jest and React Testing Library out of the box:

```bash
npx create-react-app my-app
cd my-app
npm test
```

### Manual Setup

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest
```

### Configuration

```javascript
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/index.js',
        '!src/reportWebVitals.js'
    ]
};
```

```javascript
// src/setupTests.js
import '@testing-library/jest-dom';
```

## Basic Component Testing

### Simple Functional Component

```javascript
// Button.jsx
export function Button({ onClick, children, disabled }) {
    return (
        <button onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
```

```javascript
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
    test('renders with text', () => {
        render(<Button>Click me</Button>);

        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    test('calls onClick when clicked', async () => {
        const handleClick = jest.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click me</Button>);

        await user.click(screen.getByText('Click me'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('is disabled when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>);

        expect(screen.getByText('Click me')).toBeDisabled();
    });
});
```

## Testing with Props

```javascript
// Greeting.jsx
export function Greeting({ name, isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? (
                <h1>Welcome back, {name}!</h1>
            ) : (
                <h1>Please sign in</h1>
            )}
        </div>
    );
}
```

```javascript
// Greeting.test.jsx
import { render, screen } from '@testing-library/react';
import { Greeting } from './Greeting';

describe('Greeting', () => {
    test('shows welcome message when logged in', () => {
        render(<Greeting name="John" isLoggedIn={true} />);

        expect(screen.getByText('Welcome back, John!')).toBeInTheDocument();
    });

    test('shows sign in message when not logged in', () => {
        render(<Greeting name="John" isLoggedIn={false} />);

        expect(screen.getByText('Please sign in')).toBeInTheDocument();
    });
});
```

## Testing State and Events

```javascript
// Counter.jsx
import { useState } from 'react';

export function Counter() {
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
```

```javascript
// Counter.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
    test('starts at zero', () => {
        render(<Counter />);

        expect(screen.getByText('Count: 0')).toBeInTheDocument();
    });

    test('increments count', async () => {
        const user = userEvent.setup();
        render(<Counter />);

        await user.click(screen.getByText('Increment'));

        expect(screen.getByText('Count: 1')).toBeInTheDocument();
    });

    test('decrements count', async () => {
        const user = userEvent.setup();
        render(<Counter />);

        await user.click(screen.getByText('Increment'));
        await user.click(screen.getByText('Decrement'));

        expect(screen.getByText('Count: 0')).toBeInTheDocument();
    });

    test('resets count', async () => {
        const user = userEvent.setup();
        render(<Counter />);

        await user.click(screen.getByText('Increment'));
        await user.click(screen.getByText('Increment'));
        await user.click(screen.getByText('Reset'));

        expect(screen.getByText('Count: 0')).toBeInTheDocument();
    });
});
```

## Testing Forms

```javascript
// LoginForm.jsx
import { useState } from 'react';

export function LoginForm({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Log In</button>
        </form>
    );
}
```

```javascript
// LoginForm.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
    test('submits form with email and password', async () => {
        const handleSubmit = jest.fn();
        const user = userEvent.setup();

        render(<LoginForm onSubmit={handleSubmit} />);

        // Fill in form
        await user.type(screen.getByLabelText('Email:'), 'john@example.com');
        await user.type(screen.getByLabelText('Password:'), 'password123');

        // Submit
        await user.click(screen.getByText('Log In'));

        expect(handleSubmit).toHaveBeenCalledWith({
            email: 'john@example.com',
            password: 'password123'
        });
    });

    test('updates input values as user types', async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={jest.fn()} />);

        const emailInput = screen.getByLabelText('Email:');
        await user.type(emailInput, 'test@example.com');

        expect(emailInput).toHaveValue('test@example.com');
    });
});
```

## Testing Hooks

### Custom Hook

```javascript
// useCounter.js
import { useState } from 'react';

export function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(initialValue);

    return { count, increment, decrement, reset };
}
```

```javascript
// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
    test('initializes with default value', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current.count).toBe(0);
    });

    test('initializes with custom value', () => {
        const { result } = renderHook(() => useCounter(10));

        expect(result.current.count).toBe(10);
    });

    test('increments count', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toBe(1);
    });

    test('decrements count', () => {
        const { result } = renderHook(() => useCounter(5));

        act(() => {
            result.current.decrement();
        });

        expect(result.current.count).toBe(4);
    });

    test('resets to initial value', () => {
        const { result } = renderHook(() => useCounter(10));

        act(() => {
            result.current.increment();
            result.current.increment();
            result.current.reset();
        });

        expect(result.current.count).toBe(10);
    });
});
```

## Testing Async Code

```javascript
// UserProfile.jsx
import { useState, useEffect } from 'react';

export function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return null;

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
}
```

```javascript
// UserProfile.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from './UserProfile';

// Mock fetch
global.fetch = jest.fn();

describe('UserProfile', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('displays loading state', () => {
        fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

        render(<UserProfile userId={1} />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('displays user data when loaded', async () => {
        const mockUser = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
        };

        fetch.mockResolvedValueOnce({
            json: async () => mockUser
        });

        render(<UserProfile userId={1} />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<UserProfile userId={1} />);

        await waitFor(() => {
            expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
        });
    });
});
```

## Testing Context

```javascript
// ThemeContext.js
import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
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

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
```

```javascript
// ThemedButton.jsx
import { useTheme } from './ThemeContext';

export function ThemedButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: theme === 'light' ? '#fff' : '#333',
                color: theme === 'light' ? '#000' : '#fff'
            }}
        >
            Current theme: {theme}
        </button>
    );
}
```

```javascript
// ThemedButton.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeContext';
import { ThemedButton } from './ThemedButton';

describe('ThemedButton', () => {
    test('displays current theme', () => {
        render(
            <ThemeProvider>
                <ThemedButton />
            </ThemeProvider>
        );

        expect(screen.getByText('Current theme: light')).toBeInTheDocument();
    });

    test('toggles theme on click', async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <ThemedButton />
            </ThemeProvider>
        );

        await user.click(screen.getByText('Current theme: light'));

        expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
    });
});
```

## Testing Redux

```javascript
// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        isLoggedIn: false
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.name = '';
            state.isLoggedIn = false;
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
```

```javascript
// UserDisplay.jsx
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './userSlice';

export function UserDisplay() {
    const { name, isLoggedIn } = useSelector(state => state.user);
    const dispatch = useDispatch();

    if (!isLoggedIn) {
        return <div>Not logged in</div>;
    }

    return (
        <div>
            <p>Welcome, {name}!</p>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    );
}
```

```javascript
// UserDisplay.test.jsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import userReducer from './userSlice';
import { UserDisplay } from './UserDisplay';

function renderWithRedux(
    component,
    { initialState, store = configureStore({
        reducer: { user: userReducer },
        preloadedState: initialState
    })} = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store
    };
}

describe('UserDisplay', () => {
    test('shows not logged in message when user is not authenticated', () => {
        renderWithRedux(<UserDisplay />);

        expect(screen.getByText('Not logged in')).toBeInTheDocument();
    });

    test('shows user name when logged in', () => {
        renderWithRedux(<UserDisplay />, {
            initialState: {
                user: { name: 'John', isLoggedIn: true }
            }
        });

        expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
    });

    test('logs out user on button click', async () => {
        const user = userEvent.setup();
        const { store } = renderWithRedux(<UserDisplay />, {
            initialState: {
                user: { name: 'John', isLoggedIn: true }
            }
        });

        await user.click(screen.getByText('Logout'));

        expect(store.getState().user.isLoggedIn).toBe(false);
    });
});
```

## Testing Router

```javascript
// Navigation.jsx
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
    const location = useLocation();

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <p>Current path: {location.pathname}</p>
        </nav>
    );
}
```

```javascript
// Navigation.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Navigation } from './Navigation';

function renderWithRouter(component, { route = '/' } = {}) {
    return render(
        <MemoryRouter initialEntries={[route]}>
            {component}
        </MemoryRouter>
    );
}

describe('Navigation', () => {
    test('renders all navigation links', () => {
        renderWithRouter(<Navigation />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    test('displays current path', () => {
        renderWithRouter(<Navigation />, { route: '/about' });

        expect(screen.getByText('Current path: /about')).toBeInTheDocument();
    });
});
```

## Snapshot Testing

```javascript
// Card.jsx
export function Card({ title, description, imageUrl }) {
    return (
        <div className="card">
            {imageUrl && <img src={imageUrl} alt={title} />}
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
```

```javascript
// Card.test.jsx
import { render } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
    test('matches snapshot', () => {
        const { container } = render(
            <Card
                title="Test Card"
                description="This is a test card"
                imageUrl="/test-image.jpg"
            />
        );

        expect(container).toMatchSnapshot();
    });

    test('matches snapshot without image', () => {
        const { container } = render(
            <Card
                title="Test Card"
                description="This is a test card"
            />
        );

        expect(container).toMatchSnapshot();
    });
});
```

## Best Practices

### 1. Query Priority

```javascript
// ✅ Good - Accessible to everyone
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText('Email');

// ⚠️ Okay - But not accessible to screen readers
screen.getByPlaceholderText('Enter email');
screen.getByText('Submit');

// ❌ Bad - Implementation details
screen.getByTestId('submit-button');
```

### 2. Avoid Implementation Details

```javascript
// ❌ Bad - Testing implementation
test('sets state correctly', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0); // Testing internal state
});

// ✅ Good - Testing behavior
test('displays correct count', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
});
```

### 3. Use User Events

```javascript
// ❌ Bad - fireEvent
import { fireEvent } from '@testing-library/react';
fireEvent.click(button);

// ✅ Good - userEvent (simulates real user interaction)
import userEvent from '@testing-library/user-event';
const user = userEvent.setup();
await user.click(button);
```

### 4. Test Accessibility

```javascript
test('form is accessible', () => {
    render(<LoginForm />);

    // Check for proper labels
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    // Check for button with accessible name
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
});
```

## Common Testing Patterns

### Test Helper Functions

```javascript
// testUtils.js
import { render } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { Provider } from 'react-redux';

export function renderWithProviders(
    component,
    { theme = 'light', store, ...options } = {}
) {
    return render(
        <Provider store={store}>
            <ThemeProvider initialTheme={theme}>
                {component}
            </ThemeProvider>
        </Provider>,
        options
    );
}
```

### Mock Service Worker (MSW)

```javascript
// mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    rest.get('/api/users/:userId', (req, res, ctx) => {
        return res(
            ctx.json({
                id: req.params.userId,
                name: 'John Doe',
                email: 'john@example.com'
            })
        );
    })
];
```

```javascript
// setupTests.js
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Resources

- [React Testing Library Documentation](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [Testing Library Queries Cheatsheet](https://testing-library.com/docs/queries/about)
- [Common Mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [MSW (Mock Service Worker)](https://mswjs.io/)

## Next Steps

- [Testing Fundamentals](../../testing/fundamentals/) - Core testing concepts
- [Mocking and Test Doubles](../../testing/fundamentals/test-doubles) - Advanced mocking techniques
- [TDD Guide](../../testing//fundamentals/tdd.md) - Test-Driven Development
