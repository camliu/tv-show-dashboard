import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mockShowHighRating } from '../../mocks/data/shows';

beforeEach(() => {
  setActivePinia(createPinia());
  vi.unstubAllGlobals();
});

describe('useSearchStore', () => {
  describe('search()', () => {
    it('aborts the previous request signal when a new search starts', async () => {
      const capturedSignals: AbortSignal[] = [];
      vi.stubGlobal('$fetch', vi.fn().mockImplementation((_url: string, opts: { signal: AbortSignal }) => {
        capturedSignals.push(opts.signal);
        return Promise.resolve([]);
      }));

      const store = useSearchStore();
      await store.search('first');
      await store.search('second');

      expect(capturedSignals[0]!.aborted).toBe(true);
      expect(capturedSignals[1]!.aborted).toBe(false);
    });

    it('does not clear suggestions when the request is aborted', async () => {
      vi.stubGlobal('$fetch', vi.fn().mockRejectedValue(new DOMException('Aborted', 'AbortError')));

      const store = useSearchStore();
      store.suggestions = [mockShowHighRating];

      await store.search('dome');

      expect(store.suggestions).toEqual([mockShowHighRating]);
    });
  });
});
