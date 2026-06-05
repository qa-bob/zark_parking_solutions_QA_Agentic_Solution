import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for /parking-enforcement — Parking Enforcement product page.
 */
export class ParkingEnforcementPage extends BasePage {
  constructor(page: Page) {
    super(page, '/parking-enforcement');
  }

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get empowerSection(): Locator {
    return this.page.locator('h2').filter({ hasText: /empower residents/i }).first();
  }

  private get simplifySection(): Locator {
    return this.page.locator('h2').filter({ hasText: /simplify towing/i }).first();
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

  async expectEmpowerSectionVisible(): Promise<void> {
    await expect(this.empowerSection).toBeVisible();
  }

  async expectSimplifySectionVisible(): Promise<void> {
    await expect(this.simplifySection).toBeVisible();
  }

  async expectCtaLinkVisible(): Promise<void> {
    await expect(this.ctaLink).toBeVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Parking Enforcement');
  }
}
