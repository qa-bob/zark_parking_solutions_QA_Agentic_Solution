# hud.io — QA Agentic Solution

> End-to-end test automation for [hud.io](https://hud.io) — built with **Playwright**, **TypeScript**, and a **Page Object Model (POM)** design pattern. Powered by **GitHub Copilot** for AI-assisted test generation and maintenance.

---

## 📋 Table of Contents

- [Purpose](#-purpose)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [Contributor Rules](#-contributor-rules)
- [GitHub Copilot Setup](#-github-copilot-setup)
- [Key Files Reference](#-key-files-reference)

---

## 🎯 Purpose

This repository provides automated end-to-end QA coverage for the **hud.io** web application. It is built as a GitHub Copilot **agentic solution**, meaning:

- GitHub Copilot can autonomously generate, maintain, and extend tests using custom instructions
- All tests follow a **Page Object Model (POM)** design pattern for maintainability and reusability
- **OOP principles** (encapsulation, inheritance, single-responsibility) guide all implementation choices
- The framework is designed for parallelism, CI integration, and long-term scalability

### Planned Test Coverage

- [ ] Smoke tests — critical path verification
- [ ] Functional tests — feature-level user flows
- [ ] Regression suite — full coverage on every release
- [ ] Accessibility checks — WCAG compliance
- [ ] Performance baselines — Core Web Vitals tracking

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & test runner |
| TypeScript (strict) | Strongly typed test code |
| GitHub Actions | CI/CD pipeline |
| GitHub Copilot | AI-assisted test generation |
| ESLint | Code quality enforcement |
| Husky (recommended) | Git hooks for pre-commit checks |

---

## 📁 Project Structure

```
.
├── .github/
│   ├── copilot-instructions.md     # Repo-wide Copilot custom instructions
│   ├── instructions/               # Path-specific Copilot instructions
│   │   ├── playwright.instructions.md
│   │   └── pom.instructions.md
│   ├── workflows/                  # GitHub Actions pipelines
│   └── README.md                   # .github folder guide (agents, skills, hooks, rules, docs)
├── pages/                          # Page Object Model classes
│   └── BasePage.ts                 # Abstract base — all page objects extend this
├── tests/
│   ├── smoke/                      # @smoke — fast critical-path tests
│   ├── functional/                 # @functional — feature-level tests
│   └── regression/                 # @regression — full suite
├── fixtures/                       # Typed test data
├── utils/                          # Shared helpers and custom assertions
├── AGENTS.md                       # Copilot agent behavioral instructions
├── Skills.md                       # Copilot skills catalog
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── .env.example                    # Environment variable template
├── package.json
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)
- A GitHub account with GitHub Copilot access (for AI-assisted workflows)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/qa-bob/zark_parking_solutions_QA_Agentic_Solution.git
cd zark_parking_solutions_QA_Agentic_Solution

# 2. Install Node dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Copy the environment variable template
cp .env.example .env
# Edit .env and fill in any required values (credentials, base URLs, etc.)
```

### Optional: Set Up Git Hooks (Recommended)

```bash
# Install Husky for pre-commit linting and type-checking
npm install --save-dev husky
npx husky init
```

---

## ▶️ Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run with Playwright UI mode (interactive)
npx playwright test --ui

# Run with a visible browser
npx playwright test --headed

# Run only smoke tests
npx playwright test --grep @smoke

# Run only functional tests
npx playwright test --grep @functional

# Run a specific test file
npx playwright test tests/smoke/homepage.spec.ts

# Open the last HTML test report
npx playwright show-report

# Generate tests interactively (Playwright codegen)
npx playwright codegen https://hud.io
```

---

## 📐 Contributor Rules

All contributors — human and AI — must follow these rules.

### Branch Naming

Use one of these prefixes:

| Prefix | Use for |
|--------|---------|
| `feature/` | New test coverage or new features |
| `fix/` | Fixing broken tests or bugs |
| `chore/` | Tooling, dependencies, config changes |
| `test/` | Test refactors or adding test utilities |

Example: `feature/login-page-pom`, `fix/checkout-smoke-test`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(login): add POM class for hud.io login page
fix(smoke): correct selector for nav bar link
chore(deps): update playwright to v1.44
test(regression): add regression suite for dashboard
```

### Pull Request Rules

1. Branch from `main`; target `main` for your PR
2. Fill in the PR description — what changed and why
3. All CI checks must pass (Playwright tests + lint + type-check)
4. At least one reviewer approval required before merging
5. No direct pushes to `main`

### Code Standards

| Rule | Standard |
|------|---------|
| Language | TypeScript strict mode — no `any` |
| Test structure | All tests use Page Object Models |
| Async style | `async/await` only — no `.then()` chains |
| Selectors | Semantic-first: `getByRole` > `getByLabel` > CSS |
| Waits | No `waitForTimeout()` — use Playwright's auto-waiting |
| Test isolation | Every test must be independent and idempotent |
| Secrets | Never commit credentials — use `.env` + environment variables |

### Before Submitting a PR

Run all three of these — they must all pass:

```bash
npx tsc --noEmit    # Zero type errors
npm run lint        # Zero lint errors
npx playwright test # All tests pass
```

---

## 🤖 GitHub Copilot Setup

This repository is fully configured for **GitHub Copilot CLI** and **Copilot cloud agent**.

### Copilot Reads These Files Automatically

| File | What it does |
|------|-------------|
| `AGENTS.md` | Primary behavioral guide for Copilot agents |
| `.github/copilot-instructions.md` | Repo-wide context injected into every prompt |
| `.github/instructions/playwright.instructions.md` | Applied when Copilot works on `tests/` files |
| `.github/instructions/pom.instructions.md` | Applied when Copilot works on `pages/` files |

### Starting a Copilot CLI Session

```bash
# Install Copilot CLI if you haven't already
# https://docs.github.com/copilot/how-tos/set-up/install-copilot-cli

# Start a session in this repo
cd zark_parking_solutions_QA_Agentic_Solution
copilot

# Example prompts to try:
# "Add a smoke test for the hud.io homepage"
# "Create a page object for the login page at /login"
# "Why is this test failing?" (paste error output)
# "Review my changes before I submit a PR"
```

### Key Reference Docs in This Repo

| File | Purpose |
|------|---------|
| [`AGENTS.md`](./AGENTS.md) | Agent instructions — what Copilot should and shouldn't do |
| [`Skills.md`](./Skills.md) | Skills catalog — capabilities available to Copilot in this repo |
| [`.github/README.md`](./.github/README.md) | Guide to agents, skills, hooks, rules, and docs in `.github/` |

---

## 🔑 Key Files Reference

| File | Description |
|------|-------------|
| `playwright.config.ts` | Test timeouts, browsers, base URL, reporters |
| `tsconfig.json` | TypeScript compilation settings (strict mode) |
| `.env.example` | Template for required environment variables |
| `pages/BasePage.ts` | Abstract base class all page objects must extend |
| `.github/copilot-instructions.md` | Copilot's primary project context |

---

*Part of the Phoenix Startup QA Agentic Solutions project. Target application: [hud.io](https://hud.io)*
