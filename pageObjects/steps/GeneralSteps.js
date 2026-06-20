const { expect } = require('@playwright/test');

class GeneralSteps {
  constructor(page) {
    this.page = page;
  }

  async assertVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async assertContainsText(locator, text) {
    await expect(locator).toContainText(text);
  }

  async assertTrue(condition) {
    expect(condition).toBeTruthy();
  }

  async assertArrayContains(actualArray, expectedItems) {
    expect(actualArray).toEqual(expect.arrayContaining(expectedItems));
  }

  async assertLength(array, expectedLength) {
    expect(array.length).toBe(expectedLength);
  }
}

module.exports = GeneralSteps;
