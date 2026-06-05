import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Reusable Page Object Model for hud.io legal pages.
 * Covers /legal/terms-of-service/ and /legal/privacy-policy/.
 */
export class LegalPage extends BasePage {
  constructor(page: Page, path: '/legal/terms-of-service/' | '/legal/privacy-policy/') {
    super(page, path);
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get sectionHeadings(): Locator {
    return this.page.locator('h2');
  }

  private get pageContent(): Locator {
    return this.page.locator('main, article, .content, [class*="legal"]').first();
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

  async expectSectionHeadingsPresent(minCount: number): Promise<void> {
    const count = await this.sectionHeadings.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }

  async expectContentPresent(): Promise<void> {
    await expect(this.pageContent).toBeVisible();
  }

  async expectSectionVisible(text: string | RegExp): Promise<void> {
    await expect(this.page.locator('h2').filter({ hasText: text }).first()).toBeVisible();
  }

  async expectTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}
