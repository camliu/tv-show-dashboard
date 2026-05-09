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

// Intentionally unsorted: mid, null, tied, high — exercises all sort branches
export const mockShowsForTransformer: Show[] = [
  mockShowMidRatingNoGenres,
  mockShowNullRating,
  mockShowTiedRating,
  mockShowHighRating,
];
