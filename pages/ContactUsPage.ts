import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the hud.io Contact Us page (/contact-us/).
 * Contains a form with: First Name, Last Name, Company, Business Email, Message.
 */
export class ContactUsPage extends BasePage {
  constructor(page: Page) {
    super(page, '/contact-us/');
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

  private get messageTextarea(): Locator {
    return this.page.getByPlaceholder('Message');
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

  async fillMessage(value: string): Promise<void> {
    await this.messageTextarea.fill(value);
  }

  async fillForm(data: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    message?: string;
  }): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillCompany(data.company);
    await this.fillEmail(data.email);
    if (data.message) {
      await this.fillMessage(data.message);
    }
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

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

  async expectMessageFieldVisible(): Promise<void> {
    await expect(this.messageTextarea).toBeVisible();
  }

  async expectAllFieldsVisible(): Promise<void> {
    await this.expectFirstNameInputVisible();
    await this.expectLastNameInputVisible();
    await this.expectEmailInputVisible();
    await this.expectMessageFieldVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Contact us - Hud');
  }

  async expectFieldFilled(field: 'firstName' | 'lastName' | 'email' | 'message', value: string): Promise<void> {
    const locatorMap = {
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
      email: this.emailInput,
      message: this.messageTextarea,
    };
    await expect(locatorMap[field]).toHaveValue(value);
  }
}
