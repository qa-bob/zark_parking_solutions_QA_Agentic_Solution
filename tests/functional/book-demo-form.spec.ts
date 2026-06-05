import { test, expect } from '@playwright/test';
import { BookDemoPage } from '../../pages/BookDemoPage';
import { validDemoFormData } from '../../fixtures/siteData';

test.describe('Book a Demo Form @functional', () => {
  let demoPage: BookDemoPage;

  test.beforeEach(async ({ page }) => {
    demoPage = new BookDemoPage(page);
    await demoPage.goto();
  });

  test('book a demo page loads with correct title @functional', async () => {
    await demoPage.expectCorrectTitle();
  });

  test('page heading is visible @functional', async () => {
    await demoPage.expectPageHeadingVisible();
  });

  test('form is visible on the page @functional', async () => {
    await demoPage.expectFormVisible();
  });

  test('all required form fields are visible @functional', async () => {
    await demoPage.expectAllRequiredFieldsVisible();
  });

  test('First Name field accepts text input @functional', async () => {
    await demoPage.fillFirstName(validDemoFormData.firstName);
    await demoPage.expectFirstNameFilled(validDemoFormData.firstName);
  });

  test('Last Name field accepts text input @functional', async () => {
    await demoPage.fillLastName(validDemoFormData.lastName);
  });

  test('Company Name field accepts text input @functional', async () => {
    await demoPage.fillCompany(validDemoFormData.company);
  });

  test('Business Email field accepts email input @functional', async () => {
    await demoPage.fillEmail(validDemoFormData.email);
    await demoPage.expectEmailFilled(validDemoFormData.email);
  });

  test('all fields can be filled simultaneously @functional', async () => {
    await demoPage.fillForm(validDemoFormData);
    await demoPage.expectFirstNameFilled(validDemoFormData.firstName);
    await demoPage.expectEmailFilled(validDemoFormData.email);
  });

  test('form fields are interactive (editable) @functional', async ({ page }) => {
    const firstNameInput = page.getByPlaceholder('First Name*');
    await expect(firstNameInput).toBeEditable();
    const emailInput = page.getByPlaceholder('Business Email*');
    await expect(emailInput).toBeEditable();
  });

  test('First Name field can be cleared and refilled @functional', async () => {
    await demoPage.fillFirstName('Original');
    await demoPage.fillFirstName('');
    await demoPage.fillFirstName(validDemoFormData.firstName);
    await demoPage.expectFirstNameFilled(validDemoFormData.firstName);
  });
});
