import { describe, it, beforeAll, afterAll, expect } from '@jest/globals';
import { IBrowser, IPage } from '../core/interfaces';
import { PlaywrightBrowser } from '../core/adapters/PlaywrightAdapter';
import { LoginPage } from '../pages/LoginPage';

describe('Login Tests', () => {
  let browser: IBrowser;
  let page: IPage;
  let loginPage: LoginPage;

  beforeAll(async () => {
    browser = await PlaywrightBrowser.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.navigate('https://www.saucedemo.com/');
  });

  it('should login successfully with valid credentials', async () => {
    // Act
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert
    const title = await page.getTitle();
    expect(title).toContain('Swag Labs');
  }, 30000);

  it('should show error with invalid credentials', async () => {
    // Act
    await loginPage.login('invalid_user', 'wrong_password');

    // Assert
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  }, 30000);
});