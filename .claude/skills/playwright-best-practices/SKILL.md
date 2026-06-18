---
name: playwright-best-practices
description: Playwright automation standards, architecture patterns and test reliability guidelines
---------------------------------------------------------------------------------------------------

# Skill: Playwright Best Practices

## Purpose

Use this skill whenever generating, reviewing, refactoring, or maintaining Playwright tests.
The goal is to create reliable, maintainable, and scalable test automation.

---

# Test Design Principles

## Test User Behavior

Focus on user actions and business outcomes.

Good:
* User purchases a product
* User updates profile information
* User submits an order

Bad:
* Click button A
* Verify locator B
* Assert CSS selector C

Tests should validate business value, not implementation details.

---

# Automation Test Structure

Use Page Object pattern. Do not invent new file structure of framework, ask every time you create new file or new folder.

## Arrange

Prepare test data and state. Store reusable data in fixtures.

## Act

Perform user actions. Behave like a user, not a script.

## Assert

Verify expected outcome.

Example:

```javascript
test("user can add product to cart", async ({ shopPage }) => {
  // Arrange
  const product = "iphone X";

  // Act
  await shopPage.addProduct(product);

  // Assert
  await expect(shopPage.cartCounter).toHaveText("1");
});
```

---

## Rules

Page Objects:
* locators stored in separate files per each page in .js format.
* page actions stored in separate files per each page in .js format.
* each test contain at least one assertion.
* reusable assertions can be stored in GeneralPage.js file.
* reusable frames can be stored in separate folder and per-page .js files.

Test .spec .js files:

* contain business flow only
* do not contain selectors

Bad:
```javascript
await page.locator(".btn-primary").click();
```

Good:
```javascript
await shopPage.addToCart();
```

---

# Waiting Strategy

Rely on Playwright auto-waiting.

Use:

* expect()
* waitForURL()
* waitForResponse()
* waitForPageToBeLoaded()
* waitForLoadState('networkidle')

Never use:

```javascript
waitForTimeout()
```

Never use arbitrary delays.

Bad:
```javascript
await page.waitForTimeout(5000);
```

Good:
```javascript
await expect(successMessage).toBeVisible();
```

---

# Assertions

Assertions must validate business outcomes.

---

# Test Independence

Every test must run independently.

Rules:

* no dependency between tests
* no shared execution order
* no state leakage

Each test should be executable alone.

---

# Test Data

Prefer reusable fixtures.

Store:
* users
* products
* addresses
* environments
* credentials
inside fixtures or dedicated test data files.

Avoid hardcoded values.

---

# Fixtures

Use Playwright fixtures for:
* page objects
* authentication
* test data
* API setup

---

# Authentication

Prefer API-based login when possible.
Use UI login only when:

* login functionality is under test
* authentication flow must be validated

Avoid repeating login steps in every test.

---

# Network Handling

Use request interception carefully.

Allowed:
* mocking third-party services
* simulating failures

Avoid mocking core business functionality.

Tests should remain realistic.

---

# Flaky Test Prevention

Avoid:
* dynamic selectors
* index-based locators
* timing assumptions
* shared test state

Prefer:

* explicit expectations
* stable locators
* isolated test data

---

# Code Review Checklist

When reviewing Playwright code:

Check for:
* duplicated locators
* duplicated business logic
* missing assertions
* hardcoded test data
* poor test and method names

---

# Test Naming

Use descriptive names.

Good:
```javascript
user_can_purchase_multiple_products
```

Bad:
```javascript
test1
```

---

# Required Deliverables

Integrate mochawesome or any other reporter for test reporting.

---

# Test Organization

Test to be grouped in suites (e.g. Smoke, Regression etc.) by adding specific tag(s) for each related test

---