import { expect, test } from '@playwright/test';

test('smoke: home page loads with search and content', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByLabel('Search shows')).toBeVisible();
  await expect(page.getByRole('link').first()).toBeVisible();
});

test('smoke: show detail page loads', async ({ page }) => {
  await page.goto('/shows/1');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('smoke: 404 page works', async ({ page }) => {
  await page.goto('/non-existent-page');

  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
});
