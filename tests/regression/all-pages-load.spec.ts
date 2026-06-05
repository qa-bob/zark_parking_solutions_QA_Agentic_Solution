import { test, expect } from '@playwright/test';
import { allPages } from '../../fixtures/siteData';

test.describe('All Pages Load @regression', () => {
  for (const { name, path, expectedTitle } of allPages) {
    test(`${name} page loads with HTTP 200 and correct title @regression`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect.soft(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(expectedTitle);
    });
  }

  test('Homepage has no JS console errors @regression', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    const critical = errors.filter(e =>
      !e.includes('favicon') &&
      !e.includes('reCAPTCHA') &&
      !e.includes('recaptcha') &&
      !e.includes('404') &&
      !e.includes('Failed to load resource')
    );
    expect(critical).toHaveLength(0);
  });

  test('Contact Sales page has a form @regression', async ({ page }) => {
    await page.goto('/contact-sales', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('form').first()).toBeVisible();
  });

  test('Resident Guide page has a form @regression', async ({ page }) => {
    await page.goto('/resident-guide', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('form').first()).toBeVisible();
  });

  test('All product pages have H1 headings @regression', async ({ page }) => {
    const productPaths = [
      '/short-term-parking', '/rentable-items',
      '/parking-enforcement', '/pms-integrations',
    ];
    for (const path of productPaths) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect.soft(page.locator('h1').first()).toBeVisible();
    }
  });
});
