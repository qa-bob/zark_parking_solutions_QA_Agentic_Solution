# Skills.md — Copilot Skills Catalog

This file documents the **skills** available to GitHub Copilot in this repository — reusable capabilities that Copilot can apply when working on specific tasks. Reference this file when configuring Copilot instructions or onboarding new contributors.

> **Using skills in Copilot CLI:** Run `/skills` in a Copilot CLI session to browse and activate available skills.

---

## What Is a Skill?

In the context of GitHub Copilot CLI, a skill is a focused, reusable capability that Copilot applies to a specific type of task. Skills can be:
- **Built-in** — provided by Copilot out of the box (e.g., code explanation, PR summarization)
- **Custom** — defined by this repository via agent instructions and custom instruction files

---

## Built-In Copilot Skills (Active in this Repo)

| Skill | Trigger | Description |
|-------|---------|-------------|
| **Code Explanation** | "Explain this code" | Explains what a test or page object does in plain English |
| **Bug Fix** | "Fix the failing test" | Diagnoses and repairs broken tests using Playwright error output |
| **Code Review** | `/review` | Reviews staged changes; surfaces real bugs, not style issues |
| **Research** | `/research` | Searches codebase, GitHub, and web for context on a problem |
| **Explore** | Delegated automatically | Answers questions about the codebase without modifying files |
| **Plan Mode** | `Shift+Tab` | Builds an implementation plan before writing code |

---

## Custom Skills — Defined for This Repository

The following skills are defined through Copilot instruction files in this repo. They activate automatically based on which files Copilot is working with.

---

### 🧪 Skill: Test Generator

**Activates when:** Working on files in `tests/`

**Instruction file:** `.github/instructions/playwright.instructions.md`

**What it does:** Generates Playwright test files following the project's conventions:
- Uses `test.describe()` with `beforeEach` setup
- Imports page objects from `pages/`
- Follows Arrange → Act → Assert pattern
- Tags tests with `@smoke`, `@functional`, or `@regression`
- Never uses hard sleeps or raw selectors

**Example prompt:**
```
Generate a smoke test for the hud.io homepage that verifies the navigation bar and hero section are visible.
```

---

### 🏗️ Skill: POM Scaffolder

**Activates when:** Working on files in `pages/`

**Instruction file:** `.github/instructions/pom.instructions.md`

**What it does:** Scaffolds new Page Object Model classes following the project's OOP conventions:
- Extends `BasePage` with correct `super()` call
- Declares locators as private getters
- Exposes public action methods (verb-first naming)
- Exposes public assertion helpers (`expect`-prefixed naming)
- Uses semantic selectors (`getByRole`, `getByLabel`, `getByTestId`)

**Example prompt:**
```
Create a page object for the hud.io login page at /login. It should have methods to fill in email and password, click the sign-in button, and assert that the dashboard heading is visible after login.
```

---

### 🔍 Skill: Selector Advisor

**Activates when:** Copilot is writing or reviewing locators

**What it does:** Recommends the most resilient Playwright selector strategy for a given UI element, following this priority order:
1. `getByTestId()` — preferred when `data-testid` is present
2. `getByRole()` — semantic ARIA (most resilient to DOM changes)
3. `getByLabel()` — form elements via visible label
4. `getByText()` — visible text
5. `getByPlaceholder()` — placeholder text
6. CSS / XPath — last resort only

**Example prompt:**
```
What is the best Playwright selector for the "Sign In" submit button on the login form?
```

---

### 📦 Skill: Fixture Builder

**Activates when:** Working on files in `fixtures/`

**What it does:** Creates typed TypeScript test data fixtures. All fixtures are:
- Exported as typed constants or factory functions
- Located in `fixtures/` with a descriptive file name
- Free of hardcoded secrets (use environment variable references)

**Example prompt:**
```
Create a test data fixture for a valid hud.io user login with email and password read from environment variables.
```

---

### 🛠️ Skill: BasePage Extender

**Activates when:** Creating a new file in `pages/`

**What it does:** Generates the `BasePage` abstract class if it doesn't exist, or helps a new page class correctly integrate with it. `BasePage` provides:
- `protected page: Page` — the Playwright page instance
- `async navigate(): Promise<void>` — navigates to the page's URL
- Shared utility methods (e.g., `waitForNetworkIdle()`, `getTitle()`)

---

### ✅ Skill: Assertion Suggester

**What it does:** Given a UI scenario description, suggests the most appropriate Playwright assertions:

| Scenario | Suggested Assertion |
|----------|-------------------|
| Element is visible | `await expect(locator).toBeVisible()` |
| Element has text | `await expect(locator).toHaveText('...')` |
| URL matches | `await expect(page).toHaveURL('/path')` |
| Input has value | `await expect(locator).toHaveValue('...')` |
| Element is enabled | `await expect(locator).toBeEnabled()` |
| Element count | `await expect(locator).toHaveCount(n)` |
| Attribute check | `await expect(locator).toHaveAttribute('attr', 'value')` |

---

## How to Add a New Skill

1. Identify the scope: Is it a repo-wide skill or path-specific?
2. If path-specific, create or update a file in `.github/instructions/` with the appropriate `applyTo` frontmatter.
3. If repo-wide, add instructions to `.github/copilot-instructions.md` or `AGENTS.md`.
4. Document the new skill in this file under **Custom Skills**.
5. Test it by prompting Copilot to perform the relevant task in a session.

---

## Skill Maintenance

| Responsibility | When |
|---------------|------|
| Update **Test Generator** skill | When test conventions change |
| Update **POM Scaffolder** skill | When `BasePage` API changes |
| Update **Assertion Suggester** | When new Playwright matchers are adopted |
| Review all skills | When upgrading Playwright major versions |
