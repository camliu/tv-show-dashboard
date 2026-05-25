import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { createTvMazeApiClient } from '~~/server/utils/createTvMazeApiClient';

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event);

  if (!q || typeof q !== 'string' || !q.trim()) return [];

  const api = createTvMazeApiClient();

  try {
    const data = await api<TvmazeSearchResult[]>(
      TVMAZE_CONFIG.ENDPOINTS.SEARCH_SHOWS,
      {
        query: { q },
      },
    );
    return data.map(result => mapShow(result.show));
  }
  catch {
    throw createError({
      statusCode: 503,
      statusMessage: 'Search unavailable',
    });
  }
});
