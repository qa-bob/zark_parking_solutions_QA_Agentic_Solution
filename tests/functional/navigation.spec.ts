import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { NavBar } from '../../pages/components/NavBar';
import { AboutUsPage } from '../../pages/AboutUsPage';
import { BookDemoPage } from '../../pages/BookDemoPage';
import { BlogPage } from '../../pages/BlogPage';

test.describe('Navigation @functional', () => {
  let homePage: HomePage;
  let nav: NavBar;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    nav = new NavBar(page);
    await homePage.goto();
  });

  test('navigation bar is visible on homepage @functional', async () => {
    await nav.expectNavVisible();
  });

  test('all primary nav links are visible @functional', async () => {
    await nav.expectAllNavLinksVisible();
  });

  test('Blog nav link points to the blog page @functional', async () => {
    const href = await nav.getBlogHref();
    expect(href).toMatch(/blog/);
  });

  test('Docs nav link points to docs.hud.io @functional', async () => {
    const href = await nav.getDocsHref();
    expect(href).toMatch(/docs\.hud\.io/);
  });

  test('Book a demo nav link points to book-a-demo page @functional', async () => {
    const href = await nav.getBookDemoHref();
    expect(href).toMatch(/book-a-demo/);
  });

  test('Log in nav link points to app.hud.io @functional', async () => {
    const href = await nav.getLoginHref();
    expect(href).toMatch(/app\.hud\.io/);
  });

  test('clicking About us navigates to about page @functional', async ({ page }) => {
    await nav.clickAboutUs();
    await expect(page).toHaveURL(/about-us/);
    const aboutPage = new AboutUsPage(page);
    await aboutPage.expectPageHeadingVisible();
  });

  test('clicking Book a demo navigates to demo page @functional', async ({ page }) => {
    await nav.clickBookDemo();
    await expect(page).toHaveURL(/book-a-demo/);
    const demoPage = new BookDemoPage(page);
    await demoPage.expectFormVisible();
  });

  test('clicking Blog navigates to blog page @functional', async ({ page }) => {
    await nav.clickBlog();
    await expect(page).toHaveURL(/blog/);
    const blogPage = new BlogPage(page);
    await blogPage.expectCorrectTitle();
  });

  test('footer contains Terms of Service link @functional', async ({ page }) => {
    const tosLink = page.locator('footer').getByRole('link', { name: /terms of service/i });
    await expect(tosLink).toBeVisible();
    const href = await tosLink.getAttribute('href');
    expect(href).toMatch(/terms-of-service/);
  });

  test('footer contains Privacy Policy link @functional', async ({ page }) => {
    const privacyLink = page.locator('footer').getByRole('link', { name: /privacy policy/i });
    await expect(privacyLink).toBeVisible();
    const href = await privacyLink.getAttribute('href');
    expect(href).toMatch(/privacy-policy/);
  });

  test('footer contains Contact us link @functional', async ({ page }) => {
    const contactLink = page.locator('footer').getByRole('link', { name: /contact us/i });
    await expect(contactLink).toBeVisible();
  });

  test('footer contains Careers link @functional', async ({ page }) => {
    const careersLink = page.locator('footer').getByRole('link', { name: /careers/i });
    await expect(careersLink).toBeVisible();
  });
});
