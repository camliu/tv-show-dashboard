import { describe, it, expect } from 'vitest';
import { mapShow } from './show-mapper';
import { mockTvmazeShowFull, mockTvmazeShowSparse } from '../../mocks/data/shows';

describe('mapShow', () => {
  it('should correctly map a full TVMaze show object', () => {
    const result = mapShow(mockTvmazeShowFull);

    expect(result).toEqual({
      id: 1,
      name: 'Under the Dome',
      image: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
      rating: 6.5,
      genres: ['Drama', 'Science-Fiction', 'Thriller'],
    });
  });

  it('should handle missing data by providing interface-compliant fallbacks', () => {
    const result = mapShow(mockTvmazeShowSparse);

    expect(result.image).toBeUndefined();
    expect(result.rating).toBeNull();
    expect(result.genres).toEqual([]);
  });
});
