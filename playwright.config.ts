import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';
import type { NuxtConfig } from 'nuxt/schema';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig<ConfigOptions>({
  testDir: './tests',
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
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
