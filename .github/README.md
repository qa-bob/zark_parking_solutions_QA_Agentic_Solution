# .github Folder — Structure & Purpose

This directory contains configuration files for **GitHub Copilot**, **GitHub Actions**, and repository-level governance. This document explains what belongs here and why.

---

## 📁 Folder Structure

```
.github/
├── copilot-instructions.md     # Repository-wide Copilot custom instructions
├── instructions/               # Path-specific Copilot instructions
│   ├── playwright.instructions.md   # Instructions applied to tests/**
│   └── pom.instructions.md          # Instructions applied to pages/**
├── workflows/                  # GitHub Actions CI/CD pipelines
│   └── playwright.yml          # Runs Playwright tests on PRs
└── README.md                   # This file
```

---

## 🤖 Agents

**What:** Agent instructions tell GitHub Copilot (and other AI agents) how to behave when working in this repository. They provide context about the codebase, conventions, and constraints.

**Files:**
| File | Location | Purpose |
|------|----------|---------|
| `AGENTS.md` | Repo root | Primary agent instructions — Copilot reads this as its main behavioral guide for this repo |
| `.github/copilot-instructions.md` | `.github/` | Repository-wide instructions automatically injected into every Copilot prompt |
| `.github/instructions/*.instructions.md` | `.github/instructions/` | Path-scoped instructions applied only when Copilot is working on files matching the `applyTo` glob |

**Best practices:**
- Keep `AGENTS.md` high-level and strategic (what the project is, what Copilot should and shouldn't do).
- Use `.github/copilot-instructions.md` for project-wide technical context (tech stack, commands, conventions).
- Use `*.instructions.md` files in `.github/instructions/` for file-type or directory-specific rules.
- Agent instructions should be **no longer than 2 pages** per file — longer files reduce effectiveness.

---

## 🛠️ Skills

**What:** Skills are reusable capabilities or behaviors you want Copilot to apply. In the Copilot CLI, skills are managed via `/skills`. In this repository, skills are documented in `Skills.md` at the root and can be referenced from agent instructions.

**Files:**
| File | Location | Purpose |
|------|----------|---------|
| `Skills.md` | Repo root | Documents available skills, their purpose, and usage examples |

**Types of skills in this project:**
- **Test generation skill** — Generates Playwright test files following the POM pattern
- **POM scaffold skill** — Scaffolds new page objects extending `BasePage`
- **Assertion suggestion skill** — Suggests appropriate Playwright assertions for a given UI state
- **Fixture generation skill** — Creates typed test data fixtures

**To add a skill:** Document it in `Skills.md` and reference it in the relevant `.instructions.md` file.

---

## 🪝 Hooks

**What:** Hooks automate quality checks at key trigger points. In this repo, hooks operate at two levels:

### Git Hooks (Local)
Git hooks run locally before or after Git operations. Recommended hooks for this project:

| Hook | Trigger | Purpose |
|------|---------|---------|
| `pre-commit` | Before every commit | Run `npm run lint` and `npx tsc --noEmit` |
| `pre-push` | Before pushing to remote | Run smoke tests (`npx playwright test --grep @smoke`) |

Install with [Husky](https://typicode.github.io/husky/):
```bash
npm install --save-dev husky
npx husky init
```

### GitHub Actions Hooks (CI/CD)
Defined in `.github/workflows/`. These run automatically on GitHub events:

| Workflow File | Trigger | Purpose |
|---------------|---------|---------|
| `playwright.yml` | PR opened / pushed | Run full Playwright test suite |
| `lint.yml` | PR opened / pushed | ESLint + TypeScript check |

---

## 📏 Rules

**What:** Rules define the standards that all code in this repository must meet. They are enforced by linters, CI pipelines, and Copilot custom instructions.

### Code Rules
| Rule Category | Tool | Config File |
|--------------|------|-------------|
| TypeScript strict mode | `tsc` | `tsconfig.json` |
| Code style & quality | ESLint | `.eslintrc.json` |
| Import order | ESLint plugin | `.eslintrc.json` |
| Formatting | Prettier (optional) | `.prettierrc` |

### Copilot Rules (Custom Instructions)
Rules enforced via Copilot instructions files:
- All tests must use Page Objects — no raw selectors in test files
- All page objects must extend `BasePage`
- No `waitForTimeout()` (hard waits) in tests
- Test IDs must use semantic selectors first (`getByRole`, `getByLabel`)
- Tests must be independent and parallelism-safe

### Branch & PR Rules
- Branch naming: `feature/`, `fix/`, `chore/`, `test/` prefixes
- PR must have a descriptive title following [Conventional Commits](https://www.conventionalcommits.org/)
- At least one reviewer approval required before merge
- All CI checks must pass before merging to `main`

---

## 📄 Docs

**What:** Documentation files that live in `.github/` provide context for contributors, CI tools, and AI agents.

| File | Purpose |
|------|---------|
| `copilot-instructions.md` | Machine-readable context for Copilot — explains the project, structure, and build commands |
| `instructions/*.instructions.md` | Targeted instructions for specific file types or directories |
| `README.md` (this file) | Human-readable guide to this folder |

**Documentation standards:**
- All new pages added to the `pages/` directory must be noted in the main `README.md`
- All new utility helpers in `utils/` should have JSDoc comments
- Update `copilot-instructions.md` if the project structure, tech stack, or key conventions change
- Use [TSDoc](https://tsdoc.org/) format for TypeScript comments

---

## 🔄 Keeping Instructions Fresh

Custom instructions lose effectiveness when they become stale. When you:
- Change the project structure → update `copilot-instructions.md`
- Add new testing patterns → update the relevant `.instructions.md` file
- Add a new skill → add it to `Skills.md`
- Add a new CI hook → document it in the Hooks section above and in the workflow file

> **Tip:** Periodically run `/instructions` in Copilot CLI to review which instruction files are active.
