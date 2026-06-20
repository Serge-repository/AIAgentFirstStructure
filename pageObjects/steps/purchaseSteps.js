const selectors = require('../selectors/purchaseSelectors');

class PurchaseSteps {
  constructor(page) {
    this.page = page;
  }

  async selectCountry(country) {
    const partial = country.substring(0, 3);
    await this.page.locator(selectors.countryInput).pressSequentially(partial, { delay: 100 });
    await this.page.waitForTimeout(1500);
    await this.page.locator(selectors.suggestionLink(country)).first().click({ force: true });
    await this.page.waitForTimeout(500);
    await this.page.evaluate(() => {
      const el = document.querySelector('div.suggestions');
      if (el) el.style.display = 'none';
    });
  }

  async acceptTerms() {
    await this.page.locator(selectors.termsCheckboxLabel).click({ force: true });
  }

  async purchase() {
    await this.page.locator(selectors.purchaseButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getSuccessMessage() {
    return this.page.locator(selectors.successAlert);
  }
}

module.exports = PurchaseSteps;
