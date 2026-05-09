import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { useTvMaze } from '~~/server/utils/tvmaze';

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event);

  if (!q || typeof q !== 'string' || !q.trim()) return [];

  const api = useTvMaze();
  const data = await api<TvmazeSearchResult[]>(TVMAZE_CONFIG.ENDPOINTS.SEARCH_SHOWS, {
    query: { q },
  });

  return data.map(result => mapShow(result.show));
});
