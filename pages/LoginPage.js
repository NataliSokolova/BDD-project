const selectors = {
  usernameField: '#user-name',
  passwordField: '#password',
  loginButton: '#login-button',
  errorMessage: '[data-test="error"]',
  logo: '.login_logo'
};

/**
 * Открыть страницу логина
 * @param {Object} I - объект CodeceptJS
 */
function open(I) {
  I.amOnPage('/');
  I.waitForElement(selectors.logo, 5);
  I.see('Swag Labs');
}

/**
 * Ввести имя пользователя
 * @param {Object} I - объект CodeceptJS
 * @param {string} username - имя пользователя
 */
function fillUsername(I, username) {
  I.fillField(selectors.usernameField, username);
}

/**
 * Ввести пароль
 * @param {Object} I - объект CodeceptJS
 * @param {string} password - пароль
 */
function fillPassword(I, password) {
  I.fillField(selectors.passwordField, password);
}

/**
 * Нажать кнопку логина
 * @param {Object} I - объект CodeceptJS
 */
function clickLogin(I) {
  I.click(selectors.loginButton);
}

/**
 * Выполнить вход в систему
 * @param {Object} I - объект CodeceptJS
 * @param {string} username - имя пользователя
 * @param {string} password - пароль
 */
function login(I, username, password) {
  open(I);
  fillUsername(I, username);
  fillPassword(I, password);
  clickLogin(I);
  I.waitForURL('/inventory.html', 5);
}

/**
 * Проверить сообщение об ошибке
 * @param {Object} I - объект CodeceptJS
 * @param {string} expectedMessage - ожидаемый текст ошибки
 */
function checkErrorMessage(I, expectedMessage) {
  I.see(expectedMessage, selectors.errorMessage);
}

/**
 * Проверить, что мы на странице логина
 * @param {Object} I - объект CodeceptJS
 */
function isOnPage(I) {
  I.seeInCurrentUrl('/');
  I.seeElement(selectors.logo);
}

// Экспортируем все функции
module.exports = {
  open,
  fillUsername,
  fillPassword,
  clickLogin,
  login,
  checkErrorMessage,
  isOnPage
};