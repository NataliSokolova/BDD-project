const testData = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  invalidUser: {
    username: 'wrong_user',
    password: 'wrong_password'
  },
  items: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light'
  },
  customerInfo: {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345'
  }
};

Feature('SauceDemo - Тестирование интернет-магазина');


Scenario('Успешный вход в систему', async ({ I, loginPage, inventoryPage }) => {
  loginPage.login(I, testData.validUser.username, testData.validUser.password);
  inventoryPage.isOnPage(I);
  
  I.seeElement('.inventory_item');
  I.see('Products', '.title');
  I.seeElement('.shopping_cart_link');
});


Scenario('Вход с неправильными учетными данными', async ({ I, loginPage }) => {
  loginPage.open(I);
  loginPage.fillUsername(I, testData.invalidUser.username);
  loginPage.fillPassword(I, testData.invalidUser.password);
  loginPage.clickLogin(I);
  
  const expectedError = 'Epic sadface: Username and password do not match any user in this service';
  loginPage.checkErrorMessage(I, expectedError);
  
  loginPage.isOnPage(I);
  I.seeInCurrentUrl('/');
});


Scenario('Добавление товара в корзину', async ({ I, loginPage, inventoryPage, cartPage }) => {
  loginPage.login(I, testData.validUser.username, testData.validUser.password);
  
  const itemName = testData.items.backpack;
  inventoryPage.addItemToCart(I, itemName);
  
  I.see('1', '.shopping_cart_badge');
  
  inventoryPage.goToCart(I);
  cartPage.isOnPage(I);
  cartPage.isItemInCart(I, itemName);
  
  const count = await cartPage.getCartItemCount(I);
  I.assertEqual(count, 1, 'В корзине должен быть 1 товар');
});


Scenario('Полное оформление заказа', async ({ I, loginPage, inventoryPage, cartPage, checkoutPage }) => {
  loginPage.login(I, testData.validUser.username, testData.validUser.password);
  
  const item1 = testData.items.backpack;
  const item2 = testData.items.bikeLight;
  
  inventoryPage.addItemToCart(I, item1);
  inventoryPage.addItemToCart(I, item2);
  
  I.see('2', '.shopping_cart_badge');
  
  inventoryPage.goToCart(I);
  cartPage.isOnPage(I);
  cartPage.proceedToCheckout(I);
  
  checkoutPage.isOnPage(I);
  checkoutPage.fillCustomerInfo(I, 
    testData.customerInfo.firstName,
    testData.customerInfo.lastName,
    testData.customerInfo.zipCode
  );
  
  checkoutPage.continueCheckout(I);
  checkoutPage.isOnConfirmationPage(I);
  
  I.see(item1);
  I.see(item2);
  
  const total = await checkoutPage.getTotalPrice(I);
  I.assertAbove(total, 0, 'Общая стоимость должна быть больше 0');
  
  checkoutPage.finishOrder(I);
  checkoutPage.checkOrderComplete(I);
  checkoutPage.backToHome(I);
  
  inventoryPage.isOnPage(I);
});


Scenario('Сортировка товаров по цене (от низкой к высокой)', async ({ I, loginPage, inventoryPage }) => {
  loginPage.login(I, testData.validUser.username, testData.validUser.password);
  inventoryPage.isOnPage(I);
  
  inventoryPage.sortItems(I, 'lohi');
  await inventoryPage.checkSortByPriceLowHigh(I);
  
  const prices = await inventoryPage.getItemPrices(I);
  for (let i = 0; i < prices.length - 1; i++) {
    I.assertBelowOrEqual(prices[i], prices[i + 1], `Цена ${prices[i]} должна быть меньше или равна ${prices[i+1]}`);
  }
  
  console.log('✅ Цены товаров после сортировки:', prices);
});