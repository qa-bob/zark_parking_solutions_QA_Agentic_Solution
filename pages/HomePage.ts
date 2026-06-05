import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the hud.io homepage (/).
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, '/');
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get navBar(): Locator {
    return this.page.locator('nav').first();
  }

  private get heroSection(): Locator {
    return this.page.locator('main, [role="main"], header, .hero, #hero, section').first();
  }

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  /** Navigate to the homepage and wait for it to load */
  async goto(): Promise<void> {
    await this.navigate();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  /** Assert the page loaded successfully (has a title) */
  async expectPageLoaded(): Promise<void> {
    const title = await this.getTitle();
    expect(title.length).toBeGreaterThan(0);
  }

  /** Assert the navigation bar is visible */
  async expectNavBarVisible(): Promise<void> {
    await expect(this.navBar).toBeVisible();
  }

  /** Assert the hero / main content section is visible */
  async expectHeroSectionVisible(): Promise<void> {
    await expect(this.heroSection).toBeVisible();
  }

  /** Assert an H1 heading exists on the page */
  async expectPageHeadingVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }
}
