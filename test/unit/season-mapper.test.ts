import { describe, it, expect } from 'vitest';
import { mapSeason } from '../../shared/utils/season-mapper';
import { mockTvmazeSeasonFull, mockTvmazeSeasonNullable } from '../../mocks/data/tvmaze-season';

describe('seasonMapper', () => {
  it('should correctly map a full TVMaze season object', () => {
    const result = mapSeason(mockTvmazeSeasonFull);
    expect(result).toEqual({
      id: 1,
      name: 'Season 1',
      number: 1,
      image: 'https://static.tvmaze.com/uploads/images/medium_portrait/1/202627.jpg',
    });
  });

  it('should handle missing data by providing interface-compliant fallbacks', () => {
    const result = mapSeason(mockTvmazeSeasonNullable);
    expect(result.image).toBeUndefined();
    expect(result.name).toBe('Season 1');
    expect(result.number).toBe(1);
  });
});
