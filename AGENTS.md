---
name: ai-agents
description: main file for the agent
user-invocable: false  #- for Claude Code, reads this file without asking
---

# AIAgentFirstStructure

## Knowledge sources

Read this BEFORE creating/executing scenarios based on current task needs:
1. `.claude\skills\domain\SKILL.md` - business logic and validation rules;
2. `.claude\skills\senior-qa-engineer\SKILL.md` - role and test approach.
3. `.claude\skills\test-cases\test-cases.md` - manual test cases storage;
4. `.claude\skills\playwright-best-practices\SKILL.md` - Playwright automation standards, architecture patterns and test reliability guideline

## Architecture

Two-layer Page Object Model:
- `pageObjects/selectors/` — CSS selectors only (no logic)
- `pageObjects/steps/` — action classes that use selectors

## Running tests

```bash
npm test                       # all tests
npx playwright test tests/yew.spec.js   # single file
npx playwright test tests/yew.spec.js --headed  # single file in headed mode
```

No local server required — tests hit [rahulshettyacademy.com](https://rahulshettyacademy.com) (public demo app).

## Important notes

- **CommonJS** (`require`/`module.exports`), not ESM.
- **Default browser** is Chromium (per Playwright default).
- **Reporters**: allure
- **On failure**: trace (first retry), screenshot, video.

## Local-only config

`./.github/agents/UI Agent.agent.md` defines an OpenCode UI automation agent for this repo. It is gitignored (`/.github` in `.gitignore`), so it will not be committed and work only locally.

No CI configured yet.

## Reporting tool

Always use allure after every test run.
If Allure is not installed for this project - download and install it.