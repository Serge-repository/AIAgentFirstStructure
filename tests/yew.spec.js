const { test } = require('../fixtures/fixtures');

test('login, add iPhone X to cart, and confirm it is added', async ({ loginSteps, shopSteps, cartSteps, testData }) => {
  const { username, password } = testData.credentials;
  const product = testData.products.iphone;

  await loginSteps.loginAs(username, password);
  await shopSteps.addProductToCart(product);
  await shopSteps.goToCart();

  await cartSteps.verifyProductInCart(product);
});
