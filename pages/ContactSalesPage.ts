import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for /contact-sales — Contact Sales page with form.
 * Form fields: firstname, lastname, email, phone, company,
 *              property_community_name, of_units, message, address
 */
export class ContactSalesPage extends BasePage {
  constructor(page: Page) {
    super(page, '/contact-sales');
  }

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get pageHeading(): Locator {
    return this.page.locator('h1').first();
  }

  private get form(): Locator {
    return this.page.locator('form').first();
  }

  private get firstNameInput(): Locator {
    return this.page.locator('input[name="firstname"]');
  }

  private get lastNameInput(): Locator {
    return this.page.locator('input[name="lastname"]');
  }

  private get emailInput(): Locator {
    return this.page.locator('input[name="email"]');
  }

  private get phoneInput(): Locator {
    return this.page.locator('input[name="phone"]');
  }

  private get companyInput(): Locator {
    return this.page.locator('input[name="company"]');
  }

  private get communityNameInput(): Locator {
    return this.page.locator('input[name="property_community_name"]');
  }

  private get numberOfUnitsInput(): Locator {
    return this.page.locator('input[name="of_units"]');
  }

  private get messageTextarea(): Locator {
    return this.page.locator('textarea[name="message"]');
  }

  private get submitButton(): Locator {
    return this.form.locator('input[type="submit"], button[type="submit"]').first();
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

  async fillEmail(value: string): Promise<void> {
    await this.emailInput.fill(value);
  }

  async fillPhone(value: string): Promise<void> {
    await this.phoneInput.fill(value);
  }

  async fillCompany(value: string): Promise<void> {
    await this.companyInput.fill(value);
  }

  async fillCommunityName(value: string): Promise<void> {
    await this.communityNameInput.fill(value);
  }

  async fillNumberOfUnits(value: string): Promise<void> {
    await this.numberOfUnitsInput.fill(value);
  }

  async fillMessage(value: string): Promise<void> {
    await this.messageTextarea.fill(value);
  }

  async fillForm(data: {
    firstName: string; lastName: string; email: string; phone: string;
    company: string; communityName: string; numberOfUnits: string; message: string;
  }): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillEmail(data.email);
    await this.fillPhone(data.phone);
    await this.fillCompany(data.company);
    await this.fillCommunityName(data.communityName);
    await this.fillNumberOfUnits(data.numberOfUnits);
    await this.fillMessage(data.message);
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

  async expectEmailInputVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
  }

  async expectPhoneInputVisible(): Promise<void> {
    await expect(this.phoneInput).toBeVisible();
  }

  async expectAllRequiredFieldsVisible(): Promise<void> {
    await this.expectFirstNameInputVisible();
    await expect(this.lastNameInput).toBeVisible();
    await this.expectEmailInputVisible();
    await this.expectPhoneInputVisible();
  }

  async expectCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle("Let's Get Zarking!");
  }

  async expectFieldValue(field: 'firstName' | 'lastName' | 'email' | 'phone' | 'company', value: string): Promise<void> {
    const map = {
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
      email: this.emailInput,
      phone: this.phoneInput,
      company: this.companyInput,
    };
    await expect(map[field]).toHaveValue(value);
  }
}
