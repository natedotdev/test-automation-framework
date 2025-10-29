import { chromium, Browser, Page, Locator } from 'playwright';
import { IBrowser, IPage, IElement } from '../interfaces';

// This wraps Playwright's element
export class PlaywrightElement implements IElement {
  constructor(private locator: Locator) {}

  async click(): Promise<void> {
    await this.locator.click();
  }

  async type(text: string): Promise<void> {
    await this.locator.fill(text);
  }

  async getText(): Promise<string> {
    return await this.locator.textContent() || '';
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }
}

// This wraps Playwright's page
export class PlaywrightPage implements IPage {
  constructor(private page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async findElement(selector: string): Promise<IElement> {
    return new PlaywrightElement(this.page.locator(selector));
  }

  async screenshot(path: string): Promise<void> {
    await this.page.screenshot({ path });
  }
}

// This wraps Playwright's browser
export class PlaywrightBrowser implements IBrowser {
  constructor(private browser: Browser) {}

  async newPage(): Promise<IPage> {
    const page = await this.browser.newPage();
    return new PlaywrightPage(page);
  }

  async close(): Promise<void> {
    await this.browser.close();
  }

  static async launch(): Promise<PlaywrightBrowser> {
    const browser = await chromium.launch({ headless: false });
    return new PlaywrightBrowser(browser);
  }
}