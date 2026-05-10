import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@nuxt/test-utils/playwright';

test.describe('accessibility', () => {
  test('home page has no axe violations', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' });

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });

  test('show detail page has no axe violations', async ({ page, goto }) => {
    await goto('/shows/1', { waitUntil: 'hydration' });

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
});
