# TV Show Dashboard

A Nuxt 4 app for browsing and searching TV shows, powered by the [TVmaze API](https://www.tvmaze.com/api).

**Live:** https://brave-flower-010ffe710.7.azurestaticapps.net/

## Tech stack

- **Nuxt 4** — framework
- **PrimeVue 4** — UI component library
- **Tailwind CSS 4** — styling
- **Pinia** — state management
- **MSW** — API mocking for development and tests
- **Vitest** — unit and component tests
- **Playwright** — e2e tests
- **Azure Static Web Apps** — hosting and deployment pipeline (preview + production)
- **GitHub Actions** — CI/CD

## Getting started

**Requirements:** Node.js 22, pnpm 10

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

| Layer | Tool | What it covers |
|---|---|---|
| Unit | Vitest | Utilities and composables |
| Integration | Vitest + MSW | Nuxt server routes with mocked TVmaze API |
| E2e | Playwright + MSW | Full browser flow against a real Nuxt server with mocked TVmaze API |

E2e tests use `.env.test` automatically, no extra setup needed:

```bash
pnpm test:e2e
```

## CI/CD

| Step | Trigger | Tool | What runs |
|---|---|---|---|
| Pre-commit | `git commit` | Husky + lint-staged | ESLint auto-fix + lint on staged files |
| Push | Push to any branch | GitHub Actions | Lint, unit tests, integration tests |
| Pull request | PR opened / updated | GitHub Actions | Unit tests, integration tests, e2e tests, preview deploy to Azure |
| Merge to main | Push to `main` | GitHub Actions | Production deploy to Azure |
| PR closed | PR closed | GitHub Actions | Preview environment torn down |
