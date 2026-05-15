import { describe, it, expect } from 'vitest';
import { sortShowsByRating, groupShowsByGenre } from '../../shared/utils/show-transformer';
import {
  mockShowHighRating,
  mockShowTiedRating,
  mockShowMidRatingNoGenres,
  mockShowNullRating,
  mockShowsForTransformer,
} from '../../mocks/data/shows';

describe('sortShowsByRating', () => {
  it('sorts higher ratings first', () => {
    const result = sortShowsByRating(mockShowsForTransformer);
    expect(result[0]!.rating).toBe(9.0);
    expect(result[1]!.rating).toBe(9.0);
    expect(result[2]!.rating).toBe(7.5);
  });

  it('places null-rated shows last', () => {
    const result = sortShowsByRating(mockShowsForTransformer);
    expect(result[result.length - 1]!.rating).toBeNull();
  });

  it('preserves relative order of tied ratings', () => {
    const result = sortShowsByRating(mockShowsForTransformer);
    const tiedIdx = result.indexOf(mockShowTiedRating);
    const highIdx = result.indexOf(mockShowHighRating);
    expect(tiedIdx).toBeLessThan(highIdx);
  });

  it('does not mutate the original array', () => {
    const original = [...mockShowsForTransformer];
    sortShowsByRating(mockShowsForTransformer);
    expect(mockShowsForTransformer).toEqual(original);
  });

  it('returns an empty array for empty input', () => {
    expect(sortShowsByRating([])).toEqual([]);
  });

  it('places a rated show before a null-rated show when rated comes first in input', () => {
    const result = sortShowsByRating([mockShowHighRating, mockShowNullRating]);
    expect(result[0]).toBe(mockShowHighRating);
    expect(result[1]).toBe(mockShowNullRating);
  });

  it('returns stable order for two null-rated shows', () => {
    const a = {
      ...mockShowNullRating,
      id: 10,
    };
    const b = {
      ...mockShowNullRating,
      id: 11,
    };
    const result = sortShowsByRating([a, b]);
    expect(result[0]).toBe(a);
    expect(result[1]).toBe(b);
  });
});

describe('groupShowsByGenre', () => {
  it('groups shows into the correct genre buckets', () => {
    const result = groupShowsByGenre(mockShowsForTransformer);
    expect(result.get('Drama')).toContain(mockShowHighRating);
    expect(result.get('Drama')).toContain(mockShowTiedRating);
    expect(result.get('Crime')).toEqual([mockShowTiedRating]);
    expect(result.get('Comedy')).toEqual([mockShowNullRating]);
  });

  it('places a multi-genre show in each of its genre buckets', () => {
    const result = groupShowsByGenre(mockShowsForTransformer);
    expect(result.get('Drama')).toContain(mockShowTiedRating);
    expect(result.get('Crime')).toContain(mockShowTiedRating);
  });

  it('excludes a show with no genres from all buckets', () => {
    const result = groupShowsByGenre(mockShowsForTransformer);
    for (const shows of result.values()) {
      expect(shows).not.toContain(mockShowMidRatingNoGenres);
    }
  });

  it('sorts shows within each bucket by rating descending, nulls last', () => {
    const dramaShows = groupShowsByGenre(mockShowsForTransformer).get('Drama')!;
    expect(dramaShows[0]!.rating).toBe(9.0);
    expect(dramaShows[1]!.rating).toBe(9.0);

    const comedyShows = groupShowsByGenre(mockShowsForTransformer).get('Comedy')!;
    expect(comedyShows[0]!.rating).toBeNull();
  });

  it('returns an empty map for empty input', () => {
    expect(groupShowsByGenre([])).toEqual(new Map());
  });
});
