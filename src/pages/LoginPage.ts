import { BasePage } from './BasePage';
import { IPage } from '../core/interfaces';

export class LoginPage extends BasePage {
  // Selectors for elements on login page
  private selectors = {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
    errorMessage: '[data-test="error"]'
  };

  constructor(page: IPage) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    const usernameInput = await this.page.findElement(this.selectors.username);
    await usernameInput.type(username);

    const passwordInput = await this.page.findElement(this.selectors.password);
    await passwordInput.type(password);

    const loginBtn = await this.page.findElement(this.selectors.loginButton);
    await loginBtn.click();
  }

  async getErrorMessage(): Promise<string> {
    const errorElement = await this.page.findElement(this.selectors.errorMessage);
    return await errorElement.getText();
  }

  async isErrorVisible(): Promise<boolean> {
    const errorElement = await this.page.findElement(this.selectors.errorMessage);
    return await errorElement.isVisible();
  }
}