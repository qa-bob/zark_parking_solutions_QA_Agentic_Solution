import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Homepage Content Integrity @regression', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('page title is correct @regression', async ({ page }) => {
    await expect(page).toHaveTitle('Zark - Flexible Multifamily Parking');
  });

  test('H1 heading contains "YOUR terms" @regression', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText(/YOUR terms/i);
  });

  test('"Creating happier communities" section is present @regression', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: /creating happier communities/i }).first()).toBeVisible();
  });

  test('"Make your community ZarkABLE" section is present @regression', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: /zarkable/i }).first()).toBeVisible();
  });

  test('"Transform parking from a problem to a perk" section is present @regression', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: /transform parking/i }).first()).toBeAttached();
  });

  test('"Enhance the resident experience" section is present @regression', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: /enhance the resident experience/i }).first()).toBeAttached();
  });

  test('"Easy enforcement" section is present @regression', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: /easy enforcement/i }).first()).toBeAttached();
  });

  test('"Effortless integration" section is present @regression', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: /effortless integration/i }).first()).toBeVisible();
  });

  test('"Tap. Park. Zark." tagline is present @regression', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: /tap\. park\. zark\./i }).first()).toBeVisible();
  });

  test('Contact Sales CTA links are present @regression', async ({ page }) => {
    const links = page.locator('a[href*="contact-sales"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Reserve a space link is present @regression', async ({ page }) => {
    const link = page.locator('a[href*="app.zarkhq.com"]');
    await expect(link.first()).toBeVisible();
  });

  test('App Store link is present @regression', async ({ page }) => {
    await expect(page.locator('a[href*="apps.apple.com"]').first()).toBeVisible();
  });

  test('Google Play link is present @regression', async ({ page }) => {
    await expect(page.locator('a[href*="play.google.com"]').first()).toBeVisible();
  });

  test('footer is present @regression', async () => {
    await homePage.expectFooterVisible();
  });

  test('footer has at least 8 links @regression', async ({ page }) => {
    const count = await page.locator('footer a').count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test('testimonial / quote section is visible @regression', async ({ page }) => {
    const quote = page.locator('h2').filter({ hasText: /zark has provided us/i }).first();
    await expect(quote).toBeVisible();
  });
});
