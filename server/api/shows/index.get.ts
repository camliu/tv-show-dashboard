import type { H3Error } from 'h3';
import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { useTvMaze } from '~~/server/utils/tvmaze';

const errorMessages: Record<number, string> = {
  500: 'We couldn\'t load the shows',
  503: 'Service temporarily unavailable',
};

export default cachedEventHandler(async () => {
  const api = useTvMaze();

  try {
    const data = await api<TvmazeShow[]>(TVMAZE_CONFIG.ENDPOINTS.SHOWS);
    return data.map(mapShow);
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
  staleMaxAge: 60 * 60,
  name: 'show-list',
});
