import { useTvMaze, TVMAZE_CONFIG } from '~~/server/utils/tvmaze';
import type { TvmazeShow } from '~~/types/tvmaze';

export default cachedEventHandler(async () => {
  const api = useTvMaze();
  const rawData = await api<TvmazeShow[]>(TVMAZE_CONFIG.ENDPOINTS.SHOWS);
  return rawData;
}, {
  maxAge: 60 * 60,
});
