import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Homepage Features @functional', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('page title contains "Zark" @functional', async ({ page }) => {
    await expect(page).toHaveTitle(/Zark/);
  });

  test('H1 heading contains "YOUR terms" @functional', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText(/YOUR terms/i);
  });

  test('"Creating happier communities" section is visible @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /creating happier communities/i }).first();
    await expect(section).toBeVisible();
  });

  test('"Make your community ZarkABLE" section is visible @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /zarkable/i }).first();
    await expect(section).toBeVisible();
  });

  test('"Transform parking from a problem to a perk" section is visible @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /transform parking/i }).first();
    await expect(section).toBeAttached();
  });

  test('"Enhance the resident experience" section is visible @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /enhance the resident experience/i }).first();
    await expect(section).toBeAttached();
  });

  test('"Easy enforcement" section is visible @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /easy enforcement/i }).first();
    await expect(section).toBeAttached();
  });

  test('"Effortless integration" section is visible @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /effortless integration/i }).first();
    await expect(section).toBeVisible();
  });

  test('"Tap. Park. Zark." tagline is present @functional', async ({ page }) => {
    const tagline = page.locator('h2').filter({ hasText: /tap\. park\. zark\./i }).first();
    await expect(tagline).toBeVisible();
  });

  test('Contact Sales CTA is visible @functional', async () => {
    await homePage.expectContactSalesCtaVisible();
  });

  test('Reserve a space CTA is visible @functional', async () => {
    await homePage.expectReserveSpaceCtaVisible();
  });

  test('"For Communities" CTA link is present @functional', async ({ page }) => {
    const link = page.locator('a').filter({ hasText: /for communities/i }).first();
    await expect(link).toBeVisible();
  });

  test('"For Residents" CTA link is present @functional', async ({ page }) => {
    const link = page.locator('a[href*="resident-guide"]').first();
    await expect(link).toBeVisible();
  });

  test('App Store download link is present @functional', async ({ page }) => {
    const link = page.locator('a[href*="apps.apple.com"]');
    await expect(link.first()).toBeVisible();
  });

  test('Google Play download link is present @functional', async ({ page }) => {
    const link = page.locator('a[href*="play.google.com"]');
    await expect(link.first()).toBeVisible();
  });

  test('footer is visible at the bottom of the page @functional', async () => {
    await homePage.expectFooterVisible();
  });
});
