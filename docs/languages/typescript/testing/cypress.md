---
sidebar_position: 2
---

# Cypress E2E Testing

Cypress is a next-generation front-end testing tool built for the modern web. It provides excellent TypeScript support and enables reliable, fast end-to-end testing with a great developer experience.

## Why Cypress for TypeScript?

### Strengths
- **First-Class TypeScript Support** - Built-in type definitions
- **Real Browser Testing** - Tests run in actual browsers
- **Time Travel** - Debug by traveling back to each command
- **Automatic Waiting** - No need for explicit waits
- **Network Stubbing** - Mock API responses easily
- **Great DX** - Interactive Test Runner with hot reload
- **Fast** - Runs directly in the browser

### Use Cases
- End-to-end web application testing
- Integration testing of UI components
- API testing
- Visual regression testing
- Cross-browser testing

## Installation

```bash
# Install Cypress
npm install --save-dev cypress

# Install TypeScript (if not already installed)
npm install --save-dev typescript

# Open Cypress for first-time setup
npx cypress open
```

## Configuration

### cypress.config.ts
```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'src/**/*.cy.ts',
  },
});
```

### tsconfig.json for Cypress
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["cypress", "node"]
  },
  "include": ["cypress/**/*"],
  "exclude": ["node_modules"]
}
```

### package.json Scripts
```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:run:chrome": "cypress run --browser chrome",
    "cypress:run:firefox": "cypress run --browser firefox",
    "test:e2e": "cypress run"
  }
}
```

## Basic Examples

### Simple E2E Test

```typescript
// cypress/e2e/login.cy.ts
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('h1').should('contain', 'Login');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should successfully log in with valid credentials', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Dashboard');
  });

  it('should show error with invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('should validate email format', () => {
    cy.get('input[name="email"]').type('notanemail');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="email"]:invalid').should('exist');
  });
});
```

## Type-Safe Custom Commands

### Define Custom Commands

```typescript
// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in a user
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Get element by data-testid attribute
       * @example cy.getByTestId('submit-button')
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Create a user via API
       * @example cy.createUser({ name: 'John', email: 'john@example.com' })
       */
      createUser(user: Partial<User>): Chainable<User>;

      /**
       * Mock API response
       * @example cy.mockApi('GET', '/api/users', { users: [] })
       */
      mockApi(
        method: string,
        url: string,
        response: any,
        statusCode?: number
      ): Chainable<void>;
    }
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('createUser', (user: Partial<User>) => {
  return cy.request<User>('POST', '/api/users', {
    name: user.name || 'Test User',
    email: user.email || 'test@example.com',
    role: user.role || 'user',
  }).then((response) => response.body);
});

Cypress.Commands.add(
  'mockApi',
  (method: string, url: string, response: any, statusCode: number = 200) => {
    cy.intercept(method, url, {
      statusCode,
      body: response,
    });
  }
);

export {};
```

### Use Custom Commands

```typescript
// cypress/e2e/dashboard.cy.ts
describe('Dashboard', () => {
  beforeEach(() => {
    cy.login('user@example.com', 'password123');
    cy.visit('/dashboard');
  });

  it('should display user information', () => {
    cy.getByTestId('user-name').should('contain', 'Test User');
    cy.getByTestId('user-email').should('contain', 'user@example.com');
  });

  it('should load user data from API', () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin' as const,
    };

    cy.mockApi('GET', '/api/users/me', mockUser);
    cy.visit('/dashboard');

    cy.getByTestId('user-name').should('contain', 'John Doe');
    cy.getByTestId('user-role').should('contain', 'admin');
  });
});
```

## API Testing

```typescript
// cypress/e2e/api/users.cy.ts
describe('User API', () => {
  interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  }

  const baseUrl = Cypress.config('baseUrl');

  describe('GET /api/users', () => {
    it('should return list of users', () => {
      cy.request<User[]>('GET', `${baseUrl}/api/users`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        const user = response.body[0];
        expect(user).to.have.property('id');
        expect(user).to.have.property('name');
        expect(user).to.have.property('email');
        expect(user).to.have.property('role');
      });
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', () => {
      const newUser = {
        name: 'Jane Doe',
        email: `jane-${Date.now()}@example.com`,
        role: 'user' as const,
      };

      cy.request<User>('POST', `${baseUrl}/api/users`, newUser).then(
        (response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.property('id');
          expect(response.body.name).to.equal(newUser.name);
          expect(response.body.email).to.equal(newUser.email);
          expect(response.body.role).to.equal(newUser.role);
        }
      );
    });

    it('should reject invalid email', () => {
      const invalidUser = {
        name: 'Invalid User',
        email: 'not-an-email',
        role: 'user' as const,
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/api/users`,
        body: invalidUser,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
      });
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user information', () => {
      // First create a user
      cy.createUser({ name: 'Original Name' }).then((user) => {
        const updates = { name: 'Updated Name' };

        cy.request<User>('PUT', `${baseUrl}/api/users/${user.id}`, updates).then(
          (response) => {
            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal('Updated Name');
            expect(response.body.id).to.equal(user.id);
          }
        );
      });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', () => {
      cy.createUser({ name: 'To Delete' }).then((user) => {
        cy.request('DELETE', `${baseUrl}/api/users/${user.id}`).then(
          (response) => {
            expect(response.status).to.equal(204);
          }
        );

        // Verify user is deleted
        cy.request({
          method: 'GET',
          url: `${baseUrl}/api/users/${user.id}`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(404);
        });
      });
    });
  });
});
```

## Network Interception

### Stubbing API Responses

```typescript
// cypress/e2e/products.cy.ts
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

describe('Product List', () => {
  it('should display products from API', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', price: 29.99, inStock: true },
      { id: 2, name: 'Product 2', price: 49.99, inStock: false },
      { id: 3, name: 'Product 3', price: 19.99, inStock: true },
    ];

    cy.intercept('GET', '/api/products', {
      statusCode: 200,
      body: mockProducts,
    }).as('getProducts');

    cy.visit('/products');
    cy.wait('@getProducts');

    cy.get('[data-testid="product-item"]').should('have.length', 3);
    cy.get('[data-testid="product-item"]').first().should('contain', 'Product 1');
  });

  it('should handle loading state', () => {
    cy.intercept('GET', '/api/products', {
      delay: 1000,
      statusCode: 200,
      body: [],
    }).as('getProducts');

    cy.visit('/products');
    cy.get('[data-testid="loading-spinner"]').should('be.visible');

    cy.wait('@getProducts');
    cy.get('[data-testid="loading-spinner"]').should('not.exist');
  });

  it('should handle API errors', () => {
    cy.intercept('GET', '/api/products', {
      statusCode: 500,
      body: { error: 'Internal server error' },
    }).as('getProducts');

    cy.visit('/products');
    cy.wait('@getProducts');

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Failed to load products');
  });
});
```

### Spying on Requests

```typescript
describe('Form Submission', () => {
  it('should send correct data to API', () => {
    cy.intercept('POST', '/api/contact').as('submitForm');

    cy.visit('/contact');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('textarea[name="message"]').type('Test message');
    cy.get('button[type="submit"]').click();

    cy.wait('@submitForm').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      });
      expect(interception.response?.statusCode).to.equal(200);
    });
  });
});
```

## Component Testing

```typescript
// src/components/Button.cy.ts
import React from 'react';
import { mount } from 'cypress/react18';
import Button from './Button';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

describe('Button Component', () => {
  it('should render with label', () => {
    mount(<Button label="Click me" />);
    cy.get('button').should('contain', 'Click me');
  });

  it('should call onClick when clicked', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    mount(<Button label="Click me" onClick={onClickSpy} />);

    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.calledOnce');
  });

  it('should apply variant classes', () => {
    mount(<Button label="Primary" variant="primary" />);
    cy.get('button').should('have.class', 'btn-primary');

    mount(<Button label="Danger" variant="danger" />);
    cy.get('button').should('have.class', 'btn-danger');
  });

  it('should be disabled when disabled prop is true', () => {
    mount(<Button label="Disabled" disabled={true} />);
    cy.get('button').should('be.disabled');
  });

  it('should not call onClick when disabled', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    mount(<Button label="Disabled" onClick={onClickSpy} disabled={true} />);

    cy.get('button').click({ force: true });
    cy.get('@onClickSpy').should('not.have.been.called');
  });
});
```

## Advanced Patterns

### Page Object Model

```typescript
// cypress/support/pages/LoginPage.ts
export class LoginPage {
  private selectors = {
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    submitButton: 'button[type="submit"]',
    errorMessage: '.error-message',
  };

  visit(): void {
    cy.visit('/login');
  }

  fillEmail(email: string): this {
    cy.get(this.selectors.emailInput).type(email);
    return this;
  }

  fillPassword(password: string): this {
    cy.get(this.selectors.passwordInput).type(password);
    return this;
  }

  submit(): this {
    cy.get(this.selectors.submitButton).click();
    return this;
  }

  login(email: string, password: string): this {
    return this.fillEmail(email).fillPassword(password).submit();
  }

  assertErrorMessage(message: string): this {
    cy.get(this.selectors.errorMessage).should('contain', message);
    return this;
  }

  assertRedirectToDashboard(): this {
    cy.url().should('include', '/dashboard');
    return this;
  }
}

// cypress/e2e/login-page-object.cy.ts
import { LoginPage } from '../support/pages/LoginPage';

describe('Login with Page Object', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully', () => {
    loginPage
      .login('user@example.com', 'password123')
      .assertRedirectToDashboard();
  });

  it('should show error for invalid credentials', () => {
    loginPage
      .login('invalid@example.com', 'wrongpassword')
      .assertErrorMessage('Invalid credentials');
  });
});
```

### Test Fixtures

```typescript
// cypress/fixtures/users.json
{
  "validUser": {
    "email": "user@example.com",
    "password": "password123"
  },
  "adminUser": {
    "email": "admin@example.com",
    "password": "admin123"
  },
  "testUsers": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "admin"
    }
  ]
}
```

```typescript
// cypress/e2e/users-fixture.cy.ts
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

describe('Users with Fixtures', () => {
  it('should use fixture data', () => {
    cy.fixture<{ testUsers: User[] }>('users').then((data) => {
      cy.intercept('GET', '/api/users', {
        statusCode: 200,
        body: data.testUsers,
      });

      cy.visit('/users');

      data.testUsers.forEach((user) => {
        cy.contains(user.name).should('be.visible');
      });
    });
  });
});
```

## Best Practices

### 1. Use data-testid Attributes
```typescript
// Good - resilient to UI changes
cy.get('[data-testid="submit-button"]').click();

// Bad - fragile
cy.get('.btn.btn-primary.submit-btn').click();
```

### 2. Avoid Hard-Coded Waits
```typescript
// Bad
cy.wait(5000);
cy.get('.result').should('be.visible');

// Good - Cypress waits automatically
cy.get('.result').should('be.visible');
```

### 3. Use Aliases for Better Readability
```typescript
cy.intercept('GET', '/api/users').as('getUsers');
cy.visit('/users');
cy.wait('@getUsers');
```

### 4. Clean Up State Between Tests
```typescript
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  // Reset database or mock state
});
```

### 5. Type Your Custom Commands
```typescript
// Always add TypeScript definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      customCommand(): Chainable<void>;
    }
  }
}
```

## Common Cypress Commands

```typescript
// Navigation
cy.visit('/path');
cy.go('back');
cy.reload();

// Querying
cy.get('.selector');
cy.contains('text');
cy.find('.child');
cy.first();
cy.last();
cy.eq(2);

// Actions
cy.click();
cy.type('text');
cy.clear();
cy.check();
cy.uncheck();
cy.select('option');

// Assertions
cy.should('be.visible');
cy.should('have.text', 'text');
cy.should('have.class', 'active');
cy.should('have.attr', 'href', '/link');

// Network
cy.intercept('GET', '/api/*');
cy.request('POST', '/api/endpoint');

// Utilities
cy.wait(1000);
cy.wait('@alias');
cy.log('message');
cy.screenshot();
```

## Related Topics

- [TypeScript Testing Overview](./index.md) - Testing framework comparison
- [Mocha + Chai Testing](./mocha-chai.md) - Unit testing with Mocha and Chai
- [TypeScript Fundamentals](../fundamentals/) - Core TypeScript concepts
