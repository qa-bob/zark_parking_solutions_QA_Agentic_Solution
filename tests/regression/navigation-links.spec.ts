import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { NavBar } from '../../pages/components/NavBar';

test.describe('Navigation Links Integrity @regression', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
  });

  test('Zark Parking nav link is valid @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getZarkParkingHref();
    expect(href).toBeTruthy();
    expect(href).toMatch(/short-term-parking/);
  });

  test('Rentable Items nav link is valid @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getRentableItemsHref();
    expect(href).toBeTruthy();
    expect(href).toMatch(/rentable-items/);
  });

  test('Parking Enforcement nav link is valid @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getParkingEnforcementHref();
    expect(href).toBeTruthy();
    expect(href).toMatch(/parking-enforcement/);
  });

  test('Resident Guide nav link is valid @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getResidentGuideHref();
    expect(href).toBeTruthy();
    expect(href).toMatch(/resident-guide/);
  });

  test('Contact Sales nav link is valid @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getContactSalesHref();
    expect(href).toBeTruthy();
    expect(href).toMatch(/contact-sales/);
  });

  test('Reserve a space link points to app.zarkhq.com @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getReserveSpaceHref();
    expect(href).toMatch(/app\.zarkhq\.com/);
  });

  test('all footer links have non-empty hrefs @regression', async ({ page }) => {
    const hrefs = await page.locator('footer a[href]').evaluateAll(els =>
      els.map(e => e.getAttribute('href')).filter(h => h)
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });

  test('Terms and Conditions footer link navigates correctly @regression', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: /terms and conditions/i }).click();
    await expect(page).toHaveURL(/terms/);
  });

  test('Privacy Policy footer link navigates correctly @regression', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: /privacy policy/i }).click();
    await expect(page).toHaveURL(/privacy-policy/);
  });

  test('Zark Parking footer link navigates correctly @regression', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: /^zark parking$/i }).click();
    await expect(page).toHaveURL(/short-term-parking/);
  });

  test('Rentable Items footer link navigates correctly @regression', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: /^rentable items$/i }).click();
    await expect(page).toHaveURL(/rentable-items/);
  });

  test('PMS Integrations footer link navigates correctly @regression', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: /pms integrations/i }).click();
    await expect(page).toHaveURL(/pms-integrations/);
  });
});
