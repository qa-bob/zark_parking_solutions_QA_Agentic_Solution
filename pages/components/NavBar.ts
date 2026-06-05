import { Page, Locator, expect } from '@playwright/test';

/**
 * Component POM for the zarkparking.com navigation bar.
 */
export class NavBar {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get nav(): Locator {
    return this.page.locator('header, nav').first();
  }

  private get zarkParkingLink(): Locator {
    return this.page.locator('a[href*="short-term-parking"]').first();
  }

  private get rentableItemsLink(): Locator {
    return this.page.locator('a[href*="rentable-items"]').first();
  }

  private get parkingEnforcementLink(): Locator {
    return this.page.locator('a[href*="parking-enforcement"]').first();
  }

  private get residentGuideLink(): Locator {
    return this.page.locator('a[href*="resident-guide"]').first();
  }

  private get contactSalesLink(): Locator {
    return this.page.locator('a[href*="contact-sales"][href*="hsLang"]').first();
  }

  private get reserveSpaceLink(): Locator {
    return this.page.locator('a[href*="app.zarkhq.com"]').first();
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async clickZarkParking(): Promise<void> {
    await this.zarkParkingLink.click();
  }

  async clickRentableItems(): Promise<void> {
    await this.rentableItemsLink.click();
  }

  async clickParkingEnforcement(): Promise<void> {
    await this.parkingEnforcementLink.click();
  }

  async clickResidentGuide(): Promise<void> {
    await this.residentGuideLink.click();
  }

  async clickContactSales(): Promise<void> {
    await this.contactSalesLink.click();
  }

  async getZarkParkingHref(): Promise<string | null> {
    return this.zarkParkingLink.getAttribute('href');
  }

  async getRentableItemsHref(): Promise<string | null> {
    return this.rentableItemsLink.getAttribute('href');
  }

  async getParkingEnforcementHref(): Promise<string | null> {
    return this.parkingEnforcementLink.getAttribute('href');
  }

  async getResidentGuideHref(): Promise<string | null> {
    return this.residentGuideLink.getAttribute('href');
  }

  async getContactSalesHref(): Promise<string | null> {
    return this.contactSalesLink.getAttribute('href');
  }

  async getReserveSpaceHref(): Promise<string | null> {
    return this.reserveSpaceLink.getAttribute('href');
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  async expectNavVisible(): Promise<void> {
    await expect(this.nav).toBeVisible();
  }

  async expectZarkParkingLinkVisible(): Promise<void> {
    await expect(this.zarkParkingLink).toBeVisible();
  }

  async expectRentableItemsLinkVisible(): Promise<void> {
    await expect(this.rentableItemsLink).toBeVisible();
  }

  async expectParkingEnforcementLinkVisible(): Promise<void> {
    await expect(this.parkingEnforcementLink).toBeVisible();
  }

  async expectResidentGuideLinkVisible(): Promise<void> {
    await expect(this.residentGuideLink).toBeVisible();
  }

  async expectContactSalesLinkVisible(): Promise<void> {
    await expect(this.contactSalesLink).toBeVisible();
  }

  async expectReserveSpaceLinkVisible(): Promise<void> {
    await expect(this.reserveSpaceLink).toBeVisible();
  }

  async expectAllNavLinksVisible(): Promise<void> {
    await this.expectZarkParkingLinkVisible();
    await this.expectRentableItemsLinkVisible();
    await this.expectParkingEnforcementLinkVisible();
    await this.expectResidentGuideLinkVisible();
    await this.expectContactSalesLinkVisible();
  }
}
