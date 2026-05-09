import { http, HttpResponse } from 'msw';
import { TVMAZE_CONFIG } from '../../shared/config/tvmaze';
import { mockTvmazeShowsList } from '../data/tvmaze-shows';

const SHOWS_URL = `${TVMAZE_CONFIG.BASE_URL}${TVMAZE_CONFIG.ENDPOINTS.SHOWS}`;

export const showsHandlers = [
  http.get(SHOWS_URL, () => HttpResponse.json(mockTvmazeShowsList)),

  http.get(`${SHOWS_URL}/:id`, ({ params }) => {
    const show = mockTvmazeShowsList.find(s => s.id === Number(params.id));
    return show
      ? HttpResponse.json(show)
      : HttpResponse.json({ message: 'Not Found' }, { status: 404 });
  }),
];

export const showsOverrideHandlers = {
  emptyList: http.get(SHOWS_URL, () => HttpResponse.json([])),
  serverError: http.get(SHOWS_URL, () =>
    HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
  ),
};
