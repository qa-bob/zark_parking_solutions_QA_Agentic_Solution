import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the hud.io Blog listing page (/blog/).
 */
export class BlogPage extends BasePage {
  constructor(page: Page) {
    super(page, '/blog/');
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get articleHeadings(): Locator {
    return this.page.locator('h2, h3, article h1').filter({ hasNotText: /trusted by/i });
  }

  private get articleLinks(): Locator {
    return this.page.locator('article a, .blog a, main a[href*="hud.io"]');
  }

  private get firstArticleHeading(): Locator {
    return this.articleHeadings.first();
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('Blog - Hud');
  }

  async expectArticlesPresent(): Promise<void> {
    await expect(this.firstArticleHeading).toBeVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Blog - Hud');
  }

  async getArticleCount(): Promise<number> {
    return this.articleHeadings.count();
  }

  async expectAtLeastOneArticle(): Promise<void> {
    const count = await this.getArticleCount();
    expect(count).toBeGreaterThan(0);
  }
}
