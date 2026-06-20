const selectors = require('../selectors/purchaseSelectors');
const GeneralSteps = require('./GeneralSteps');

class PurchaseSteps {
  constructor(page) {
    this.page = page;
    this.generalSteps = new GeneralSteps(page);
  }

  async selectCountry(country) {
    const partial = country.substring(0, 3);
    await this.page.locator(selectors.countryInput).pressSequentially(partial, { delay: 100 });
    await this.page.locator(selectors.suggestionLink(country)).first().waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(selectors.suggestionLink(country)).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async acceptTerms() {
    await this.page.locator(selectors.termsCheckboxLabel).click({ force: true });
  }

  async purchase() {
    await this.page.locator(selectors.purchaseButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPurchaseSuccess() {
    const successMessage = this.page.locator(selectors.successAlert);
    await this.generalSteps.assertVisible(successMessage);
    await this.generalSteps.assertContainsText(successMessage, 'Success');
    await this.generalSteps.assertContainsText(successMessage, 'Thank you');
  }
}

module.exports = PurchaseSteps;
