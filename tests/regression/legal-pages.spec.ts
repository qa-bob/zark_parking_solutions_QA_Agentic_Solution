import { test } from '@playwright/test';
import { LegalPage } from '../../pages/LegalPage';

test.describe('Legal Pages @regression', () => {
  test.describe('Terms and Conditions', () => {
    let tosPage: LegalPage;

    test.beforeEach(async ({ page }) => {
      tosPage = new LegalPage(page, '/terms-and-conditions');
      await tosPage.goto();
    });

    test('Terms and Conditions page has correct title @regression', async () => {
      await tosPage.expectTitle('Terms and Conditions');
    });

    test('Terms and Conditions H1 heading is visible @regression', async () => {
      await tosPage.expectPageHeadingVisible();
      await tosPage.expectPageHeadingText('Terms');
    });

    test('Terms and Conditions has at least 6 section headings @regression', async () => {
      await tosPage.expectSectionHeadingsPresent(6);
    });

    test('"Description of Services" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/description of services/i);
    });

    test('"Definitions" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/definitions/i);
    });

    test('"Privacy" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/privacy/i);
    });

    test('"Fees and Payment" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/fees and payment/i);
    });

    test('"Prohibited Conduct" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/prohibited conduct/i);
    });
  });

  test.describe('Privacy Policy', () => {
    let privacyPage: LegalPage;

    test.beforeEach(async ({ page }) => {
      privacyPage = new LegalPage(page, '/privacy-policy');
      await privacyPage.goto();
    });

    test('Privacy Policy page has correct title @regression', async () => {
      await privacyPage.expectTitle('Privacy Policy');
    });

    test('Privacy Policy H1 heading is visible @regression', async () => {
      await privacyPage.expectPageHeadingVisible();
      await privacyPage.expectPageHeadingText('Privacy Policy');
    });

    test('Privacy Policy has at least 5 section headings @regression', async () => {
      await privacyPage.expectSectionHeadingsPresent(5);
    });

    test('"Collection of Information" section is present @regression', async () => {
      await privacyPage.expectSectionVisible(/collection of information/i);
    });

    test('"Use of Information" section is present @regression', async () => {
      await privacyPage.expectSectionVisible(/use of information/i);
    });

    test('"Sharing of Information" section is present @regression', async () => {
      await privacyPage.expectSectionVisible(/sharing of information/i);
    });

    test('"Contact Us" section is present @regression', async () => {
      await privacyPage.expectSectionVisible(/contact us/i);
    });
  });
});
