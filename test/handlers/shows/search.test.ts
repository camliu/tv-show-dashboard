import { describe, expect, it } from 'vitest';
import type { TvmazeSearchResult } from '../../../shared/types/tvmaze';
import { mapShow } from '../../../shared/utils/show-mapper';
import { TVMAZE_CONFIG } from '../../../shared/config/tvmaze';
import { useTvMaze } from '../../../server/utils/tvmaze';
import { server } from '../../../mocks/node';
import { searchOverrideHandlers } from '../../../mocks/handlers/shows';

async function callHandler(q: string) {
  const api = useTvMaze();
  const data = await api<TvmazeSearchResult[]>(TVMAZE_CONFIG.ENDPOINTS.SEARCH_SHOWS, {
    query: { q },
  });
  return data.map(result => mapShow(result.show));
}

describe('GET /api/shows/search', () => {
  it('returns matched shows for a query', async () => {
    const data = await callHandler('dome');

    expect(data).toHaveLength(1);
    expect(data[0]!.name).toBe('Under the Dome');
  });

  it('maps the matched show correctly', async () => {
    const [show] = await callHandler('dome');

    expect(show).toMatchObject({
      id: 1,
      name: 'Under the Dome',
      rating: 6.5,
      network: 'CBS',
    });
  });

  it('returns multiple results when query matches several shows', async () => {
    server.use(searchOverrideHandlers.allResults);
    const data = await callHandler('any');

    expect(data.length).toBeGreaterThan(1);
  });

  it('returns empty array when no shows match', async () => {
    const data = await callHandler('xyznonexistent');

    expect(data).toEqual([]);
  });
});
