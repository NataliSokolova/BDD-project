const selectors = {
  pageTitle: '.title',
  checkoutButton: '[data-test="checkout"]',
  continueShoppingButton: '[data-test="continue-shopping"]',
  totalPrice: '.summary_total_label'
};

function getRemoveButton(itemName) {
  const testId = itemName.toLowerCase().replace(/ /g, '-');
  return `[data-test="remove-${testId}"]`;
}

/**
 * Проверить, что мы на странице корзины
 */
function isOnPage(I) {
  I.seeInCurrentUrl('/cart.html');
  I.seeElement(selectors.pageTitle);
  I.see('Your Cart', selectors.pageTitle);
}

/**
 * Перейти к оформлению заказа
 */
function proceedToCheckout(I) {
  I.click(selectors.checkoutButton);
  I.waitForURL('/checkout-step-one.html', 5);
}

/**
 * Продолжить покупки
 */
function continueShopping(I) {
  I.click(selectors.continueShoppingButton);
  I.waitForURL('/inventory.html', 5);
}

/**
 * Получить количество товаров в корзине
 */
async function getCartItemCount(I) {
  return await I.grabNumberOfVisibleElements('.cart_item');
}

/**
 * Удалить товар из корзины
 */
function removeItem(I, itemName) {
  const removeButton = getRemoveButton(itemName);
  I.click(removeButton);
}

/**
 * Проверить, что товар есть в корзине
 */
function isItemInCart(I, itemName) {
  I.see(itemName);
}

/**
 * Получить общую стоимость
 */
async function getTotalPrice(I) {
  const totalText = await I.grabTextFrom(selectors.totalPrice);
  const match = totalText.match(/\$([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

module.exports = {
  isOnPage,
  proceedToCheckout,
  continueShopping,
  getCartItemCount,
  removeItem,
  isItemInCart,
  getTotalPrice
};