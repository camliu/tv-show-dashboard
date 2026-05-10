import { expect, test } from '@nuxt/test-utils/playwright';

test('search: type query, select suggestion, navigate to show detail page', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' });

  const searchInput = page.getByLabel('Search shows');
  await searchInput.click();
  await searchInput.pressSequentially('Under', { delay: 50 });

  const suggestion = page.getByRole('option', { name: /Under the Dome/ });
  await expect(suggestion).toBeVisible();
  await suggestion.click();

  await expect(page).toHaveURL('/shows/1');
});
