const selectors = require('../selectors/loginSelectors');
const GeneralSteps = require('./GeneralSteps');

class LoginSteps {
  constructor(page) {
    this.page = page;
    this.generalSteps = new GeneralSteps(page);
  }

  async loginAs(username, password) {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await this.page.fill(selectors.usernameInput, username);
    await this.page.fill(selectors.passwordInput, password);
    await this.page.check(selectors.termsCheckbox);
    await Promise.all([
      this.page.waitForURL('**/angularpractice/shop'),
      this.page.click(selectors.loginButton),
    ]);
  }
}

module.exports = LoginSteps;
