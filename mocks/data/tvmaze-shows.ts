export const mockTvmazeShowFull: TvmazeShow = {
  id: 1,
  url: 'https://www.tvmaze.com/shows/1/under-the-dome',
  name: 'Under the Dome',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama', 'Science-Fiction', 'Thriller'],
  status: 'Ended',
  runtime: 60,
  averageRuntime: 60,
  premiered: '2013-06-24',
  ended: '2015-09-10',
  officialSite: 'https://www.cbs.com/shows/under-the-dome/',
  schedule: {
    time: '22:00',
    days: ['Thursday'],
  },
  rating: { average: 6.5 },
  weight: 98,
  network: {
    id: 2,
    name: 'CBS',
    country: {
      name: 'United States',
      code: 'US',
      timezone: 'America/New_York',
    },
    officialSite: 'https://www.cbs.com/',
  },
  webChannel: null,
  dvdCountry: null,
  externals: {
    tvrage: 25988,
    thetvdb: 264492,
    imdb: 'tt1553656',
  },
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
    original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
  },
  summary: '<p>Under the Dome is the story of the residents of Chester\'s Mill.</p>',
  updated: 1631010933,
  _links: {
    self: { href: 'https://api.tvmaze.com/shows/1' },
    previousepisode: {
      href: 'https://api.tvmaze.com/episodes/185054',
      name: 'The Enemy Within',
    },
  },
};

export const mockTvmazeShowNullable: TvmazeShow = {
  id: 2,
  url: 'https://www.tvmaze.com/shows/2/sparse-show',
  name: 'Sparse Show',
  type: 'Animation',
  language: 'Japanese',
  genres: [],
  status: 'Running',
  runtime: null,
  averageRuntime: 24,
  premiered: '2020-04-01',
  ended: null,
  officialSite: null,
  schedule: {
    time: '',
    days: [],
  },
  rating: { average: null },
  weight: 0,
  network: null,
  webChannel: {
    id: 22,
    name: 'Netflix',
    country: null,
    officialSite: 'https://www.netflix.com/',
  },
  dvdCountry: null,
  externals: {
    tvrage: null,
    thetvdb: null,
    imdb: null,
  },
  image: {
    medium: null,
    original: null,
  },
  summary: '',
  updated: 1700000000,
  _links: {
    self: { href: 'https://api.tvmaze.com/shows/2' },
    nextepisode: { href: 'https://api.tvmaze.com/episodes/9000' },
  },
};

export const mockTvmazeShowsList: TvmazeShow[] = [
  mockTvmazeShowFull,
  mockTvmazeShowNullable,
];
