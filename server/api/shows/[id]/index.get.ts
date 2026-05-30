import type { H3Error } from 'h3';
import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { tvMazeClient } from '~~/server/utils/tvMazeClient';

export default cachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, 'id');
    const api = tvMazeClient();

    try {
      const data = await api<TvmazeShow>(`${TVMAZE_CONFIG.ENDPOINTS.SHOWS}/${id}`);
      return mapShow(data);
    }
    catch (e) {
      const statusCode = (e as H3Error).statusCode ?? 500;
      if (statusCode === 404) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Show not found',
          data: { detail: 'The show you\'re looking for doesn\'t exist.' },
        });
      }
      throw createError({
        statusCode,
        statusMessage: 'We couldn\'t load this show',
        data: { detail: 'An unexpected error occurred. Please try again later.' },
      });
    }
  }, {
    maxAge: 60 * 60,
    name: 'show-detail',
    getKey: event => `show-${getRouterParam(event, 'id')}`,
  });
