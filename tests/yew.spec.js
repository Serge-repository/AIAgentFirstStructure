const { test, expect } = require('@playwright/test');
const LoginSteps = require('../pageObjects/steps/loginSteps');
const ShopSteps = require('../pageObjects/steps/shopSteps');
const CartSteps = require('../pageObjects/steps/cartSteps');

const USERNAME = 'rahulshettyacademy';
const PASSWORD = 'Learning@830$3mK2';
const PRODUCT_NAME = 'iphone X';

test('login, add iPhone X to cart, and confirm it is added', async ({ page }) => {
  const login = new LoginSteps(page);
  const shop = new ShopSteps(page);
  const cart = new CartSteps(page);

  await login.loginAs(USERNAME, PASSWORD);
  await shop.addProductToCart(PRODUCT_NAME);
  await shop.goToCart();

  await expect(await cart.hasProduct(PRODUCT_NAME)).toBeTruthy();
});
