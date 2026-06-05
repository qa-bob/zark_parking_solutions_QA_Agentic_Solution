import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the hud.io Careers page (/careers/).
 */
export class CareersPage extends BasePage {
  constructor(page: Page) {
    super(page, '/careers/');
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get taglineSection(): Locator {
    return this.page.locator('h2').filter({ hasText: /hard problems|deep craft|real impact/i }).first();
  }

  private get openPositionsSection(): Locator {
    return this.page.locator('h2').filter({ hasText: /open positions/i }).first();
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  async expectPageHeadingVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async expectPageHeadingText(text: string): Promise<void> {
    await expect(this.pageHeading).toContainText(text);
  }

  async expectTaglineSectionVisible(): Promise<void> {
    await expect(this.taglineSection).toBeVisible();
  }

  async expectOpenPositionsSectionVisible(): Promise<void> {
    await expect(this.openPositionsSection).toBeVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Careers - Hud');
  }
}
