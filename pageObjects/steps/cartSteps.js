const selectors = require('../selectors/cartSelectors');
const GeneralSteps = require('./GeneralSteps');

class CartSteps {
  constructor(page) {
    this.page = page;
    this.generalSteps = new GeneralSteps(page);
  }

  // async hasProduct(productName) {
  //   const productLink = this.page.locator(selectors.cartProductNameLink, { hasText: productName });
  //   return (await productLink.count()) > 0;
  // }

  async getProductNames() {
    const links = this.page.locator(selectors.allProductNameLinks);
    const count = await links.count();
    const names = [];
    for (let i = 0; i < count; i++) {
      names.push(await links.nth(i).textContent());
    }
    return names;
  }

  async proceedToCheckout() {
    await this.page.locator(selectors.checkoutButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyProductInCart(productName) {
    const productLink = this.page.locator(selectors.cartProductNameLink, {hasText: productName});
    let productExists = (await productLink.count()) > 0;
    await this.generalSteps.assertTrue(productExists);
  }

  async verifyProductsInCart(expectedProducts) {
    const productNames = await this.getProductNames();
    await this.generalSteps.assertArrayContains(productNames, expectedProducts);
    await this.generalSteps.assertLength(productNames, expectedProducts.length);
  }
}

module.exports = CartSteps;
