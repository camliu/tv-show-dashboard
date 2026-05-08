export const TVMAZE_CONFIG = {
  BASE_URL: 'https://api.tvmaze.com',
  IMAGE_DOMAIN: 'static.tvmaze.com',
  ENDPOINTS: {
    SHOWS: '/shows',
  },
} as const;

export const useTvMaze = () => {
  return $fetch.create({
    baseURL: TVMAZE_CONFIG.BASE_URL,
    headers: {
      Accept: 'application/json',
    },
    timeout: 10000,
  });
};
