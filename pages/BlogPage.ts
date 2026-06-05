import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for /blog — Case Studies and Other Stories.
 */
export class BlogPage extends BasePage {
  constructor(page: Page) {
    super(page, '/blog');
  }

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  async goto(): Promise<void> {
    await this.navigate();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectPageHeadingVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/case studies|blog|zark/i);
  }
}
