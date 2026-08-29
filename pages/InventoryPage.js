const selectors = {
  pageTitle: '.title',
  cartIcon: '.shopping_cart_link',
  cartBadge: '.shopping_cart_badge',
  sortDropdown: '[data-test="product_sort_container"]'
};

// Вспомогательные функции для селекторов
function getAddToCartButton(itemName) {
  const testId = itemName.toLowerCase().replace(/ /g, '-');
  return `[data-test="add-to-cart-${testId}"]`;
}

function getRemoveFromCartButton(itemName) {
  const testId = itemName.toLowerCase().replace(/ /g, '-');
  return `[data-test="remove-${testId}"]`;
}

/**
 * Проверить, что мы на странице инвентаря
 */
function isOnPage(I) {
  I.seeInCurrentUrl('/inventory.html');
  I.seeElement(selectors.pageTitle);
  I.see('Products', selectors.pageTitle);
}

/**
 * Добавить товар в корзину
 */
function addItemToCart(I, itemName) {
  const addButton = getAddToCartButton(itemName);
  I.click(addButton);
  
  const removeButton = getRemoveFromCartButton(itemName);
  I.waitForElement(removeButton, 3);
}

/**
 * Удалить товар из корзины
 */
function removeItemFromCart(I, itemName) {
  const removeButton = getRemoveFromCartButton(itemName);
  I.click(removeButton);
  
  const addButton = getAddToCartButton(itemName);
  I.waitForElement(addButton, 3);
}

/**
 * Перейти в корзину
 */
function goToCart(I) {
  I.click(selectors.cartIcon);
  I.waitForURL('/cart.html', 5);
}

/**
 * Получить количество товаров в корзине
 */
async function getCartItemCount(I) {
  try {
    const count = await I.grabTextFrom(selectors.cartBadge);
    return parseInt(count, 10);
  } catch (error) {
    return 0;
  }
}

/**
 * Отсортировать товары
 */
function sortItems(I, sortType) {
  I.click(selectors.sortDropdown);
  I.click(`option[value="${sortType}"]`);
  I.wait(1);
}

/**
 * Получить все названия товаров
 */
async function getItemNames(I) {
  return await I.grabTextFromAll('.inventory_item_name');
}

/**
 * Получить все цены товаров
 */
async function getItemPrices(I) {
  const prices = await I.grabTextFromAll('.inventory_item_price');
  return prices.map(price => parseFloat(price.replace('$', '')));
}

/**
 * Проверить сортировку по цене (от низкой к высокой)
 */
async function checkSortByPriceLowHigh(I) {
  const prices = await getItemPrices(I);
  const sortedPrices = [...prices].sort((a, b) => a - b);
  I.assertEqual(prices, sortedPrices, 'Товары не отсортированы по цене');
}

module.exports = {
  isOnPage,
  addItemToCart,
  removeItemFromCart,
  goToCart,
  getCartItemCount,
  sortItems,
  getItemNames,
  getItemPrices,
  checkSortByPriceLowHigh
};