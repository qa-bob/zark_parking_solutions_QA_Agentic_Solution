import { test, expect } from '@playwright/test';
import { ResidentGuidePage } from '../../pages/ResidentGuidePage';
import { validResidentSupportFormData } from '../../fixtures/siteData';

test.describe('Resident Guide Page @functional', () => {
  let guidePage: ResidentGuidePage;

  test.beforeEach(async ({ page }) => {
    guidePage = new ResidentGuidePage(page);
    await guidePage.goto();
  });

  test('resident guide page loads with correct title @functional', async () => {
    await guidePage.expectCorrectTitle();
  });

  test('page heading is visible @functional', async () => {
    await guidePage.expectPageHeadingVisible();
  });

  test('"Extra parking made simple" section is visible @functional', async () => {
    await guidePage.expectExtraParkingSectionVisible();
  });

  test('support form is visible on the page @functional', async () => {
    await guidePage.expectSupportFormVisible();
  });

  test('email field is present and editable @functional', async ({ page }) => {
    await guidePage.expectEmailInputVisible();
    await expect(page.locator('input[name="email"]')).toBeEditable();
  });

  test('community name field is present and editable @functional', async ({ page }) => {
    await expect(page.locator('input[name="property_community_name"]')).toBeEditable();
  });

  test('subject field is present and editable @functional', async ({ page }) => {
    await guidePage.expectSubjectInputVisible();
    await expect(page.locator('input[name="TICKET.subject"]')).toBeEditable();
  });

  test('message field is present and editable @functional', async ({ page }) => {
    await expect(page.locator('textarea[name="TICKET.content"]')).toBeEditable();
  });

  test('email field accepts email input @functional', async () => {
    await guidePage.fillEmail(validResidentSupportFormData.email);
  });

  test('subject field accepts text input @functional', async () => {
    await guidePage.fillSubject(validResidentSupportFormData.subject);
  });

  test('message field accepts long text @functional', async () => {
    await guidePage.fillMessage(validResidentSupportFormData.message);
  });
});
