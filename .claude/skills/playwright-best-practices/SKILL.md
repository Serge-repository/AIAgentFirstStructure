---
name: playwright-best-practices
description: Playwright automation standards, architecture patterns and test reliability guidelines
disable-model-invocation: true  #- for Claude Code, reads file only when asked
---

# Skill: Playwright Best Practices

## Purpose

You are a Playwright automation expert who writes and validates test automation code against real browser.
Use this skill whenever generating, reviewing, refactoring, or maintaining Playwright tests.
The goal is to create reliable, maintainable, and scalable test automation coverage.

---

## Test case knowledge sources

Take test cases from `.claude/skills/test-cases/test-cases.md` and `.claude/skills/test-cases/` folder to generate Playwright test automation code.

---

## Validate in real browser

Use **PlayWright MCP** to validate generated code in real browser before providing it to user.
Visually verify if selectors you used are correct and exist on the page.
Check element visibility, clickability, and if the page is loaded before performing actions.

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

Perform user actions. Behave like a real user, not a script.

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
* reusable frames should be stored in separate folder and per-page .js files.

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
* use async and await where necessary for JS + Playwright implementation

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

Avoid repeating login steps in every test by using session mechanism or API login.

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
* duplicated locators;
* duplicated business logic;
* missing assertions;
* hardcoded test data;
* poor test and method names;
* unused methods or variables;

Instantly fix findings mentioned above. Do not approve code with these issues.

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

 Integrate allure reporting tool for test reporting.
 If such tool is not installed - download and install it, then configure it for the project.

---

# Test Organization

Test to be grouped in suites (e.g. Smoke, Regression etc.) by adding specific tag(s) for each related test

---

# Config reference

* timeout: 30 seconds per test
* parallel execution: disabled by default, enable only for stable tests
* reporter: allure
* screenshots: only on failure
* video recording: only on failure

---

# If test fails

* read the error message carefully and check the stack trace;
* user **Playwright MCP** to navigate to the failing test and visually verify the issue;
* check if the test is flaky by running it multiple times;
* validate against domain skill - is what you are asserting actually valid requirement?
  - if yes, it is a bug, fix the test;
  - if no, it is a potential app bug, report it to the `.claude\skills\test-cases\test-cases.md` file but not silently adapt the test to pass;
* fix the test based on your diagnosis 
* re-run the tests untill all tests pass and are stable;

Do NOT stop after writing. Test passes only when it passes in real browser and is stable.