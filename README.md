# TV Show Dashboard

Browse and search TV shows, organized by genre and sorted by rating — powered by the [TVmaze API](https://www.tvmaze.com/api).

**Production:** [https://brave-flower-010ffe710.7.azurestaticapps.net/](https://brave-flower-010ffe710.7.azurestaticapps.net/)

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Testing](#testing)
- [CI/CD](#cicd)

---

## Features

- **Show list grouped by genre** — browse all shows organized into genre carousels with horizontal scrolling, sorted by rating
- **Show detail page** — view extensive information for each show
- **Search by name** — search for any TV show by name with input search in the header
- **Responsive design** — fully optimized for mobile and desktop

---

## Tech stack

#### TypeScript | Language

- End-to-end type safety across the app, server routes, and shared utilities
- Interfaces shared between client and server via the `shared/` directory

#### Nuxt 4 | Framework

- SSR support, SEO-friendly rendering
- Rich native tooling and module ecosystem (ESLint, test utils, a11y)
- Opinionated structure with auto-imports reduces boilerplate

#### Tailwind CSS | Styling

- Styles stay co-located with the template, no context switching between files
- Responsive design is straightforward with utility classes

#### PrimeVue | UI component library

- Reliable, highly customizable components while keeping full control over layout and behavior

#### Nuxt Icon + Lucide | Icons

- Lightweight icon set with a consistent design language

#### Nuxt A11y | Accessibility

- Accessibility hints and auditing during development

#### Pinia | State management

- Manages search state (query + suggestions) across components
- Integrates naturally with the Composition API

#### VueUse | Composable utilities

- Powerful utility library with broad coverage of common browser and Vue patterns
- Reduces boilerplate across the codebase

#### MSW | API mocking

- Intercepts requests at the network level, keeping tests realistic without hitting real APIs
- Predictable mock data ensures stable, deterministic e2e test results

#### Vitest | Unit and integration tests

- Vite-native testing, integrates nicely with Nuxt 4's project structure
- Fast test execution with minimal configuration

#### Playwright | E2E tests

- Tests the full user flow against a real Nuxt server with MSW-mocked responses

#### Husky + lint-staged | Pre-commit hooks

- Runs lint on staged files before commit to catch issues early

#### GitHub Actions | CI/CD

- Orchestrates lint, test, e2e, and deploy jobs on every push and PR

#### Azure Static Web Apps | Hosting

- Provides production deployment with built-in GitHub Actions integration

---

## Project structure

```
app/
├── components/        # UI components (layout, show cards, search)
├── composables/       # Data fetching and UI logic
├── pages/             # File-based routes
├── stores/            # Pinia stores
└── layouts/           # App shell

server/
└── api/shows/         # Server routes proxying the TVmaze API

shared/
├── types/             # Shared TypeScript interfaces
└── utils/             # Data mapping and transformation

mocks/
├── handlers/          # MSW request handlers
└── data/              # Mock show data for tests

configs/               # Third-party configuration (PrimeVue theme)
test/                  # Unit and integration tests (Vitest)
tests/                 # E2E tests (Playwright)
```

---

## Requirements

- Node.js 22 (LTS) — matches the version pinned in CI and the Azure Static Web Apps runtime
- pnpm 10 — used instead of npm for faster installs and reduced disk space via a shared global store

---

## Getting started

```bash
pnpm install
pnpm dev
```

No environment variables are required. The app connects to the TVmaze public API directly.

---

## Scripts


| Command              | Description                     |
| -------------------- | ------------------------------- |
| `pnpm dev`           | Start development server        |
| `pnpm build`         | Build for production            |
| `pnpm preview`       | Preview production build        |
| `pnpm lint`          | Lint                            |
| `pnpm lint:fix`      | Lint and auto-fix               |
| `pnpm test`          | Run unit and component tests    |
| `pnpm test:coverage` | Run tests with coverage report  |
| `pnpm test:e2e`      | Run Playwright e2e tests        |
| `pnpm test:e2e:ui`   | Run Playwright tests in UI mode |


---

## Testing


| Layer       | Tool             | What it covers                                                      |
| ----------- | ---------------- | ------------------------------------------------------------------- |
| Unit        | Vitest           | Utilities and composables                                           |
| Integration | Vitest + MSW     | Nuxt server routes with mocked TVmaze API                           |
| E2E         | Playwright + MSW | Full browser flow against a real Nuxt server with mocked TVmaze API |


E2E tests use `.env.test` automatically, no extra setup needed:

```bash
pnpm test:e2e
```

---

## CI/CD

GitHub Actions runs lint, test, and e2e on every PR, and deploys to Azure Static Web Apps — preview per PR, production on merge to `main`.

```
ci.yml (orchestrator)
├── lint.yml       — pnpm lint
├── test.yml       — pnpm test run
├── e2e.yml        — pnpm test:e2e  (PRs only)
└── deploy.yml     — Azure Static Web Apps deploy
```

