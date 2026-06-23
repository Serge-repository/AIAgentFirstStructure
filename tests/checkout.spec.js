const { test } = require('../fixtures/fixtures');
const credentials = require('../fixtures/credentials');

test.describe('Checkout and Purchase', () => {
  test('TC-002: user can complete purchase with single product', { tag: ['@smoke', '@regression'] }, async ({ loginSteps, shopSteps, cartSteps, purchaseSteps, testData }) => {
    const product = testData.products.iphone;
    await loginSteps.loginAs(credentials.username, credentials.password);
    await shopSteps.addProductToCart(product);
    await shopSteps.goToCart();
    await cartSteps.proceedToCheckout();
    await purchaseSteps.selectCountry(testData.countries.india);
    await purchaseSteps.acceptTerms();
    await purchaseSteps.purchase();
    await purchaseSteps.verifyPurchaseSuccess();
  });

  test('TC-003: user can add multiple products and verify them in cart', { tag: ['@regression'] }, async ({ loginSteps, shopSteps, cartSteps, testData }) => {
    const products = [testData.products.iphone, testData.products.nokiaEdge, testData.products.blackberry];
    await loginSteps.loginAs(credentials.username, credentials.password);
    for (const product of products) {
      await shopSteps.addProductToCart(product);
    }
    await shopSteps.goToCart();
    await cartSteps.verifyProductsInCart(products);
  });
});
