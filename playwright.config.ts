import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import { config as loadEnv } from 'dotenv';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';
import type { NuxtConfig } from 'nuxt/schema';

loadEnv({
  path: '.env.smoke',
  quiet: true,
});

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig<ConfigOptions>({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 120_000,
  use: {
    trace: 'on-first-retry',
    nuxt: {
      rootDir,
      nuxtConfig: {
        nitro: {
          preset: 'node-server',
          ...(process.env.CI && { output: { dir: resolve(rootDir, '.output') } }),
        },
      } as NuxtConfig,
      build: !process.env.CI,
    },
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: '**/smoke/**',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke',
      testDir: './test/e2e/smoke',
      timeout: 60_000,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.SMOKE_BASE_URL,
      },
    },
  ],
});
