import { describe, it, expect } from 'vitest';
import { mapShow } from './show-mapper';
import { mockRawShow, mockRawShowMissing } from '../../tests/fixtures/shows';

describe('mapShow', () => {
  it('should correctly map a full TVMaze show object', () => {
    const result = mapShow(mockRawShow);

    expect(result).toEqual({
      id: 1,
      name: 'Under the Dome',
      image: 'http://api.tvmaze.com/image.jpg',
      rating: 6.5,
      genres: ['Drama', 'Science-Fiction'],
    });
  });

  it('should handle missing data by providing interface-compliant fallbacks', () => {
    const result = mapShow(mockRawShowMissing);

    expect(result.image).toBeUndefined();
    expect(result.rating).toBeNull();
    expect(result.genres).toEqual([]);
  });
});
