import type { H3Error } from 'h3';
import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { useTvMaze } from '~~/server/utils/tvmaze';

export default cachedEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const api = useTvMaze();

  try {
    const data = await api<TvmazeShow>(`${TVMAZE_CONFIG.ENDPOINTS.SHOWS}/${id}`);
    return mapShow(data);
  }
  catch (e) {
    const is404 = (e as H3Error).statusCode === 404;
    throw createError({
      statusCode: is404 ? 404 : 500,
      statusMessage: is404 ? 'Show not found' : 'We couldn\'t load this show',
      data: is404
        ? { context: 'That show doesn\'t exist or may have been removed.' }
        : { context: 'It may be unavailable right now. Try going back and selecting it again.' },
    });
  }
}, {
  maxAge: 60 * 60,
  name: 'show-detail',
  getKey: event => `show-${getRouterParam(event, 'id')}`,
});
