export const mockRawShow: TvmazeShow = {
  id: 1,
  name: 'Under the Dome',
  summary: '<p>A mystery drama.</p>',
  rating: { average: 6.5 },
  genres: ['Drama', 'Science-Fiction'],
  image: {
    medium: 'http://api.tvmaze.com/image.jpg',
    original: '...',
  },
};

export const mockRawShowMissing: TvmazeShow = {
  id: 2,
  name: 'Empty Show',
  summary: null,
  rating: { average: null },
  genres: [],
  image: null,
};
