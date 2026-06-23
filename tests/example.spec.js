const { test, expect } = require('@playwright/test');

test('homepage has Playwright title', { tag: ['@regression'] }, async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});
