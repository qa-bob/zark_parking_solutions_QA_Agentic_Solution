# GitHub Copilot — Repository-Wide Instructions

## Project Summary

This repository is a **QA Agentic Solution** that tests the [zarkparking.com](https://zarkparking.com) web application. It uses **Playwright** with **TypeScript**, a **Page Object Model (POM)** design pattern, and **OOP** principles throughout.

---

## Tech Stack

| Tool | Version / Notes |
|------|----------------|
| **Playwright** | Latest stable (`@playwright/test`) |
| **TypeScript** | Strict mode enabled |
| **Node.js** | LTS (18+) |
| **Test Runner** | Playwright built-in test runner |
| **Linter** | ESLint + TypeScript rules |
| **Package Manager** | npm |

---

## Architecture & Project Layout

```
.
├── .github/
│   ├── copilot-instructions.md   # This file — repo-wide Copilot instructions
│   ├── instructions/             # Path-specific Copilot instructions
│   │   ├── playwright.instructions.md
│   │   └── pom.instructions.md
│   ├── workflows/                # GitHub Actions CI pipelines
│   └── README.md                 # .github folder documentation
├── pages/                        # Page Object Model classes (one file per page)
│   └── BasePage.ts               # Abstract base page all POMs extend
├── tests/
│   ├── smoke/                    # Quick sanity checks
│   ├── functional/               # Feature-level test suites
│   └── regression/               # Full regression suite
├── fixtures/                     # Test data (JSON, CSV, or TypeScript exports)
├── utils/                        # Shared helpers, custom assertions, wait utilities
├── AGENTS.md                     # Copilot agent profile and instructions
├── Skills.md                     # Skills catalog for Copilot in this repo
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
└── README.md
```

---

## Coding Standards

### General
- **Always** use TypeScript strict mode. Never use `any` unless unavoidable.
- Follow OOP principles: encapsulation, inheritance, and single-responsibility.
- Keep files focused — one page class per file, one test suite per file.

### Page Object Model
- Every page/component has a corresponding class in `pages/`.
- All page classes **must** extend `BasePage`.
- Page classes encapsulate **locators** as private/protected getters.
- Page classes expose **action methods** (e.g., `clickLoginButton()`) and **assertion helpers** (e.g., `expectLoginFormVisible()`).
- Locators should use `data-testid` attributes where available; fall back to semantic selectors (`role`, `label`).
- **Never** place raw `page.locator()` calls inside test files — always delegate to the page class.

### Tests
- Tests live in `tests/` subdirectories (`smoke`, `functional`, `regression`).
- Each test file should describe a single user flow or feature.
- Use `test.describe()` blocks to group related tests.
- Tests should be independent and idempotent (no shared mutable state between tests).
- Use Playwright fixtures for shared setup/teardown.
- Prefer `expect` soft assertions for non-critical checks.

---

## Build & Validation Commands

```bash
# Install dependencies (always run after cloning or pulling)
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run tests with UI mode
npx playwright test --ui

# Run a specific test file
npx playwright test tests/smoke/homepage.spec.ts

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Generate HTML report
npx playwright show-report

# Lint the codebase
npm run lint

# Type-check without emitting
npx tsc --noEmit
```

---

## CI/CD

- All pull requests trigger the Playwright test suite via `.github/workflows/playwright.yml`.
- Tests must pass before a PR can be merged.
- The `main` branch is protected — direct pushes are not allowed.

---

## Key Conventions for Copilot

1. When generating new page objects, always extend `BasePage` and follow the existing class structure.
2. When generating tests, import page objects from `pages/` — never inline selectors in test files.
3. Use `async/await` throughout — no `.then()` chains.
4. Prefer descriptive test names: `test('user can log in with valid credentials', ...)`.
5. All new tests must include at least one `expect` assertion.
6. When creating fixtures or test data, place them in `fixtures/`.
7. If a helper utility is used in more than one test file, extract it to `utils/`.
