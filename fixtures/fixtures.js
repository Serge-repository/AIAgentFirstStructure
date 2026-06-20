const { test: base } = require('@playwright/test');
const LoginSteps = require('../pageObjects/steps/loginSteps');
const ShopSteps = require('../pageObjects/steps/shopSteps');
const CartSteps = require('../pageObjects/steps/cartSteps');
const PurchaseSteps = require('../pageObjects/steps/purchaseSteps');
const testData = require('./testData');

const test = base.extend({
  loginSteps: async ({ page }, use) => {
    await use(new LoginSteps(page));
  },
  shopSteps: async ({ page }, use) => {
    await use(new ShopSteps(page));
  },
  cartSteps: async ({ page }, use) => {
    await use(new CartSteps(page));
  },
  purchaseSteps: async ({ page }, use) => {
    await use(new PurchaseSteps(page));
  },
  testData: async ({}, use) => {
    await use(testData);
  },
});

module.exports = { test };
