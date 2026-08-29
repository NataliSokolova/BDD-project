const selectors = {
  pageTitle: '.title',
  firstNameField: '[data-test="firstName"]',
  lastNameField: '[data-test="lastName"]',
  zipCodeField: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  finishButton: '[data-test="finish"]',
  backHomeButton: '[data-test="back-to-products"]',
  totalPrice: '.summary_total_label',
  completeHeader: '.complete-header',
  completeText: '.complete-text'
};

/**
 * Проверить, что мы на странице оформления (шаг 1)
 */
function isOnPage(I) {
  I.seeInCurrentUrl('/checkout-step-one.html');
  I.seeElement(selectors.pageTitle);
  I.see('Checkout: Your Information', selectors.pageTitle);
}

/**
 * Заполнить информацию о покупателе
 */
function fillCustomerInfo(I, firstName, lastName, zipCode) {
  I.fillField(selectors.firstNameField, firstName);
  I.fillField(selectors.lastNameField, lastName);
  I.fillField(selectors.zipCodeField, zipCode);
}

/**
 * Продолжить оформление
 */
function continueCheckout(I) {
  I.click(selectors.continueButton);
  I.waitForURL('/checkout-step-two.html', 5);
}

/**
 * Проверить, что мы на странице подтверждения (шаг 2)
 */
function isOnConfirmationPage(I) {
  I.seeInCurrentUrl('/checkout-step-two.html');
  I.see('Checkout: Overview', selectors.pageTitle);
}

/**
 * Завершить заказ
 */
function finishOrder(I) {
  I.click(selectors.finishButton);
  I.waitForURL('/checkout-complete.html', 5);
}

/**
 * Проверить, что заказ завершен успешно
 */
function checkOrderComplete(I) {
  I.seeInCurrentUrl('/checkout-complete.html');
  I.see('Thank you for your order!', selectors.completeHeader);
  I.see('Your order has been dispatched, and will arrive just as fast as the pony can get there!', selectors.completeText);
  I.seeElement(selectors.backHomeButton);
}

/**
 * Вернуться на главную страницу
 */
function backToHome(I) {
  I.click(selectors.backHomeButton);
  I.waitForURL('/inventory.html', 5);
}

/**
 * Получить общую стоимость заказа
 */
async function getTotalPrice(I) {
  const totalText = await I.grabTextFrom(selectors.totalPrice);
  const match = totalText.match(/\$([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

module.exports = {
  isOnPage,
  fillCustomerInfo,
  continueCheckout,
  isOnConfirmationPage,
  finishOrder,
  checkOrderComplete,
  backToHome,
  getTotalPrice
};