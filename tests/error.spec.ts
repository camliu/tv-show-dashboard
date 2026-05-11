import { expect, test } from '@nuxt/test-utils/playwright';

test('error: shows "Show not found" when navigating to an unknown show', async ({ page, goto }) => {
  await goto('/shows/99999', { waitUntil: 'hydration' });

  await expect(page.getByRole('heading', { name: 'Show not found' })).toBeVisible();
});

test('error: shows "Page not found" when navigating to an unknown route', async ({ page, goto }) => {
  await goto('/non-existent-page', { waitUntil: 'hydration' });

  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
});
