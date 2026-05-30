import { mountSuspended, mockComponent } from '@nuxt/test-utils/runtime';
import { mockShowFull } from '~~/mocks/data/shows';
import ShowsBookmark from '~~/app/components/shows/Bookmark.vue';
import {
  beforeEach, describe, expect, it,
} from 'vitest';

mockComponent('Icon', { template: '<span />' });

function mountBookmark(props: { show: Show }) {
  return mountSuspended(ShowsBookmark, { props });
}

describe('ShowBookmark', () => {
  beforeEach(() => {
    const store = useWatchlistStore();
    store.removeFromWatchlist(mockShowFull);
  });

  it('renders the bookmark button', async () => {
    const wrapper = await mountBookmark({ show: mockShowFull });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('shows "Add to watch list" label when show is not bookmarked', async () => {
    const wrapper = await mountBookmark({ show: mockShowFull });
    expect(wrapper.find('button').attributes('aria-label')).toBe('Add to watch list');
  });

  it('adds the show to the watchlist when the button is clicked', async () => {
    const wrapper = await mountBookmark({ show: mockShowFull });
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('button').attributes('aria-label')).toBe('Remove from watch list');
  });

  it('removes the show from the watchlist when clicked again', async () => {
    const wrapper = await mountBookmark({ show: mockShowFull });
    await wrapper.find('button').trigger('click');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('button').attributes('aria-label')).toBe('Add to watch list');
  });
});
