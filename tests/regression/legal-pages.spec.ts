import { test } from '@playwright/test';
import { LegalPage } from '../../pages/LegalPage';

test.describe('Legal Pages @regression', () => {
  test.describe('Terms of Service', () => {
    let tosPage: LegalPage;

    test.beforeEach(async ({ page }) => {
      tosPage = new LegalPage(page, '/legal/terms-of-service/');
      await tosPage.goto();
    });

    test('Terms of Service page has correct title @regression', async () => {
      await tosPage.expectTitle('Terms of service - Hud');
    });

    test('Terms of Service H1 heading is visible @regression', async () => {
      await tosPage.expectPageHeadingVisible();
      await tosPage.expectPageHeadingText('Terms of service');
    });

    test('Terms of Service has at least 5 section headings @regression', async () => {
      await tosPage.expectSectionHeadingsPresent(5);
    });

    test('"Acceptance of Terms" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/acceptance of terms/i);
    });

    test('"Use Restrictions" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/use restrictions/i);
    });

    test('"Intellectual Property" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/intellectual property/i);
    });

    test('"Disclaimers" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/disclaimers/i);
    });

    test('"Limitation of Liability" section is present @regression', async () => {
      await tosPage.expectSectionVisible(/limitation of liability/i);
    });
  });

  test.describe('Privacy Policy', () => {
    let privacyPage: LegalPage;

    test.beforeEach(async ({ page }) => {
      privacyPage = new LegalPage(page, '/legal/privacy-policy/');
      await privacyPage.goto();
    });

    test('Privacy Policy page has correct title @regression', async () => {
      await privacyPage.expectTitle('Privacy Policy - Hud');
    });

    test('Privacy Policy H1 heading is visible @regression', async () => {
      await privacyPage.expectPageHeadingVisible();
      await privacyPage.expectPageHeadingText('Privacy Policy');
    });

    test('Privacy Policy has at least 5 section headings @regression', async () => {
      await privacyPage.expectSectionHeadingsPresent(5);
    });

    test('"Summary" section is present @regression', async () => {
      await privacyPage.expectSectionVisible(/summary/i);
    });

    test('"Information We Collect" section is present @regression', async () => {
      await privacyPage.expectSectionVisible(/information we collect/i);
    });

    test('"Cookies" section is present @regression', async () => {
      await privacyPage.expectSectionVisible(/cookies/i);
    });

    test('"Information Sharing" section is present @regression', async () => {
      await privacyPage.expectSectionVisible(/information sharing/i);
    });
  });
});
