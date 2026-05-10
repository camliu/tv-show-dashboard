import { describe, expect, it } from 'vitest';
import type { TvmazeShow } from '../../../shared/types/tvmaze';
import { mapShow } from '../../../shared/utils/show-mapper';
import { TVMAZE_CONFIG } from '../../../shared/config/tvmaze';
import { useTvMaze } from '../../../server/utils/tvmaze';
import { server } from '../../../mocks/node';
import { showsOverrideHandlers } from '../../../mocks/handlers/shows';

async function callHandler(): Promise<ReturnType<typeof mapShow>[]> {
  const api = useTvMaze();
  const data = await api<TvmazeShow[]>(TVMAZE_CONFIG.ENDPOINTS.SHOWS);
  return data.map(mapShow);
}

describe('GET /api/shows', () => {
  it('returns a mapped show list', async () => {
    const data = await callHandler();

    expect(data).toHaveLength(2);
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
