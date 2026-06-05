import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../../pages/ContactUsPage';
import { validContactFormData } from '../../fixtures/siteData';

test.describe('Contact Us Form @functional', () => {
  let contactPage: ContactUsPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactUsPage(page);
    await contactPage.goto();
  });

  test('contact us page loads with correct title @functional', async () => {
    await contactPage.expectCorrectTitle();
  });

  test('contact form is visible @functional', async () => {
    await contactPage.expectFormVisible();
  });

  test('all form fields are visible @functional', async () => {
    await contactPage.expectAllFieldsVisible();
  });

  test('First Name field is present and editable @functional', async ({ page }) => {
    await contactPage.expectFirstNameInputVisible();
    await expect(page.getByPlaceholder('First Name*')).toBeEditable();
  });

  test('Last Name field is present and editable @functional', async ({ page }) => {
    await contactPage.expectLastNameInputVisible();
    await expect(page.getByPlaceholder('Last Name*')).toBeEditable();
  });

  test('Business Email field is present and editable @functional', async ({ page }) => {
    await contactPage.expectEmailInputVisible();
    await expect(page.getByPlaceholder('Business Email*')).toBeEditable();
  });

  test('Message field is present and editable @functional', async ({ page }) => {
    await contactPage.expectMessageFieldVisible();
    await expect(page.getByPlaceholder('Message')).toBeEditable();
  });

  test('First Name field accepts text input @functional', async () => {
    await contactPage.fillFirstName(validContactFormData.firstName);
    await contactPage.expectFieldFilled('firstName', validContactFormData.firstName);
  });

  test('Email field accepts email input @functional', async () => {
    await contactPage.fillEmail(validContactFormData.email);
    await contactPage.expectFieldFilled('email', validContactFormData.email);
  });

  test('Message field accepts long text @functional', async () => {
    const longMessage = validContactFormData.message.repeat(3);
    await contactPage.fillMessage(longMessage);
    await contactPage.expectFieldFilled('message', longMessage);
  });

  test('entire form can be filled with valid data @functional', async () => {
    await contactPage.fillForm(validContactFormData);
    await contactPage.expectFieldFilled('firstName', validContactFormData.firstName);
    await contactPage.expectFieldFilled('email', validContactFormData.email);
    await contactPage.expectFieldFilled('message', validContactFormData.message);
  });
});
