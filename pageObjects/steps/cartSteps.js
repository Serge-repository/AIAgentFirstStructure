const selectors = require('../selectors/cartSelectors');

class CartSteps {
  constructor(page) {
    this.page = page;
  }

  async hasProduct(productName) {
    const productLink = this.page.locator(selectors.cartProductNameLink, { hasText: productName });
    return (await productLink.count()) > 0;
  }
}

module.exports = CartSteps;
