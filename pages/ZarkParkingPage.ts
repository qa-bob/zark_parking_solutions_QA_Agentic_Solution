import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for /short-term-parking — Zark Parking product page.
 */
export class ZarkParkingPage extends BasePage {
  constructor(page: Page) {
    super(page, '/short-term-parking');
  }

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get adaptSection(): Locator {
    return this.page.locator('h2').filter({ hasText: /adapts to your parking strategy/i }).first();
  }

  private get howZarkWorksSection(): Locator {
    return this.page.locator('h2').filter({ hasText: /how zark works/i }).first();
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

  async expectPageHeadingContains(text: string): Promise<void> {
    await expect(this.pageHeading).toContainText(text);
  }

  async expectAdaptSectionVisible(): Promise<void> {
    await expect(this.adaptSection).toBeVisible();
  }

  async expectHowZarkWorksSectionVisible(): Promise<void> {
    await expect(this.howZarkWorksSection).toBeVisible();
  }

  async expectCtaLinkVisible(): Promise<void> {
    await expect(this.ctaLink).toBeVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Zark Parking');
  }
}
