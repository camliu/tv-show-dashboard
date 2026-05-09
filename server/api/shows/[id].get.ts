import { TVMAZE_CONFIG } from '~~/shared/config/tvmaze';
import { useTvMaze } from '~~/server/utils/tvmaze';

export default cachedEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const api = useTvMaze();

  const data = await api<TvmazeShow>(`${TVMAZE_CONFIG.ENDPOINTS.SHOWS}/${id}`);

  return mapShow(data);
}, {
  maxAge: 60 * 60,
  name: 'show-detail',
  getKey: event => `show-${getRouterParam(event, 'id')}`,
});
