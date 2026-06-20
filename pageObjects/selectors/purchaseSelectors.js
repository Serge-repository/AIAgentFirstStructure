module.exports = {
  countryInput: '#country',
  suggestionLink: (country) => `div.suggestions ul li a:has-text("${country}")`,
  termsCheckboxLabel: 'label[for="checkbox2"]',
  purchaseButton: 'input[value="Purchase"]',
  successAlert: '.alert.alert-success',
};
