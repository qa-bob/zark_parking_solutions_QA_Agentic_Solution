import { Page, expect } from '@playwright/test';

/**
 * Abstract base class for all Page Object Model classes.
 * Every page class must extend BasePage and call super(page, '/path') in its constructor.
 */
export abstract class BasePage {
  protected readonly page: Page;
  private readonly path: string;

  constructor(page: Page, path: string = '/') {
    this.page = page;
    this.path = path;
  }

  /** Navigate to this page's URL */
  async navigate(): Promise<void> {
    await this.page.goto(this.path);
  }

  /** Get the current page title */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** Get the current page URL */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /** Wait for the page to reach a network idle state */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Assert the page URL contains the given path */
  async expectUrlContains(urlPart: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(urlPart));
  }

  /** Assert the page title contains the given text */
  async expectTitleContains(titlePart: string): Promise<void> {
    const title = await this.getTitle();
    expect(title).toContain(titlePart);
  }
}
