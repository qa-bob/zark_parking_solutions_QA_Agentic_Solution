---
applyTo: "pages/**/*.ts"
---

# Page Object Model (POM) Instructions

## Class Structure

All page objects must follow this OOP structure:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExamplePage extends BasePage {
  // Private locators as getters — never expose raw Locator to consumers
  private get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  private get emailInput(): Locator {
    return this.page.getByLabel('Email address');
  }

  constructor(page: Page) {
    super(page, '/example-path'); // Pass the relative URL to BasePage
  }

  // Public action methods (imperative, verb-first naming)
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  // Public assertion helpers (noun-first or expect-prefixed naming)
  async expectSubmitButtonEnabled(): Promise<void> {
    await expect(this.submitButton).toBeEnabled();
  }
}
```

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Class name | PascalCase + `Page` suffix | `LoginPage`, `DashboardPage` |
| Locator getters | camelCase, descriptive noun | `submitButton`, `errorMessage` |
| Action methods | camelCase, verb-first | `clickLogin()`, `fillSearchQuery()` |
| Assertion helpers | camelCase, `expect`-prefixed | `expectErrorVisible()` |
| File name | matches class name | `LoginPage.ts` |

## Locator Priority (in order of preference)

1. `getByTestId()` — when `data-testid` attributes are present
2. `getByRole()` — semantic ARIA roles (most resilient)
3. `getByLabel()` — form inputs via visible label
4. `getByText()` — visible text content
5. `getByPlaceholder()` — form inputs via placeholder
6. CSS/XPath selectors — only as a **last resort**

## BasePage Contract

`BasePage` provides:
- `this.page` — the Playwright `Page` instance
- `navigate()` — navigates to the page's URL (uses the path passed to `super()`)
- Common utility methods shared across all pages

When extending `BasePage`, always call `super(page, '/your-path')` in the constructor.

## Rules

- **Never** import `expect` from `@playwright/test` inside page objects — assertion helpers should use the `expect` imported at the top of the POM file.
- **Never** call `test()` or `test.describe()` inside a page object.
- Keep business logic out of page objects — they represent UI interactions only.
- If a component (e.g., header nav, modal, sidebar) is reused across pages, create a dedicated **component class** in `pages/components/`.
