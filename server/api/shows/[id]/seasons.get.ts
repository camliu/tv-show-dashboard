import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { useTvMaze } from '~~/server/utils/tvmaze';
import type { H3Error } from 'h3';

export default cachedEventHandler(
  async (event) => {
    const api = useTvMaze();
    const id = getRouterParam(event, 'id');

    try {
      const data = await api<TvmazeSeason[]>(`${TVMAZE_CONFIG.ENDPOINTS.SHOWS}/${id}/seasons`);
      return data.map(mapSeason);
    }
    catch (e) {
      const statusCode = (e as H3Error).statusCode ?? 500;
      throw createError({
        statusCode,
        statusMessage: 'We couldn\'t load the seasons',
      });
    }
  }, {
    maxAge: 60 * 60,
    name: 'seasons',
    getKey: event => `seasons-${getRouterParam(event, 'id')}`,
  });
