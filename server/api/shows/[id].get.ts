import { TVMAZE_CONFIG, useTvMaze } from '~~/server/utils/tvmaze';

export default cachedEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const api = useTvMaze();
  const data = await api(`${TVMAZE_CONFIG.ENDPOINTS.SHOWS}/${id}`);
  return data;
}, {
  maxAge: 60 * 60,
});
