import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { useTvMaze } from '~~/server/utils/tvmaze';

export default cachedEventHandler(async () => {
  const api = useTvMaze();

  const data = await api<TvmazeShow[]>(TVMAZE_CONFIG.ENDPOINTS.SHOWS);

  return data.map(mapShow);
}, {
  maxAge: 60 * 60,
  staleMaxAge: 60 * 60,
  name: 'show-list',
});
