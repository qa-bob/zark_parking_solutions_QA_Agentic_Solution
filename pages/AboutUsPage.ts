import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the hud.io About Us page (/about-us/).
 */
export class AboutUsPage extends BasePage {
  constructor(page: Page) {
    super(page, '/about-us/');
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get missionSection(): Locator {
    return this.page.locator('h2, h3').filter({ hasText: /mission/i }).first();
  }

  private get roadHereSection(): Locator {
    return this.page.locator('h2, h3').filter({ hasText: /road here/i }).first();
  }

  private get valuesSection(): Locator {
    return this.page.locator('h2, h3').filter({ hasText: /stand for/i }).first();
  }

  private get trustedSection(): Locator {
    return this.page.locator('h2, h3').filter({ hasText: /trusted/i }).first();
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

  async expectMissionSectionVisible(): Promise<void> {
    await expect(this.missionSection).toBeVisible();
  }

  async expectRoadHereSectionVisible(): Promise<void> {
    await expect(this.roadHereSection).toBeVisible();
  }

  async expectValuesSectionVisible(): Promise<void> {
    await expect(this.valuesSection).toBeVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('About us - Hud');
  }

  async expectHeadingText(text: string): Promise<void> {
    await expect(this.pageHeading).toContainText(text);
  }
}
