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

  test('Homepage has no console errors @regression', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });

  test('Book a demo page has an H1 heading @regression', async ({ page }) => {
    await page.goto('/book-a-demo/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Contact us page has an H1 heading @regression', async ({ page }) => {
    await page.goto('/contact-us/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('About us page has an H1 heading @regression', async ({ page }) => {
    await page.goto('/about-us/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Careers page has an H1 heading @regression', async ({ page }) => {
    await page.goto('/careers/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Terms of Service page has an H1 heading @regression', async ({ page }) => {
    await page.goto('/legal/terms-of-service/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Privacy Policy page has an H1 heading @regression', async ({ page }) => {
    await page.goto('/legal/privacy-policy/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
