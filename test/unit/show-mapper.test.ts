import { describe, it, expect } from 'vitest';
import { mapShow } from '../../shared/utils/show-mapper';
import { mockTvmazeShowFull, mockTvmazeShowNullable } from '../../mocks/data/tvmaze-shows';

describe('mapShow', () => {
  it('should correctly map a full TVMaze show object', () => {
    const result = mapShow(mockTvmazeShowFull);

    expect(result).toEqual({
      id: 1,
      name: 'Under the Dome',
      image: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
      imageOriginal: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
      rating: 6.5,
      genres: ['Drama', 'Science-Fiction', 'Thriller'],
      summary: '<p>Under the Dome is the story of the residents of Chester\'s Mill.</p>',
      status: 'Ended',
      premiered: '2013-06-24',
      ended: '2015-09-10',
      network: 'CBS',
      language: 'English',
      runtime: 60,
    });
  });

  it('should handle missing data by providing interface-compliant fallbacks', () => {
    const result = mapShow(mockTvmazeShowNullable);

    expect(result.image).toBeUndefined();
    expect(result.imageOriginal).toBeUndefined();
    expect(result.rating).toBeNull();
    expect(result.genres).toEqual([]);
    expect(result.summary).toBe('');
    expect(result.ended).toBeNull();
    expect(result.runtime).toBeNull();
    expect(result.network).toBe('Netflix');
  });
});
