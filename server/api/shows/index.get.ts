import { useTvMaze, TVMAZE_CONFIG } from '~~/server/utils/tvmaze';

export default cachedEventHandler(async () => {
  const api = useTvMaze();

  const data = await api<TvmazeShow[]>(TVMAZE_CONFIG.ENDPOINTS.SHOWS);

  return data.map(mapShow);
}, {
  maxAge: 60 * 15,
  name: 'shows-list',
  getKey: event => event.path,
});
