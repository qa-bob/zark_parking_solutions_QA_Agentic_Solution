---
applyTo: "tests/**/*.ts,tests/**/*.spec.ts"
---

# Playwright Test Instructions

## Test File Structure

Every test file must follow this structure:

```typescript
import { test, expect } from '@playwright/test';
import { PageClassName } from '../../pages/PageClassName';

test.describe('Feature or Page Name', () => {
  let page: PageClassName;

  test.beforeEach(async ({ page: playwrightPage }) => {
    page = new PageClassName(playwrightPage);
    await page.navigate();
  });

  test('descriptive test name in plain English', async () => {
    // Arrange → Act → Assert
  });
});
```

## Assertions

- Always use `expect` from `@playwright/test`.
- Prefer `toBeVisible()`, `toHaveText()`, `toHaveURL()` over generic `.toBe()` where applicable.
- Use soft assertions (`expect.soft()`) for non-blocking checks within a single test.
- Always `await` assertions — never call `expect(locator).toBeVisible()` without `await`.

## Waiting & Retries

- Do **not** use `page.waitForTimeout()` (hard sleeps) — use Playwright's built-in auto-waiting.
- If explicit waiting is required, prefer `page.waitForSelector()`, `page.waitForURL()`, or `expect(locator).toBeVisible()`.
- Configure global timeouts in `playwright.config.ts`, not inline in tests.

## Test Data

- Never hardcode credentials or sensitive values in test files.
- Load test data from `fixtures/` using TypeScript imports or `JSON` files.
- Use environment variables (via `.env` + `dotenv`) for secrets; access via `process.env.VARIABLE_NAME`.

## Tagging & Organization

- Tag tests with `@smoke`, `@functional`, or `@regression` using the `test.tag()` API or name conventions.
- Place smoke tests in `tests/smoke/`, functional in `tests/functional/`, regression in `tests/regression/`.
- Use `test.skip()` or `test.fixme()` (with a reason) when a test is temporarily disabled — never delete assertions.

## Parallelism

- Tests **must** be independent and stateless so they can run in parallel.
- Use unique test data per test run where state is involved (e.g., unique usernames).
- Avoid writing tests that depend on execution order.
