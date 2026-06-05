import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { NavBar } from '../../pages/components/NavBar';

test.describe('Navigation Links Integrity @regression', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
  });

  test('Blog link in nav is not broken @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getBlogHref();
    expect(href).toBeTruthy();
    expect(href).toMatch(/blog/);
  });

  test('Docs link in nav is not broken @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getDocsHref();
    expect(href).toBeTruthy();
    expect(href).toMatch(/docs\.hud\.io/);
  });

  test('About us link in nav is not broken @regression', async ({ page }) => {
    const aboutLink = page.locator('nav').getByRole('link', { name: 'About us' }).first();
    const href = await aboutLink.getAttribute('href');
    expect(href).toMatch(/about-us/);
  });

  test('Book a demo link in nav is not broken @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getBookDemoHref();
    expect(href).toBeTruthy();
    expect(href).toMatch(/book-a-demo/);
  });

  test('Log in link in nav points to app.hud.io @regression', async ({ page }) => {
    const nav = new NavBar(page);
    const href = await nav.getLoginHref();
    expect(href).toMatch(/app\.hud\.io/);
  });

  test('all footer links have non-empty hrefs @regression', async ({ page }) => {
    const footerLinks = page.locator('footer a[href]');
    const hrefs = await footerLinks.evaluateAll(els =>
      els.map(e => e.getAttribute('href')).filter(h => h)
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });

  test('Terms of Service footer link navigates correctly @regression', async ({ page }) => {
    const tosLink = page.locator('footer').getByRole('link', { name: /terms of service/i });
    await tosLink.click();
    await expect(page).toHaveURL(/terms-of-service/);
  });

  test('Privacy Policy footer link navigates correctly @regression', async ({ page }) => {
    const privacyLink = page.locator('footer').getByRole('link', { name: /privacy policy/i });
    await privacyLink.click();
    await expect(page).toHaveURL(/privacy-policy/);
  });

  test('About us footer link navigates correctly @regression', async ({ page }) => {
    const aboutLink = page.locator('footer').getByRole('link', { name: 'About us' });
    await aboutLink.click();
    await expect(page).toHaveURL(/about-us/);
  });

  test('Careers footer link navigates correctly @regression', async ({ page }) => {
    const careersLink = page.locator('footer').getByRole('link', { name: 'Careers' });
    await careersLink.click();
    await expect(page).toHaveURL(/careers/);
  });

  test('Contact us footer link navigates correctly @regression', async ({ page }) => {
    const contactLink = page.locator('footer').getByRole('link', { name: /contact us/i });
    await contactLink.click();
    await expect(page).toHaveURL(/contact-us/);
  });
});
