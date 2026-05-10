import { http, HttpResponse } from 'msw';
import { TVMAZE_CONFIG } from '../../shared/config/tvmaze';
import { mockTvmazeShowsList } from '../data/tvmaze-shows';

const SHOWS_URL = `${TVMAZE_CONFIG.BASE_URL}${TVMAZE_CONFIG.ENDPOINTS.SHOWS}`;
const SEARCH_SHOWS_URL = `${TVMAZE_CONFIG.BASE_URL}${TVMAZE_CONFIG.ENDPOINTS.SEARCH_SHOWS}`;

export const showsHandlers = [
  http.get(SEARCH_SHOWS_URL, ({ request }) => {
    const q = new URL(request.url).searchParams.get('q') ?? '';
    const lower = q.toLowerCase();
    const results = mockTvmazeShowsList
      .filter(s => s.name.toLowerCase().includes(lower))
      .map(show => ({
        score: 1,
        show,
      }));
    return HttpResponse.json(results);
  }),

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

export const searchOverrideHandlers = {
  allResults: http.get(SEARCH_SHOWS_URL, () =>
    HttpResponse.json(mockTvmazeShowsList.map(show => ({
      score: 1,
      show,
    }))),
  ),
  serverError: http.get(SEARCH_SHOWS_URL, () =>
    HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
  ),
};
