import {
  afterAll, afterEach, beforeAll, describe, expect, it,
} from 'vitest';
import type { TvmazeShow } from '../../../../shared/types/tvmaze';
import { mapShow } from '../../../../shared/utils/show-mapper';
import { TVMAZE_CONFIG } from '../../../../shared/config/tvmaze';
import { useTvMaze } from '../../../../server/utils/tvmaze';
import { server } from '../../../../mocks/node';
import { showsOverrideHandlers } from '../../../../mocks/handlers/shows';

async function callHandler(): Promise<ReturnType<typeof mapShow>[]> {
  const api = useTvMaze();
  const data = await api<TvmazeShow[]>(TVMAZE_CONFIG.ENDPOINTS.SHOWS);
  return data.map(mapShow);
}

describe('GET /api/shows', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('returns a mapped show list', async () => {
    const data = await callHandler();

    expect(data).toHaveLength(2);
  });

  it('maps a full show correctly', async () => {
    const [full] = await callHandler();

    expect(full).toEqual({
      id: 1,
      name: 'Under the Dome',
      image: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
      imageOriginal: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
      rating: 6.5,
      genres: ['Drama', 'Science-Fiction', 'Thriller'],
      summary: '<p>Under the Dome is the story of the residents of Chester\'s Mill.</p>',
      status: 'Ended',
      premiered: '2013-06-24',
      ended: '2015-09-10',
      network: 'CBS',
      language: 'English',
      runtime: 60,
    });
  });

  it('maps null image/rating to undefined/null and falls back to webChannel for network', async () => {
    const data = await callHandler();
    const sparse = data[1]!;

    expect(sparse.image).toBeUndefined();
    expect(sparse.imageOriginal).toBeUndefined();
    expect(sparse.rating).toBeNull();
    expect(sparse.genres).toEqual([]);
    expect(sparse.summary).toBe('');
    expect(sparse.ended).toBeNull();
    expect(sparse.runtime).toBeNull();
    expect(sparse.network).toBe('Netflix');
  });

  it('returns empty array when TVMaze returns no shows', async () => {
    server.use(showsOverrideHandlers.emptyList);

    const data = await callHandler();

    expect(data).toEqual([]);
  });

  it('throws 503 when TVMaze responds with a server error', async () => {
    server.use(showsOverrideHandlers.serverError);

    const error = await callHandler().catch(e => e);

    expect(error.statusCode).toBe(500);
  });
});
