import { http, HttpResponse } from 'msw';
import { TVMAZE_CONFIG } from '../../shared/config/tvmaze';
import { mockTvmazeShowsList } from '../data/shows';

const SHOWS_URL = `${TVMAZE_CONFIG.BASE_URL}${TVMAZE_CONFIG.ENDPOINTS.SHOWS}`;

export const showsHandlers = [
  http.get(SHOWS_URL, () => HttpResponse.json(mockTvmazeShowsList)),
];

export const showsOverrideHandlers = {
  emptyList: http.get(SHOWS_URL, () => HttpResponse.json([])),
  serverError: http.get(SHOWS_URL, () =>
    HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
  ),
};
