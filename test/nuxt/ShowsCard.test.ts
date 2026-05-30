import { describe, expect, it } from 'vitest';
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime';
import ShowsCard from '../../app/components/shows/Card.vue';
import { mockShowFull } from '../../mocks/data/shows';

mockComponent('NuxtImg', {
  props: ['src', 'alt'],
  emits: ['load'],
  template: '<img :src="src" :alt="alt" @load="$emit(\'load\')" />',
});
mockComponent('ShowsBookmark', { template: '<div />' });
mockComponent('ShowsCardSkeleton', { template: '<div data-testid="skeleton" />' });
mockComponent('BaseImageFallback', { template: '<div data-testid="image-fallback" />' });

const showNoImage: Show = {
  ...mockShowFull,
  id: 2,
  image: undefined,
  imageOriginal: undefined,
  rating: null,
};

function mountCard(props: {
  show: Show
  headingLevel?: 'h2' | 'h3'
}) {
  return mountSuspended(ShowsCard, { props });
}

describe('ShowsCard', () => {
  it('links to the show detail page', async () => {
    const wrapper = await mountCard({ show: mockShowFull });

    expect(wrapper.find('a').attributes('href')).toBe('/shows/1');
  });

  it('renders the show name', async () => {
    const wrapper = await mountCard({ show: mockShowFull });

    expect(wrapper.text()).toContain('Under the Dome');
  });

  it('renders rating formatted to 1 decimal place', async () => {
    const wrapper = await mountCard({ show: mockShowFull });

    expect(wrapper.text()).toContain('6.5');
  });

  it('renders — when rating is null', async () => {
    const wrapper = await mountCard({ show: showNoImage });

    expect(wrapper.text()).toContain('—');
  });

  it('shows skeleton before image loads', async () => {
    const wrapper = await mountCard({ show: mockShowFull });

    expect(wrapper.find('[data-testid="skeleton"]').exists()).toBe(true);
  });

  it('removes skeleton after image loads', async () => {
    const wrapper = await mountCard({ show: mockShowFull });
    await wrapper.find('img').trigger('load');

    expect(wrapper.find('[data-testid="skeleton"]').exists()).toBe(false);
  });

  it('shows image fallback when show has no image', async () => {
    const wrapper = await mountCard({ show: showNoImage });

    expect(wrapper.find('[data-testid="image-fallback"]').exists()).toBe(true);
  });

  it('skips skeleton when show has no image', async () => {
    const wrapper = await mountCard({ show: showNoImage });

    expect(wrapper.find('[data-testid="skeleton"]').exists()).toBe(false);
  });

  it('uses h3 heading by default', async () => {
    const wrapper = await mountCard({ show: mockShowFull });

    expect(wrapper.find('h3').text()).toBe('Under the Dome');
  });

  it('uses h2 heading when headingLevel prop is h2', async () => {
    const wrapper = await mountCard({
      show: mockShowFull,
      headingLevel: 'h2',
    });

    expect(wrapper.find('h2').text()).toBe('Under the Dome');
  });
});
