import { test, expect } from '@playwright/test';
import { ContactSalesPage } from '../../pages/ContactSalesPage';
import { validContactSalesFormData } from '../../fixtures/siteData';

test.describe('Contact Sales Form @functional', () => {
  let contactPage: ContactSalesPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactSalesPage(page);
    await contactPage.goto();
  });

  test('contact sales page loads with correct title @functional', async () => {
    await contactPage.expectCorrectTitle();
  });

  test('page heading is visible @functional', async () => {
    await contactPage.expectPageHeadingVisible();
  });

  test('contact form is visible @functional', async () => {
    await contactPage.expectFormVisible();
  });

  test('all required fields are visible @functional', async () => {
    await contactPage.expectAllRequiredFieldsVisible();
  });

  test('First Name field is editable @functional', async ({ page }) => {
    await expect(page.locator('input[name="firstname"]')).toBeEditable();
  });

  test('Last Name field is editable @functional', async ({ page }) => {
    await expect(page.locator('input[name="lastname"]')).toBeEditable();
  });

  test('Email field is editable @functional', async ({ page }) => {
    await expect(page.locator('input[name="email"]')).toBeEditable();
  });

  test('Phone field is editable @functional', async ({ page }) => {
    await expect(page.locator('input[name="phone"]')).toBeEditable();
  });

  test('Company field is editable @functional', async ({ page }) => {
    await expect(page.locator('input[name="company"]')).toBeEditable();
  });

  test('Community Name field is editable @functional', async ({ page }) => {
    await expect(page.locator('input[name="property_community_name"]')).toBeEditable();
  });

  test('Number of Units field is editable @functional', async ({ page }) => {
    await expect(page.locator('input[name="of_units"]')).toBeEditable();
  });

  test('Message field is editable @functional', async ({ page }) => {
    await expect(page.locator('textarea[name="message"]')).toBeEditable();
  });

  test('First Name field accepts text input @functional', async () => {
    await contactPage.fillFirstName(validContactSalesFormData.firstName);
    await contactPage.expectFieldValue('firstName', validContactSalesFormData.firstName);
  });

  test('Email field accepts email input @functional', async () => {
    await contactPage.fillEmail(validContactSalesFormData.email);
    await contactPage.expectFieldValue('email', validContactSalesFormData.email);
  });

  test('Phone field accepts numeric input @functional', async () => {
    await contactPage.fillPhone(validContactSalesFormData.phone);
    await contactPage.expectFieldValue('phone', validContactSalesFormData.phone);
  });

  test('all fields can be filled simultaneously @functional', async () => {
    await contactPage.fillForm(validContactSalesFormData);
    await contactPage.expectFieldValue('firstName', validContactSalesFormData.firstName);
    await contactPage.expectFieldValue('email', validContactSalesFormData.email);
    await contactPage.expectFieldValue('phone', validContactSalesFormData.phone);
  });
});
