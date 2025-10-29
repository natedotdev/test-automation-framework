import { IPage } from '../core/interfaces';

export class BasePage {
  constructor(protected page: IPage) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.getTitle();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot(`./screenshots/${name}.png`);
  }
}