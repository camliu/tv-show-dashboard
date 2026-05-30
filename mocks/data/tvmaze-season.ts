export const mockTvmazeSeasonFull: TvmazeSeason = {
  id: 1,
  url: 'https://www.tvmaze.com/seasons/1/season-1',
  name: 'Season 1',
  number: 1,
  episodeOrder: 1,
  premiereDate: '2013-06-24',
  endDate: '2015-09-10',
  network: {
    id: 2,
    name: 'CBS',
  },
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/1/202627.jpg',
    original: 'https://static.tvmaze.com/uploads/images/original_untouched/1/202627.jpg',
  },
  webChannel: null,
  summary: '<p>Season 1 is the first season of the show.</p>',
  _links: {
    self: { href: 'https://api.tvmaze.com/seasons/1' },
  },
};

export const mockTvmazeSeasonNullable: TvmazeSeason = {
  id: 1,
  name: 'Season 1',
  number: 1,
  episodeOrder: 1,
  premiereDate: null,
  endDate: null,
  network: null,
  webChannel: null,
  image: null,
  summary: null,
  _links: {
    self: { href: 'https://api.tvmaze.com/seasons/1' },
  },
};
