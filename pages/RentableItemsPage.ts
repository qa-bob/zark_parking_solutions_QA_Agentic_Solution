import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for /rentable-items — Rentable Items product page.
 */
export class RentableItemsPage extends BasePage {
  constructor(page: Page) {
    super(page, '/rentable-items');
  }

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get expandSection(): Locator {
    return this.page.locator('h2').filter({ hasText: /expand your zarkable/i }).first();
  }

  private get ctaLink(): Locator {
    return this.page.locator('a[href*="contact-sales"]').first();
  }

  async goto(): Promise<void> {
    await this.navigate();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectPageHeadingVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async expectExpandSectionVisible(): Promise<void> {
    await expect(this.expandSection).toBeVisible();
  }

  async expectCtaLinkVisible(): Promise<void> {
    await expect(this.ctaLink).toBeVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Rentable Items');
  }
}
