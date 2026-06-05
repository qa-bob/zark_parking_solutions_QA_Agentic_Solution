import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { NavBar } from '../../pages/components/NavBar';
import { ZarkParkingPage } from '../../pages/ZarkParkingPage';
import { ContactSalesPage } from '../../pages/ContactSalesPage';
import { ResidentGuidePage } from '../../pages/ResidentGuidePage';

test.describe('Navigation @functional', () => {
  let homePage: HomePage;
  let nav: NavBar;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    nav = new NavBar(page);
    await homePage.goto();
  });

  test('navigation header is visible on homepage @functional', async () => {
    await nav.expectNavVisible();
  });

  test('all primary nav links are visible @functional', async () => {
    await nav.expectAllNavLinksVisible();
  });

  test('Zark Parking nav link points to /short-term-parking @functional', async () => {
    const href = await nav.getZarkParkingHref();
    expect(href).toMatch(/short-term-parking/);
  });

  test('Rentable Items nav link points to /rentable-items @functional', async () => {
    const href = await nav.getRentableItemsHref();
    expect(href).toMatch(/rentable-items/);
  });

  test('Parking Enforcement nav link points to /parking-enforcement @functional', async () => {
    const href = await nav.getParkingEnforcementHref();
    expect(href).toMatch(/parking-enforcement/);
  });

  test('Resident Guide nav link points to /resident-guide @functional', async () => {
    const href = await nav.getResidentGuideHref();
    expect(href).toMatch(/resident-guide/);
  });

  test('Contact Sales nav link points to /contact-sales @functional', async () => {
    const href = await nav.getContactSalesHref();
    expect(href).toMatch(/contact-sales/);
  });

  test('Reserve a space link points to app.zarkhq.com @functional', async () => {
    const href = await nav.getReserveSpaceHref();
    expect(href).toMatch(/app\.zarkhq\.com/);
  });

  test('clicking Zark Parking navigates to the product page @functional', async ({ page }) => {
    await nav.clickZarkParking();
    await expect(page).toHaveURL(/short-term-parking/);
    const zarkPage = new ZarkParkingPage(page);
    await zarkPage.expectPageHeadingVisible();
  });

  test('clicking Contact Sales navigates to the contact form @functional', async ({ page }) => {
    await nav.clickContactSales();
    await expect(page).toHaveURL(/contact-sales/);
    const contactPage = new ContactSalesPage(page);
    await contactPage.expectFormVisible();
  });

  test('clicking Resident Guide navigates to the guide page @functional', async ({ page }) => {
    await nav.clickResidentGuide();
    await expect(page).toHaveURL(/resident-guide/);
    const guidePage = new ResidentGuidePage(page);
    await guidePage.expectPageHeadingVisible();
  });

  test('footer contains Terms and Conditions link @functional', async ({ page }) => {
    const link = page.locator('footer').getByRole('link', { name: /terms and conditions/i });
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toMatch(/terms-and-conditions/);
  });

  test('footer contains Privacy Policy link @functional', async ({ page }) => {
    const link = page.locator('footer').getByRole('link', { name: /privacy policy/i });
    await expect(link).toBeVisible();
  });

  test('footer contains Contact Sales link @functional', async ({ page }) => {
    const link = page.locator('footer').getByRole('link', { name: /contact sales/i });
    await expect(link).toBeVisible();
  });

  test('footer contains PMS Integrations link @functional', async ({ page }) => {
    const link = page.locator('footer').getByRole('link', { name: /pms integrations/i });
    await expect(link).toBeVisible();
  });
});
