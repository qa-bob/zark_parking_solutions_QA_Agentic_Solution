import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for /resident-guide — Resident Guide page.
 * Contains a HubSpot support ticket form.
 */
export class ResidentGuidePage extends BasePage {
  constructor(page: Page) {
    super(page, '/resident-guide');
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get extraParkingSection(): Locator {
    return this.page.locator('h2').filter({ hasText: /extra parking made simple/i }).first();
  }

  private get supportForm(): Locator {
    return this.page.locator('form').first();
  }

  private get emailInput(): Locator {
    return this.page.locator('input[name="email"]');
  }

  private get communityNameInput(): Locator {
    return this.page.locator('input[name="property_community_name"]');
  }

  private get subjectInput(): Locator {
    return this.page.locator('input[name="TICKET.subject"]');
  }

  private get messageTextarea(): Locator {
    return this.page.locator('textarea[name="TICKET.content"]');
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillEmail(value: string): Promise<void> {
    await this.emailInput.fill(value);
  }

  async fillCommunityName(value: string): Promise<void> {
    await this.communityNameInput.fill(value);
  }

  async fillSubject(value: string): Promise<void> {
    await this.subjectInput.fill(value);
  }

  async fillMessage(value: string): Promise<void> {
    await this.messageTextarea.fill(value);
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  async expectPageHeadingVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async expectExtraParkingSectionVisible(): Promise<void> {
    await expect(this.extraParkingSection).toBeVisible();
  }

  async expectSupportFormVisible(): Promise<void> {
    await expect(this.supportForm).toBeVisible();
  }

  async expectEmailInputVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
  }

  async expectSubjectInputVisible(): Promise<void> {
    await expect(this.subjectInput).toBeVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Getting Started as a Resident');
  }
}
