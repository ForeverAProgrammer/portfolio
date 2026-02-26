---
sidebar_position: 4
---

# Behavior-Driven Development (BDD)

Behavior-Driven Development extends Test-Driven Development by writing tests in plain language that describe **behavior** from a user's perspective. BDD bridges the gap between technical and non-technical stakeholders.

## What is BDD?

**Behavior-Driven Development (BDD)** is a software development approach that:

- Describes application behavior in **plain language** (Given-When-Then)
- Focuses on **user stories** and business value
- Enables **collaboration** between developers, testers, and stakeholders
- Uses **examples** to specify requirements
- Builds upon TDD principles

---

## BDD vs TDD

### TDD (Test-Driven Development)

```javascript
// Technical, developer-focused
test('add should return sum of two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

### BDD (Behavior-Driven Development)

```gherkin
# Business-focused, readable by anyone
Feature: Calculator Addition
  Scenario: Add two numbers
    Given I have a calculator
    When I add 2 and 3
    Then the result should be 5
```

### Key Differences

| Aspect | TDD | BDD |
|--------|-----|-----|
| **Language** | Technical (code) | Plain language |
| **Focus** | Testing implementation | Describing behavior |
| **Audience** | Developers | Everyone (stakeholders, QA, developers) |
| **Format** | Test assertions | Given-When-Then scenarios |
| **Goal** | Correct code | Correct behavior |

---

## Given-When-Then Pattern

The **Given-When-Then** pattern structures scenarios:

- **Given** - Initial context (preconditions)
- **When** - Action or event
- **Then** - Expected outcome

### Example: User Login

```gherkin
Feature: User Authentication

  Scenario: Successful login with valid credentials
    Given I am on the login page
    And I have a registered account with email "user@example.com"
    When I enter email "user@example.com"
    And I enter password "SecurePass123"
    And I click the "Login" button
    Then I should be redirected to the dashboard
    And I should see a welcome message "Welcome back, John!"

  Scenario: Failed login with incorrect password
    Given I am on the login page
    When I enter email "user@example.com"
    And I enter password "wrongpassword"
    And I click the "Login" button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page
    And the password field should be cleared
```

---

## Gherkin Syntax

**Gherkin** is the language used to write BDD scenarios. It's designed to be human-readable while being executable by testing frameworks.

### Basic Structure

```gherkin
Feature: Brief description of the feature
  As a [role]
  I want [feature]
  So that [benefit]

  Background: (Optional - runs before each scenario)
    Given common preconditions

  Scenario: Description of specific behavior
    Given [initial context]
    When [event occurs]
    Then [expected outcome]

  Scenario Outline: Parameterized scenario
    Given <parameter>
    When <action>
    Then <result>

    Examples:
      | parameter | action | result |
      | value1    | act1   | res1   |
      | value2    | act2   | res2   |
```

### Keywords

- **Feature** - High-level description
- **Scenario** - Specific test case
- **Scenario Outline** - Parameterized scenario with examples
- **Background** - Common steps for all scenarios
- **Given** - Preconditions
- **When** - Actions
- **Then** - Expected outcomes
- **And/But** - Additional steps
- **Examples** - Data table for scenario outlines

---

## BDD Example: E-commerce Checkout

### Feature File

```gherkin
Feature: Shopping Cart Checkout
  As a customer
  I want to purchase items in my cart
  So that I can receive the products I selected

  Background:
    Given I am logged in as "john@example.com"
    And I have items in my shopping cart:
      | Product      | Quantity | Price |
      | Widget       | 2        | 10.00 |
      | Gadget       | 1        | 25.00 |

  Scenario: Successful checkout with credit card
    Given I am on the checkout page
    When I select "Credit Card" as payment method
    And I enter card number "4242424242424242"
    And I enter expiry date "12/25"
    And I enter CVV "123"
    And I enter billing address:
      | Street  | 123 Main St    |
      | City    | Springfield    |
      | State   | IL             |
      | Zip     | 62701          |
    And I click "Place Order"
    Then I should see "Order Confirmed!"
    And I should receive an order confirmation email
    And my cart should be empty
    And I should see order number
    And my payment method should be charged $45.00

  Scenario: Checkout fails with insufficient funds
    Given I am on the checkout page
    When I select "Credit Card" as payment method
    And I enter a card with insufficient funds
    And I click "Place Order"
    Then I should see an error "Payment failed: Insufficient funds"
    And I should remain on the checkout page
    And my cart should still contain items
    And no order should be created

  Scenario Outline: Validate credit card inputs
    Given I am on the checkout page
    When I enter card number "<card_number>"
    And I enter expiry date "<expiry>"
    And I enter CVV "<cvv>"
    And I click "Place Order"
    Then I should see error message "<error_message>"

    Examples:
      | card_number       | expiry | cvv | error_message                |
      | 1234             | 12/25  | 123 | Invalid card number          |
      | 4242424242424242 | 12/20  | 123 | Card expired                 |
      | 4242424242424242 | 12/25  | 12  | Invalid CVV                  |
      | 4242424242424242 | 13/25  | 123 | Invalid expiration date      |
```

---

## Implementing BDD

### 1. Tools for BDD

**JavaScript/TypeScript:**
- **Cucumber.js** - Popular BDD framework
- **Jest-Cucumber** - BDD with Jest
- **Playwright** - E2E testing with BDD support

**Java:**
- **Cucumber-JVM** - Cucumber for Java
- **JBehave** - Alternative BDD framework

**Python:**
- **Behave** - BDD framework for Python
- **pytest-bdd** - BDD with pytest

**C#/.NET:**
- **SpecFlow** - Cucumber for .NET
- **LightBDD** - Lightweight BDD framework

### 2. Step Definitions (JavaScript Example)

**Feature file: `login.feature`**
```gherkin
Feature: User Login

  Scenario: Successful login
    Given I am on the login page
    When I enter email "user@example.com"
    And I enter password "password123"
    And I click the "Login" button
    Then I should see my dashboard
```

**Step definitions: `login.steps.js`**
```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the login page', async function() {
  await this.page.goto('http://localhost:3000/login');
});

When('I enter email {string}', async function(email) {
  await this.page.fill('#email', email);
});

When('I enter password {string}', async function(password) {
  await this.page.fill('#password', password);
});

When('I click the {string} button', async function(buttonText) {
  await this.page.click(`button:has-text("${buttonText}")`);
});

Then('I should see my dashboard', async function() {
  await expect(this.page).toHaveURL(/\/dashboard/);
  await expect(this.page.locator('h1')).toContainText('Dashboard');
});
```

### 3. Running BDD Tests

```bash
# JavaScript (Cucumber)
npm run cucumber

# Java (Cucumber)
mvn test -Dcucumber.options="--tags @smoke"

# Python (Behave)
behave features/

# .NET (SpecFlow)
dotnet test
```

---

## BDD Best Practices

### 1. Write Scenarios Before Code

Just like TDD, write scenarios before implementation.

```gherkin
# 1. Write scenario
Feature: User Registration
  Scenario: Register with valid data
    Given I am on the registration page
    When I enter valid registration details
    Then I should be registered successfully

# 2. Implement step definitions
# 3. Implement application code
# 4. Run tests (should pass)
```

### 2. Use Business Language

```gherkin
# ❌ Technical language
Scenario: POST /api/users returns 201
  Given I send POST request to /api/users
  When response code is 201
  Then response.body.user.id exists

# ✅ Business language
Scenario: Register new user successfully
  Given I want to create a new account
  When I submit my registration form
  Then my account should be created
  And I should receive a welcome email
```

### 3. Focus on Behavior, Not Implementation

```gherkin
# ❌ Implementation details
Scenario: Database update
  Given database table "users" exists
  When I execute INSERT INTO users
  Then row should be added to database

# ✅ User behavior
Scenario: Create user account
  Given I have valid registration details
  When I submit the registration form
  Then my account should be created
  And I should be able to login
```

### 4. Keep Scenarios Independent

```gherkin
# ❌ Dependent scenarios (bad)
Scenario: Create user
  When I create user "john@example.com"

Scenario: Login as created user  # Depends on previous scenario!
  When I login as "john@example.com"

# ✅ Independent scenarios (good)
Scenario: Login with existing user
  Given a user exists with email "john@example.com"
  When I login as "john@example.com"
  Then I should see my dashboard
```

### 5. Use Background for Common Steps

```gherkin
Feature: Shopping Cart

  Background:
    Given I am logged in as "customer@example.com"
    And I have items in my cart

  Scenario: View cart
    When I navigate to cart page
    Then I should see my cart items

  Scenario: Remove item from cart
    When I remove an item from cart
    Then the item should be removed
```

### 6. Use Scenario Outlines for Multiple Cases

```gherkin
# ❌ Repetitive scenarios
Scenario: Validate email format - missing @
  When I enter email "invalidemail.com"
  Then I should see error "Invalid email"

Scenario: Validate email format - missing domain
  When I enter email "invalid@"
  Then I should see error "Invalid email"

# ✅ Scenario Outline
Scenario Outline: Validate email format
  When I enter email "<email>"
  Then I should see error "<error>"

  Examples:
    | email             | error          |
    | invalidemail.com  | Invalid email  |
    | invalid@          | Invalid email  |
    | @example.com      | Invalid email  |
```

---

## Three Amigos Meeting

BDD encourages collaboration through **Three Amigos** meetings:

**Participants:**
1. **Business Analyst/Product Owner** - Defines requirements
2. **Developer** - Implements features
3. **Tester/QA** - Validates behavior

**Process:**
1. **Discuss** user story
2. **Write** BDD scenarios together
3. **Clarify** requirements through examples
4. **Agree** on acceptance criteria

**Example Discussion:**

```
PO: "Users should be able to reset their password."

QA: "What happens if the email doesn't exist?"

Dev: "Should we rate-limit reset requests?"

Together: Write scenarios covering all cases:
- Valid email → Send reset link
- Invalid email → Show generic message (security)
- Too many requests → Rate limit error
- Expired reset link → Show error
```

---

## BDD for Different Test Levels

### Unit Level BDD

```javascript
// Describe behavior at unit level
describe('User validator', () => {
  describe('when email is valid', () => {
    it('should not throw error', () => {
      expect(() => validateEmail('user@example.com'))
        .not.toThrow();
    });
  });

  describe('when email is invalid', () => {
    it('should throw validation error', () => {
      expect(() => validateEmail('invalid'))
        .toThrow('Invalid email format');
    });
  });
});
```

### Integration Level BDD

```gherkin
Feature: API User Management

  Scenario: Create user via API
    Given the API is available
    When I send POST to "/api/users" with:
      """
      {
        "email": "user@example.com",
        "name": "John Doe"
      }
      """
    Then the response code should be 201
    And the response should contain user id
    And the user should exist in database
```

### E2E Level BDD

```gherkin
Feature: Complete User Journey

  Scenario: New user registration and first purchase
    Given I am a new visitor
    When I register for an account
    And I verify my email
    And I login to my account
    And I browse products
    And I add items to cart
    And I complete checkout
    Then I should receive order confirmation
    And I should receive order confirmation email
```

---

## Common BDD Mistakes

### 1. Too Technical

```gherkin
# ❌ Too technical
Scenario: API returns JWT token
  When POST /api/auth with credentials
  Then response contains JWT in Authorization header

# ✅ Business-focused
Scenario: User logs in successfully
  When I login with valid credentials
  Then I should be authenticated
  And I should have access to my account
```

### 2. Too Much Detail

```gherkin
# ❌ Too detailed
Scenario: Fill registration form
  When I click email field
  And I type "u"
  And I type "s"
  And I type "e"
  ...

# ✅ Appropriate level of detail
Scenario: Complete registration
  When I fill in my registration details
  Then my account should be created
```

### 3. UI-Specific Steps

```gherkin
# ❌ Coupled to UI
Scenario: Search products
  When I click search icon
  And I type in textbox with id "search-input"
  And I click blue button with class "submit-btn"

# ✅ Behavior-focused
Scenario: Search products
  When I search for "laptop"
  Then I should see laptop search results
```

---

## Resources

- [The Cucumber Book](https://pragprog.com/titles/hwcuc2/the-cucumber-book-second-edition/)
- [BDD in Action](https://www.manning.com/books/bdd-in-action)
- [Cucumber Documentation](https://cucumber.io/docs/guides/)
- [Dan North's Introduction to BDD](https://dannorth.net/introducing-bdd/)

## Next Steps

1. Learn [TDD](/docs/testing/fundamentals/tdd) if you haven't already
2. Practice writing Given-When-Then scenarios
3. Set up Cucumber or similar BDD framework
4. Organize "Three Amigos" meetings with your team
5. Start with one feature and expand

---

**Describe behavior, not implementation - make tests everyone can understand!**
