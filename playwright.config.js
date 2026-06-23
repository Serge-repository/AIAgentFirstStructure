/**
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
require('dotenv').config();
const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [['list'], ['allure-playwright', { outputFolder: 'allure-results' }]],
  retries: 1,
  use: {
    actionTimeout: 5000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};

module.exports = config;