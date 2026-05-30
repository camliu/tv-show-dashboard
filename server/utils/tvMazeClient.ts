import { TVMAZE_CONFIG } from '../../shared/config/tvmaze';

export const tvMazeClient = () => {
  return $fetch.create({
    baseURL: TVMAZE_CONFIG.BASE_URL,
    headers: {
      Accept: 'application/json',
    },
    timeout: 10000,

    onRequestError() {
      throw createError({
        statusCode: 503,
        statusMessage: 'Service Unavailable',
      });
    },
    onResponseError({ response }) {
      throw createError({
        statusCode: response.status,
        statusMessage: 'External API Error',
      });
    },
  });
};
