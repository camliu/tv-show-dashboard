import { http, HttpResponse } from 'msw';
import { TVMAZE_CONFIG } from '../../shared/config/tvmaze';
import { mockTvmazeShowsList } from '../data/tvmaze-shows';
import { notFound, serverError } from '../responses';

const TVMAZE_SHOWS_URL = `${TVMAZE_CONFIG.BASE_URL}${TVMAZE_CONFIG.ENDPOINTS.SHOWS}`;
const TVMAZE_SEARCH_SHOWS_URL = `${TVMAZE_CONFIG.BASE_URL}${TVMAZE_CONFIG.ENDPOINTS.SEARCH_SHOWS}`;

export const tvmazeHandlers = [
  http.get(TVMAZE_SHOWS_URL, () => HttpResponse.json(mockTvmazeShowsList)),

  http.get(`${TVMAZE_SHOWS_URL}/:id`, ({ params }) => {
    const show = mockTvmazeShowsList.find(s => s.id === Number(params.id));
    return show
      ? HttpResponse.json(show)
      : notFound();
  }),

  http.get(TVMAZE_SEARCH_SHOWS_URL, ({ request }) => {
    const q = (new URL(request.url).searchParams.get('q') ?? '').toLowerCase();
    const results = mockTvmazeShowsList
      .filter(s => s.name.toLowerCase().includes(q))
      .map(show => ({
        score: 1,
        show,
      }));
    return HttpResponse.json(results);
  }),
];

export const tvmazeOverrides = {
  empty: [
    http.get(TVMAZE_SHOWS_URL, () => HttpResponse.json([])),
    http.get(`${TVMAZE_SHOWS_URL}/:id`, notFound),
    http.get(TVMAZE_SEARCH_SHOWS_URL, () => HttpResponse.json([])),
  ],

  serverError: [
    http.get(TVMAZE_SHOWS_URL, serverError),
    http.get(`${TVMAZE_SHOWS_URL}/:id`, serverError),
    http.get(TVMAZE_SEARCH_SHOWS_URL, serverError),
  ],
};
