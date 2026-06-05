import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Reusable Page Object Model for zarkparking.com legal pages.
 * Covers /terms-and-conditions and /privacy-policy.
 */
export class LegalPage extends BasePage {
  constructor(page: Page, path: '/terms-and-conditions' | '/privacy-policy') {
    super(page, path);
  }

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get sectionHeadings(): Locator {
    return this.page.locator('h2');
  }

  async goto(): Promise<void> {
    await this.navigate();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectPageHeadingVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async expectPageHeadingText(text: string): Promise<void> {
    await expect(this.pageHeading).toContainText(text);
  }

  async expectSectionHeadingsPresent(minCount: number): Promise<void> {
    const count = await this.sectionHeadings.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }

  async expectSectionVisible(text: string | RegExp): Promise<void> {
    await expect(this.page.locator('h2').filter({ hasText: text }).first()).toBeVisible();
  }

  async expectTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}
