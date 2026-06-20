const { test } = require('../fixtures/fixtures');

test.describe('Checkout and Purchase', () => {
  test('TC-002: user can complete purchase with single product', async ({ loginSteps, shopSteps, cartSteps, purchaseSteps, testData }) => {
    const { username, password } = testData.credentials;
    const product = testData.products.iphone;

    await loginSteps.loginAs(username, password);
    await shopSteps.addProductToCart(product);
    await shopSteps.goToCart();
    await cartSteps.proceedToCheckout();

    await purchaseSteps.selectCountry(testData.countries.india);
    await purchaseSteps.acceptTerms();
    await purchaseSteps.purchase();

    await purchaseSteps.verifyPurchaseSuccess();
  });

  test('TC-003: user can add multiple products and verify them in cart', async ({ loginSteps, shopSteps, cartSteps, testData }) => {
    const { username, password } = testData.credentials;
    const products = [testData.products.iphone, testData.products.nokiaEdge, testData.products.blackberry];

    await loginSteps.loginAs(username, password);

    for (const product of products) {
      await shopSteps.addProductToCart(product);
    }

    await shopSteps.goToCart();

    await cartSteps.verifyProductsInCart(products);
  });
});
