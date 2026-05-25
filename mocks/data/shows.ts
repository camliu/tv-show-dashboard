const baseShow = {
  image: undefined,
  imageOriginal: undefined,
  summary: '',
  status: 'Running',
  premiered: '2020-01-01',
  ended: null,
  network: null,
  language: 'English',
  runtime: null,
} satisfies Partial<Show>;

export const mockShowHighRating: Show = {
  ...baseShow,
  id: 1,
  name: 'Drama High',
  rating: 9.0,
  genres: ['Drama'],
};

export const mockShowTiedRating: Show = {
  ...baseShow,
  id: 2,
  name: 'Drama Crime Tied',
  rating: 9.0,
  genres: ['Drama', 'Crime'],
};

export const mockShowMidRatingNoGenres: Show = {
  ...baseShow,
  id: 3,
  name: 'Mid No Genres',
  rating: 7.5,
  genres: [],
};

export const mockShowNullRating: Show = {
  ...baseShow,
  id: 4,
  name: 'Comedy Unrated',
  rating: null,
  genres: ['Comedy'],
};

export const mockShowFull: Show = {
  id: 1,
  name: 'Under the Dome',
  image: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
  imageOriginal: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
  rating: 6.5,
  genres: ['Drama', 'Science-Fiction', 'Thriller'],
  summary: '<p>Under the Dome</p>',
  status: 'Ended',
  premiered: '2013-06-24',
  ended: '2015-09-10',
  network: 'CBS',
  language: 'English',
  runtime: 60,
};

export const mockShowsForTransformer: Show[] = [
  mockShowMidRatingNoGenres,
  mockShowNullRating,
  mockShowTiedRating,
  mockShowHighRating,
];
