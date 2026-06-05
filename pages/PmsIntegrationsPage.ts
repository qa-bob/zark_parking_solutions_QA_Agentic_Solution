import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for /pms-integrations — PMS Integrations page.
 */
export class PmsIntegrationsPage extends BasePage {
  constructor(page: Page) {
    super(page, '/pms-integrations');
  }

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get integrationSection(): Locator {
    return this.page.locator('h2').filter({ hasText: /effortless integration/i }).first();
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

  async expectIntegrationSectionVisible(): Promise<void> {
    await expect(this.integrationSection).toBeVisible();
  }

  async expectCtaLinkVisible(): Promise<void> {
    await expect(this.ctaLink).toBeVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('PMS Integrations');
  }
}
