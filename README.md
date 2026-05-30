# TV Show Dashboard

Browse and search TV shows

**Live demo:** [brave-flower-010ffe710.7.azurestaticapps.net](https://brave-flower-010ffe710.7.azurestaticapps.net/)

---

## Features

- Genre carousels with horizontal scrolling, sorted by rating
- Show detail page with cast, seasons, and metadata
- Live search by show name
- Responsive layout for mobile and desktop
- Accessible — automated a11y checks on every CI run

---

## Stack

| Layer     | Tech                                   |
| --------- | -------------------------------------- |
| Framework | Nuxt 4 (SSR)                           |
| Language  | TypeScript                             |
| Styling   | Tailwind CSS + PrimeVue                |
| State     | Pinia                                  |
| Icons     | Nuxt Icon + Lucide                     |
| Testing   | Vitest · Playwright · MSW · axe-core   |
| CI/CD     | GitHub Actions + Azure Static Web Apps |

---

## Getting started

```bash
pnpm install
pnpm dev
```

No environment variables required — the app proxies the public [TVmaze API](https://www.tvmaze.com/api) through server routes.

---

## Scripts

```
pnpm dev            Start development server
pnpm build          Build for production
pnpm preview        Preview production build
pnpm lint           Lint
pnpm typecheck      Type check
pnpm test           Unit and component tests (Vitest)
pnpm test:e2e       E2E tests (Playwright + MSW)
pnpm test:e2e:ui    Playwright UI mode
pnpm test:smoke     Smoke tests against production
```

---

## Project structure

```
app/
├── components/        # UI components (layout, show cards, search)
├── composables/       # Data fetching and UI logic
├── pages/             # File-based routes
├── stores/            # Pinia stores
├── layouts/           # App shell
└── error.vue          # Global error page

server/
└── api/shows/         # Server routes proxying TVmaze

shared/
├── types/             # Shared TypeScript interfaces
└── utils/             # Data mapping and transformation

mocks/
├── handlers/          # MSW request handlers
└── data/              # Mock show data

test/
├── unit/              # Vitest unit tests
└── e2e/               # Playwright tests
    └── smoke/         # Smoke tests against production
```

---

## CI/CD

Three pipeline stages — fast feedback on every push, full validation on PRs, production deploy on merge.

```
push (non-main)       lint · typecheck · test (parallel)

pull request → main   e2e → Azure preview deploy
                      Azure preview teardown on PR close

push to main          Azure production deploy → smoke tests
```
