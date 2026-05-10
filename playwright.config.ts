import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';
import type { NuxtConfig } from 'nuxt/schema';

export default defineConfig<ConfigOptions>({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60_000,
  use: {
    trace: 'on-first-retry',
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
      nuxtConfig: { nitro: { preset: 'node-server' } } as NuxtConfig,
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
