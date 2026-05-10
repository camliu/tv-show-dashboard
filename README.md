# TV Show Dashboard

A Nuxt 4 app for browsing and searching TV shows, powered by the [TVmaze API](https://www.tvmaze.com/api).

**Live:** https://brave-flower-010ffe710.7.azurestaticapps.net/

## Tech stack

- **Nuxt 4** — framework
- **PrimeVue 4** — UI component library
- **Tailwind CSS 4** — styling
- **Nuxt Icon + Lucide** — icons
- **Nuxt A11y** — accessibility hints and auditing
- **Pinia** — state management
- **VueUse** — composable utilities
- **MSW** — API mocking for development and tests
- **Vitest** — unit and component tests
- **Playwright** — e2e tests
- **Husky + lint-staged** — pre-commit hooks
- **GitHub Actions** — CI/CD
- **Azure Static Web Apps** — hosting and deployment pipeline (preview + production)

## Requirements

- Node.js 22
- pnpm 10

## Getting started

```bash
pnpm install
pnpm dev
```

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

## Testing

| Layer       | Tool             | What it covers                                                      |
| ----------- | ---------------- | ------------------------------------------------------------------- |
| Unit        | Vitest           | Utilities and composables                                           |
| Integration | Vitest + MSW     | Nuxt server routes with mocked TVmaze API                           |
| E2e         | Playwright + MSW | Full browser flow against a real Nuxt server with mocked TVmaze API |

E2e tests use `.env.test` automatically, no extra setup needed:

```bash
pnpm test:e2e
```

## CI/CD

### What runs when

| Job    | Pre-commit | Push to any branch | PR opened / updated | Merge to `main` | PR closed |
| ------ | :--------: | :----------------: | :-----------------: | :-------------: | :-------: |
| Lint   |     ✓      |         ✓          |          ✓          |        ✓        |           |
| Test   |            |         ✓          |          ✓          |        ✓        |           |
| E2E    |            |                    |          ✓          |                 |           |
| Deploy |            |                    |  Preview (Azure SWA)|   Production    |  Teardown |

### Workflow structure

All workflows live in `.github/workflows/`. Each job is a reusable workflow called from the single orchestrator:

```
ci.yml (orchestrator)
├── lint.yml       — pnpm lint
├── test.yml       — pnpm test run
├── e2e.yml        — pnpm test:e2e  (PRs only)
└── deploy.yml     — Azure Static Web Apps deploy (main push + PRs only)
```

Deploy only runs after lint and test pass. E2E being skipped (on non-PR events) does not block deploy.
