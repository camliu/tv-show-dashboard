import { describe, expect, it } from 'vitest';
import type { TvmazeShow } from '../../../shared/types/tvmaze';
import { mapShow } from '../../../shared/utils/show-mapper';
import { TVMAZE_CONFIG } from '../../../shared/config/tvmaze';
import { useTvMaze } from '../../../server/utils/tvmaze';

async function callHandler(id: number) {
  const api = useTvMaze();
  const data = await api<TvmazeShow>(`${TVMAZE_CONFIG.ENDPOINTS.SHOWS}/${id}`);
  return mapShow(data);
}

describe('GET /api/shows/:id', () => {
  it('returns the mapped show for a valid id', async () => {
    const show = await callHandler(1);

    expect(show).toMatchObject({
      id: 1,
      name: 'Under the Dome',
      rating: 6.5,
      network: 'CBS',
    });
  });

  it('throws when the show id does not exist', async () => {
    const error = await callHandler(9999).catch(e => e);

    expect(error.statusCode).toBe(404);
  });
});
