---
name: domain
description: product domain overview in terms of testing flow and tests preparation
# disable-model-invocation: true  - for Claude Code, reads file only when asked
---

# Skill name: Rahul Shetty Academy Training Shop

## Domain Overview

This application is a demo e-commerce website used for QA automation practice.

Main user journey:

1. User opens the shop application
2. User browses available products
3. User adds products to cart
4. User proceeds to checkout
5. User enters country information
6. User confirms purchase
7. User receives success message

Application URL:
https://rahulshettyacademy.com/angularpractice/shop

Login URL:
https://rahulshettyacademy.com/loginpagePractise/

---

## Main Pages

### Login Page

Purpose:
- User verification

Key fields:
- Username
- Password
- Role
- Employment Status
- Terms/Conditions checkbox

---

### Shop Page

Purpose:
- Display available products

Key features:
- Product cards
- Product name
- Add button
- Checkout button

Known products may include:
- Nokia Edge
- Blackberry
- Samsung Note 8
- iphone X

---

### Checkout Page

Purpose:
- Display selected products

Key features:
- Product list
- Total amount
- Checkout button

---

### Purchase Page

Purpose:
- Finalize purchase

Key fields:
- Country autocomplete

Key actions:
- Select country
- Accept terms
- Purchase

---

## Business Rules

### Product Selection

- User can add one or multiple products
- Selected products appear in checkout
- Cart count increases after adding product

### Checkout

- Checkout should display selected products only
- Product prices should match shop page prices

### Purchase

- Country is mandatory
- Terms checkbox must be selected
- Successful purchase displays success message

---

## Test Priorities

### High Priority

1. Add single product to cart
2. Add multiple products to cart
3. Verify checkout items
4. Complete purchase flow
5. Verify success message

### Medium Priority

1. Cart total calculation
2. Product visibility
3. Country autocomplete

### Low Priority

1. UI styling
2. Layout validation

---

## Positive Scenarios

### Product Purchase

- User adds one product
- User completes checkout
- User receives success confirmation

### Multiple Products

- User adds multiple products
- User verifies products in cart
- User completes purchase

### Country Selection

- User enters partial country name
- User selects suggested country
- Purchase succeeds

---

## Negative Scenarios

### Missing Country

- User leaves country empty
- Purchase should not complete

### Terms Not Accepted

- User does not accept terms
- Purchase should not complete

### Empty Cart

- User attempts checkout with no products
- Validation should be displayed

---

## Validation Rules

### Success Message

Expected text should contain:

- Success
- Thank you
- Order confirmation

### Product Verification

Verify:

- Product name
- Product count
- Product price

### Total Verification

Total should equal:

sum(product prices)

---

## Playwright Standards

Use:

- Playwright tool
- Page Object Model
- Reusable locators
- Auto waiting
- Explicit assertions

Avoid:

- Hardcoded sleeps
- XPath when CSS or ID selectors exist

---

## Test Organization

Test to be grouped in suites (e.g. Smoke, Regression etc.) by adding specific tag(s) for each related test

---

## Smoke Suite

Must include:

1. Open application
2. Navigate to shop
3. Add product
4. Checkout
5. Purchase
6. Verify success message

---

## Regression Suite

Must include:

1. Single product purchase
2. Multiple product purchase
3. Product verification
4. Total verification
5. Country selection
6. Purchase validation

---

## Test Data Strategy

Use dedicated test data:

Valid countries:
- India
- Ukraine
- Germany

Products:
- Nokia Edge
- Blackberry
- Samsung Note 8
- iphone X

Avoid hardcoding values in tests.

Store reusable data in fixtures.