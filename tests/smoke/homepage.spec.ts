import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('hud.io Homepage @smoke', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('page loads and has a title @smoke', async () => {
    await homePage.expectPageLoaded();
    const title = await homePage.getTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  test('page responds with a 200-range status @smoke', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
  });

  test('URL is hud.io @smoke', async () => {
    homePage.expectUrlContains('hud.io');
  });

  test('main content section is present @smoke', async () => {
    await homePage.expectHeroSectionVisible();
  });

  test('H1 heading is visible on the page @smoke', async () => {
    await homePage.expectPageHeadingVisible();
  });
});
