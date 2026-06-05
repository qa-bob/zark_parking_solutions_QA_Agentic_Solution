import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the hud.io Book a Demo page (/book-a-demo/).
 * Contains a contact form with: First Name, Last Name, Company, Business Email, How did you hear.
 */
export class BookDemoPage extends BasePage {
  constructor(page: Page) {
    super(page, '/book-a-demo/');
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get form(): Locator {
    return this.page.locator('form').first();
  }

  private get firstNameInput(): Locator {
    return this.page.getByPlaceholder('First Name*');
  }

  private get lastNameInput(): Locator {
    return this.page.getByPlaceholder('Last Name*');
  }

  private get companyInput(): Locator {
    return this.page.getByPlaceholder('Company Name');
  }

  private get emailInput(): Locator {
    return this.page.getByPlaceholder('Business Email*');
  }

  private get howHeardDropdown(): Locator {
    return this.page.getByPlaceholder("How did you hear about Hud?*");
  }

  private get submitButton(): Locator {
    return this.form.locator('button[type="submit"], input[type="submit"], button').last();
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillFirstName(value: string): Promise<void> {
    await this.firstNameInput.fill(value);
  }

  async fillLastName(value: string): Promise<void> {
    await this.lastNameInput.fill(value);
  }

  async fillCompany(value: string): Promise<void> {
    await this.companyInput.fill(value);
  }

  async fillEmail(value: string): Promise<void> {
    await this.emailInput.fill(value);
  }

  async fillForm(data: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
  }): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillCompany(data.company);
    await this.fillEmail(data.email);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  async expectPageHeadingVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async expectFormVisible(): Promise<void> {
    await expect(this.form).toBeVisible();
  }

  async expectFirstNameInputVisible(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
  }

  async expectLastNameInputVisible(): Promise<void> {
    await expect(this.lastNameInput).toBeVisible();
  }

  async expectEmailInputVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
  }

  async expectAllRequiredFieldsVisible(): Promise<void> {
    await this.expectFirstNameInputVisible();
    await this.expectLastNameInputVisible();
    await this.expectEmailInputVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Book a demo - Hud');
  }

  async expectFirstNameFilled(value: string): Promise<void> {
    await expect(this.firstNameInput).toHaveValue(value);
  }

  async expectEmailFilled(value: string): Promise<void> {
    await expect(this.emailInput).toHaveValue(value);
  }
}
