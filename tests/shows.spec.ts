import { expect, test } from '@nuxt/test-utils/playwright';

test('shows page renders mocked shows', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' });

  await expect(page.getByText('Under the Dome')).toBeVisible();
  await expect(page.getByText('Sparse Show')).toBeVisible();
});
