import type { H3Error } from 'h3';
import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { useTvMaze } from '~~/server/utils/tvmaze';

const errorMessages: Record<number, string> = {
  404: 'Show not found',
  500: 'We couldn\'t load this show',
};

export default cachedEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const api = useTvMaze();

  try {
    const data = await api<TvmazeShow>(`${TVMAZE_CONFIG.ENDPOINTS.SHOWS}/${id}`);
    return mapShow(data);
  }
  catch (e) {
    const statusCode = (e as H3Error).statusCode ?? 500;
    throw createError({
      statusCode,
      statusMessage: errorMessages[statusCode] ?? 'Something went wrong',
    });
  }
}, {
  maxAge: 60 * 60,
  name: 'show-detail',
  getKey: event => `show-${getRouterParam(event, 'id')}`,
});
