import type { H3Error } from 'h3';
import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { createTvMazeApiClient } from '~~/server/utils/createTvMazeApiClient';

export default cachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, 'id');
    const api = createTvMazeApiClient();

    try {
      const data = await api<TvmazeCastMember[]>(`${TVMAZE_CONFIG.ENDPOINTS.SHOWS}/${id}/cast`);
      return data.map(mapCastMember);
    }
    catch (e) {
      const statusCode = (e as H3Error).statusCode ?? 500;
      throw createError({
        statusCode,
        statusMessage: 'We couldn\'t load the cast',
      });
    }
  }, {
    maxAge: 60 * 60,
    name: 'cast-list',
    getKey: event => `cast-${getRouterParam(event, 'id')}`,
  });
