import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import type {
  AutoCompleteCompleteEvent,
  AutoCompleteOptionSelectEvent,
} from 'primevue/autocomplete';
import { useShowSearch } from '../../app/composables/shows/useShowSearch';
import { mockShowFull } from '../../mocks/data/shows';

function setup(fetchResult: Show[] = [mockShowFull]) {
  vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(fetchResult));
  const router = { push: vi.fn() };
  const composable = useShowSearch(router as unknown as ReturnType<typeof useRouter>);
  return {
    composable,
    router,
  };
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

describe('useShowSearch', () => {
  it('updates suggestions on search', async () => {
    const { composable } = setup();

    await composable.search({ query: 'dome' } as AutoCompleteCompleteEvent);

    expect(composable.suggestions.value).toEqual([mockShowFull]);
  });

  it('clears suggestions for empty query', async () => {
    const { composable } = setup();
    composable.suggestions.value = [mockShowFull];

    await composable.search({ query: '' } as AutoCompleteCompleteEvent);

    expect(composable.suggestions.value).toEqual([]);
  });

  it('clears suggestions for whitespace-only query', async () => {
    const { composable } = setup();
    composable.suggestions.value = [mockShowFull];

    await composable.search({ query: '   ' } as AutoCompleteCompleteEvent);

    expect(composable.suggestions.value).toEqual([]);
  });

  it('clears suggestions on fetch error', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    const router = { push: vi.fn() };
    const composable = useShowSearch(router as unknown as ReturnType<typeof useRouter>);
    composable.suggestions.value = [mockShowFull];

    await composable.search({ query: 'dome' } as AutoCompleteCompleteEvent);

    expect(composable.suggestions.value).toEqual([]);
  });

  it('navigates to show page on select', async () => {
    const { composable, router } = setup();

    await composable.select({ value: mockShowFull } as AutoCompleteOptionSelectEvent);

    expect(router.push).toHaveBeenCalledWith('/shows/1');
  });

  it('resets query and suggestions on select', async () => {
    const { composable } = setup();
    composable.query.value = 'dome';
    composable.suggestions.value = [mockShowFull];

    await composable.select({ value: mockShowFull } as AutoCompleteOptionSelectEvent);

    expect(composable.query.value).toBe('');
    expect(composable.suggestions.value).toEqual([]);
  });

  it('aborts the previous request signal when a new search starts', async () => {
    const capturedSignals: AbortSignal[] = [];
    vi.stubGlobal('$fetch', vi.fn().mockImplementation((_url: string, opts: { signal: AbortSignal }) => {
      capturedSignals.push(opts.signal);
      return Promise.resolve([]);
    }));

    const router = { push: vi.fn() };
    const composable = useShowSearch(router as unknown as ReturnType<typeof useRouter>);
    await composable.search({ query: 'first' } as AutoCompleteCompleteEvent);
    await composable.search({ query: 'second' } as AutoCompleteCompleteEvent);

    expect(capturedSignals[0]!.aborted).toBe(true);
    expect(capturedSignals[1]!.aborted).toBe(false);
  });

  it('does not clear suggestions when the request is aborted', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockRejectedValue(new DOMException('Aborted', 'AbortError')));

    const router = { push: vi.fn() };
    const composable = useShowSearch(router as unknown as ReturnType<typeof useRouter>);
    composable.suggestions.value = [mockShowFull];

    await composable.search({ query: 'dome' } as AutoCompleteCompleteEvent);

    expect(composable.suggestions.value).toEqual([mockShowFull]);
  });
});
