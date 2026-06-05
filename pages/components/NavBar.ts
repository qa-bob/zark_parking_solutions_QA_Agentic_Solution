import { Page, Locator, expect } from '@playwright/test';

/**
 * Component POM for the hud.io navigation bar.
 * Used across all pages that share the global nav.
 */
export class NavBar {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get nav(): Locator {
    return this.page.locator('nav').first();
  }

  private get logo(): Locator {
    return this.page.locator('nav a[href*="hud.io"], header a[href*="hud.io"]').first();
  }

  private get blogLink(): Locator {
    return this.page.locator('nav').getByRole('link', { name: 'Blog' }).first();
  }

  private get docsLink(): Locator {
    return this.page.locator('nav').getByRole('link', { name: 'Docs' }).first();
  }

  private get aboutUsLink(): Locator {
    return this.page.locator('nav').getByRole('link', { name: 'About us' }).first();
  }

  private get bookDemoLink(): Locator {
    return this.page.locator('a[href*="book-a-demo"]').first();
  }

  private get loginLink(): Locator {
    return this.page.locator('a[href*="app.hud.io"]').first();
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async clickBlog(): Promise<void> {
    await this.blogLink.click();
  }

  async clickAboutUs(): Promise<void> {
    await this.aboutUsLink.click();
  }

  async clickBookDemo(): Promise<void> {
    await this.bookDemoLink.click();
  }

  async clickLogin(): Promise<void> {
    await this.loginLink.click();
  }

  async getBlogHref(): Promise<string | null> {
    return this.blogLink.getAttribute('href');
  }

  async getDocsHref(): Promise<string | null> {
    return this.docsLink.getAttribute('href');
  }

  async getLoginHref(): Promise<string | null> {
    return this.loginLink.getAttribute('href');
  }

  async getBookDemoHref(): Promise<string | null> {
    return this.bookDemoLink.getAttribute('href');
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  async expectNavVisible(): Promise<void> {
    await expect(this.nav).toBeVisible();
  }

  async expectBlogLinkVisible(): Promise<void> {
    await expect(this.blogLink).toBeVisible();
  }

  async expectAboutUsLinkVisible(): Promise<void> {
    await expect(this.aboutUsLink).toBeVisible();
  }

  async expectBookDemoLinkVisible(): Promise<void> {
    await expect(this.bookDemoLink).toBeVisible();
  }

  async expectLoginLinkVisible(): Promise<void> {
    await expect(this.loginLink).toBeVisible();
  }

  async expectAllNavLinksVisible(): Promise<void> {
    await this.expectBlogLinkVisible();
    await this.expectAboutUsLinkVisible();
    await this.expectBookDemoLinkVisible();
    await this.expectLoginLinkVisible();
  }
}
