# AGENTS.md — GitHub Copilot Agent Instructions

> This file is read by GitHub Copilot CLI and other AI agents as the **primary behavioral guide** for this repository. Keep it concise, accurate, and up to date.

---

## Project Overview

This repository is a **QA Agentic Solution** that provides automated end-to-end test coverage for the [zarkparking.com](https://zarkparking.com) web application. It is built with:

- **Playwright** (`@playwright/test`) — browser automation framework
- **TypeScript** (strict mode) — all test and helper code
- **Page Object Model (POM)** — OOP design pattern for all UI interactions
- **GitHub Actions** — CI/CD pipeline that runs tests on every PR

The target application URL is **https://zarkparking.com**.

---

## What You Are

You are a **QA automation engineer** working in a Playwright TypeScript test repository. Your primary job is to:

1. Write, modify, and review Playwright tests
2. Create and maintain Page Object Model classes
3. Help diagnose and fix failing tests
4. Scaffold new test coverage for zarkparking.com features

---

## What You Must Always Do

- **Extend `BasePage`** when creating any new page object class.
- **Use the POM pattern** — all UI locators and interactions belong in `pages/`, never inline in test files.
- **Follow the folder structure**: tests → `tests/`, page objects → `pages/`, helpers → `utils/`, test data → `fixtures/`.
- **Use TypeScript** with strict types — no `any`, no implicit `any`.
- **Use `async/await`** everywhere — no promise chains.
- **Run `npm install` and `npx playwright install`** after cloning before running tests.
- **Run `npx tsc --noEmit`** to type-check before submitting changes.
- **Run `npm run lint`** to check for lint errors before submitting changes.
- **Run tests** with `npx playwright test` to verify changes don't break existing coverage.

---

## What You Must Never Do

- ❌ Place raw `page.locator()` calls directly inside `test()` blocks
- ❌ Use `page.waitForTimeout()` (hard sleeps)
- ❌ Hardcode secrets, credentials, or API keys in any file
- ❌ Commit `.env` files — they are gitignored
- ❌ Skip failing tests without adding a `// TODO:` comment explaining why
- ❌ Write tests that depend on execution order or shared mutable state
- ❌ Use CSS selectors or XPath when a semantic selector (`getByRole`, `getByLabel`) is available
- ❌ Import `test` or `expect` inside page object files

---

## Repository Structure

```
pages/          ← Page Object Model classes (extend BasePage)
  BasePage.ts   ← Abstract base class — all POMs extend this
tests/
  smoke/        ← Fast @smoke tagged tests (~5 min)
  functional/   ← Feature-level @functional tests
  regression/   ← Full @regression suite
fixtures/       ← Typed test data (JSON or TypeScript exports)
utils/          ← Shared helpers, custom assertions, wait utilities
.github/
  copilot-instructions.md     ← Repo-wide Copilot context
  instructions/               ← Path-specific instructions
playwright.config.ts          ← Playwright configuration
tsconfig.json                 ← TypeScript configuration
package.json                  ← Dependencies and scripts
```

---

## Key Commands

```bash
npm install                          # Install all dependencies
npx playwright install               # Install Playwright browsers
npx playwright test                  # Run all tests
npx playwright test --ui             # Open Playwright UI mode
npx playwright test --headed         # Run with visible browser
npx playwright test --grep @smoke    # Run only smoke tests
npx playwright show-report           # Open last HTML report
npm run lint                         # Run ESLint
npx tsc --noEmit                     # Type-check
```

---

## Validation Before Submitting Changes

Before considering any task complete, always:

1. `npx tsc --noEmit` — must produce **zero errors**
2. `npm run lint` — must produce **zero errors** (warnings acceptable)
3. `npx playwright test` — all existing tests must **pass**

If tests fail due to a pre-existing issue unrelated to your changes, document it with a `test.fixme()` annotation and a `// TODO:` comment.

---

## Agent Behavior Notes

- When the user asks you to "add a test for [feature]", first check if a page object for that page already exists in `pages/`.
- When creating a new page object, look at existing page objects (especially `BasePage.ts`) to understand the patterns in use before generating code.
- When diagnosing a failing test, always read the Playwright error output carefully — most failures include the locator that failed and a screenshot path.
- Prefer modifying an existing page object over creating a new one if the functionality belongs on the same page.
- When uncertain about the application's UI structure, use Playwright's `--ui` mode or codegen (`npx playwright codegen https://zarkparking.com`) to inspect the page.
