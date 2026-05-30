import type { H3Error } from 'h3';
import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { tvMazeClient } from '~~/server/utils/tvMazeClient';

export default cachedEventHandler(
  async () => {
    const api = tvMazeClient();

    try {
      const data = await api<TvmazeShow[]>(TVMAZE_CONFIG.ENDPOINTS.SHOWS);
      return data.map(mapShow);
    }
    catch (e) {
      const statusCode = (e as H3Error).statusCode ?? 500;
      throw createError({
        statusCode,
        statusMessage: 'We couldn\'t load the shows',
      });
    }
  },
  {
    maxAge: 60 * 60,
    name: 'show-list',
  },
);
