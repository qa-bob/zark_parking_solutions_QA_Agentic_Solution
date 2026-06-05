import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Homepage Features @functional', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('page title contains "Hud" @functional', async ({ page }) => {
    await expect(page).toHaveTitle(/Hud/);
  });

  test('H1 heading contains "Runtime Intelligence" @functional', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toContainText(/runtime intelligence/i);
  });

  test('"Install in 10 seconds" feature section is present @functional', async ({ page }) => {
    const section = page.locator('h2, h3, button, [role="button"]').filter({ hasText: /install in 10 seconds/i }).first();
    await expect(section).toBeVisible();
  });

  test('"Detect code-level issues" feature section is present @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: 'Detect code-level issues' }).first();
    await expect(section).toBeVisible();
  });

  test('"Deep forensic context" feature section is present @functional', async ({ page }) => {
    const section = page.locator('h2, h3, button, [role="button"]').filter({ hasText: /deep forensic context/i }).first();
    await expect(section).toBeVisible();
  });

  test('"Auto-generated fixes" feature section is present @functional', async ({ page }) => {
    const section = page.locator('h2, h3, button, [role="button"]').filter({ hasText: /auto-generated fixes/i }).first();
    await expect(section).toBeVisible();
  });

  test('"Hud Is Not Observability" section is present @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /hud is not observability/i }).first();
    await expect(section).toBeVisible();
  });

  test('"See Hud in Action" section is present @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /see hud in action/i }).first();
    await expect(section).toBeVisible();
  });

  test('Trusted section is present @functional', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /trusted/i }).first();
    await expect(section).toBeVisible();
  });

  test('How it works — "Hud runs with the entire codebase" step is visible @functional', async ({ page }) => {
    const section = page.locator('h3').filter({ hasText: /hud runs with the entire codebase/i }).first();
    await expect(section).toBeVisible();
  });

  test('How it works — "Hud gathers forensic context" step is visible @functional', async ({ page }) => {
    const section = page.locator('h3').filter({ hasText: /hud gathers forensic context/i }).first();
    await expect(section).toBeVisible();
  });

  test('How it works — "Hud sends context to agents" step is visible @functional', async ({ page }) => {
    const section = page.locator('h3').filter({ hasText: /hud sends context to agents/i }).first();
    await expect(section).toBeVisible();
  });

  test('Book a demo CTA link is present on homepage @functional', async ({ page }) => {
    const ctaLink = page.locator('a[href*="book-a-demo"]').first();
    await expect(ctaLink).toBeVisible();
  });

  test('footer is visible at the bottom of the page @functional', async ({ page }) => {
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('social media links are present in footer @functional', async ({ page }) => {
    const socialLinks = page.locator('footer a[href*="linkedin.com"], footer a[href*="x.com"], footer a[href*="twitter.com"]');
    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
