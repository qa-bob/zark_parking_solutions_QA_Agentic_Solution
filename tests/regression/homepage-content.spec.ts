import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Homepage Content Integrity @regression', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('page title is correct @regression', async ({ page }) => {
    await expect(page).toHaveTitle(/Hud \| Runtime Code Sensor/i);
  });

  test('H1 heading text matches expected value @regression', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText(/Runtime Intelligence/i);
  });

  test('subtitle or description references "Coding Agents" @regression', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText(/coding agents/i);
  });

  test('"Install in 10 seconds" section heading exists @regression', async ({ page }) => {
    const heading = page.locator('h2').filter({ hasText: 'Install in 10 seconds' });
    await expect(heading.first()).toBeVisible();
  });

  test('"Detect code-level issues" section heading exists @regression', async ({ page }) => {
    const heading = page.locator('h2').filter({ hasText: 'Detect code-level issues' });
    await expect(heading.first()).toBeVisible();
  });

  test('"Deep forensic context" section heading exists @regression', async ({ page }) => {
    const heading = page.locator('h2').filter({ hasText: 'Deep forensic context' });
    await expect(heading.first()).toBeVisible();
  });

  test('"Auto-generated fixes" section heading exists @regression', async ({ page }) => {
    const heading = page.locator('h2').filter({ hasText: 'Auto-generated fixes' });
    await expect(heading.first()).toBeVisible();
  });

  test('"Hud Is Not Observability" section exists @regression', async ({ page }) => {
    const heading = page.locator('h2').filter({ hasText: 'Hud Is Not Observability' });
    await expect(heading.first()).toBeVisible();
  });

  test('All three "how it works" steps are present @regression', async ({ page }) => {
    await expect(page.locator('h3').filter({ hasText: /hud runs with the entire codebase/i }).first()).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: /hud gathers forensic context/i }).first()).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: /hud sends context to agents/i }).first()).toBeVisible();
  });

  test('Trusted section is present @regression', async ({ page }) => {
    const section = page.locator('h2').filter({ hasText: /trusted by engineers/i }).first();
    await expect(section).toBeVisible();
  });

  test('Page contains at least one "Book a demo" CTA link @regression', async ({ page }) => {
    const ctaLinks = page.locator('a[href*="book-a-demo"]');
    const count = await ctaLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Page contains a footer @regression', async ({ page }) => {
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('Footer has at least 5 links @regression', async ({ page }) => {
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('LinkedIn social link is present @regression', async ({ page }) => {
    const linkedIn = page.locator('a[href*="linkedin.com"]');
    await expect(linkedIn.first()).toBeVisible();
  });
});
