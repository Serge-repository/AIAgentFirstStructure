const selectors = require('../selectors/shopSelectors');

class ShopSteps {
  constructor(page) {
    this.page = page;
  }

  async addProductToCart(productName) {
    const productCard = this.page.locator(selectors.productCardByName(productName));
    await productCard.waitFor({ state: 'visible', timeout: 10000 });
    await productCard.locator(selectors.productAddButton).click();
  }

  async goToCart() {
      await this.page.click(selectors.checkoutButton)
      await this.page.waitForLoadState('networkidle')
  }
}

module.exports = ShopSteps;
