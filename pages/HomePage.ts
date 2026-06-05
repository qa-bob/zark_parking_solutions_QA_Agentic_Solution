import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the zarkparking.com homepage (/).
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, '/');
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get mainContent(): Locator {
    return this.page.locator('main, [id="main-content"], section').first();
  }

  private get contactSalesCta(): Locator {
    return this.page.locator('a[href*="contact-sales"][href*="hsLang"]').first();
  }

  private get reserveSpaceCta(): Locator {
    return this.page.locator('a[href*="app.zarkhq.com"]').first();
  }

  private get footer(): Locator {
    return this.page.locator('footer').first();
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  async expectPageLoaded(): Promise<void> {
    const title = await this.getTitle();
    expect(title.length).toBeGreaterThan(0);
  }

  async expectPageHeadingVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async expectMainContentVisible(): Promise<void> {
    await expect(this.mainContent).toBeVisible();
  }

  async expectContactSalesCtaVisible(): Promise<void> {
    await expect(this.contactSalesCta).toBeVisible();
  }

  async expectReserveSpaceCtaVisible(): Promise<void> {
    await expect(this.reserveSpaceCta).toBeVisible();
  }

  async expectFooterVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }
}
