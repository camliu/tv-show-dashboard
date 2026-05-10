import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import type {
  AutoCompleteCompleteEvent,
  AutoCompleteOptionSelectEvent,
} from 'primevue/autocomplete';

const mockShow: Show = {
  id: 1,
  name: 'Under the Dome',
  image: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
  imageOriginal: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
  rating: 6.5,
  genres: ['Drama', 'Science-Fiction', 'Thriller'],
  summary: '<p>Under the Dome</p>',
  status: 'Ended',
  premiered: '2013-06-24',
  ended: '2015-09-10',
  network: 'CBS',
  language: 'English',
  runtime: 60,
};

function setup(fetchResult: Show[] = [mockShow]) {
  vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(fetchResult));
  const router = { push: vi.fn() };
  const composable = useShowSearch(router as unknown as ReturnType<typeof useRouter>);
  return {
    composable,
    router,
  };
}

beforeEach(() => {
  setActivePinia(createPinia());
  vi.unstubAllGlobals();
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => cb(0));
});

describe('useShowSearch', () => {
  it('updates suggestions on search', async () => {
    const { composable } = setup();

    await composable.search({ query: 'dome' } as AutoCompleteCompleteEvent);

    expect(composable.suggestions.value).toEqual([mockShow]);
  });

  it('clears suggestions for empty query', async () => {
    const { composable } = setup();
    composable.suggestions.value = [mockShow];

    await composable.search({ query: '' } as AutoCompleteCompleteEvent);

    expect(composable.suggestions.value).toEqual([]);
  });

  it('clears suggestions for whitespace-only query', async () => {
    const { composable } = setup();
    composable.suggestions.value = [mockShow];

    await composable.search({ query: '   ' } as AutoCompleteCompleteEvent);

    expect(composable.suggestions.value).toEqual([]);
  });

  it('clears suggestions on fetch error', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    const router = { push: vi.fn() };
    const composable = useShowSearch(router as unknown as ReturnType<typeof useRouter>);
    composable.suggestions.value = [mockShow];

    await composable.search({ query: 'dome' } as AutoCompleteCompleteEvent);

    expect(composable.suggestions.value).toEqual([]);
  });

  it('navigates to show page on select', () => {
    const { composable, router } = setup();

    composable.select({ value: mockShow } as AutoCompleteOptionSelectEvent);

    expect(router.push).toHaveBeenCalledWith('/shows/1');
  });

  it('resets query and suggestions on select', () => {
    const { composable } = setup();
    composable.query.value = 'dome';
    composable.suggestions.value = [mockShow];

    composable.select({ value: mockShow } as AutoCompleteOptionSelectEvent);

    expect(composable.query.value).toBe('');
    expect(composable.suggestions.value).toEqual([]);
  });
});
