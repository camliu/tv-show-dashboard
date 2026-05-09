import { describe, it, expect } from 'vitest';
import { sortShowsByRating, groupShowsByGenre } from './show-transformer';
import {
  mockShowA, mockShowB, mockShowC, mockShowD, mockShowNoGenres,
} from '../../mocks/data/shows';

describe('sortShowsByRating', () => {
  it('should sort shows descending by rating', () => {
    const result = sortShowsByRating([mockShowB, mockShowA]);
    expect(result).toEqual([mockShowA, mockShowB]);
  });

  it('should place null-rated shows at the end', () => {
    const result = sortShowsByRating([mockShowC, mockShowA, mockShowB]);
    expect(result).toEqual([mockShowA, mockShowB, mockShowC]);
  });

  it('should not throw when all ratings are null', () => {
    const nullRated = {
      ...mockShowC,
      id: 99,
    };
    expect(() => sortShowsByRating([mockShowC, nullRated])).not.toThrow();
  });

  it('should not throw for equal ratings', () => {
    expect(() => sortShowsByRating([mockShowA, mockShowD])).not.toThrow();
  });

  it('should return an empty array when given an empty array', () => {
    expect(sortShowsByRating([])).toEqual([]);
  });

  it('should return a single-element array unchanged', () => {
    expect(sortShowsByRating([mockShowA])).toEqual([mockShowA]);
  });

  it('should not mutate the original array', () => {
    const input = [mockShowB, mockShowA];
    sortShowsByRating(input);
    expect(input).toEqual([mockShowB, mockShowA]);
  });
});

describe('groupShowsByGenre', () => {
  it('should group shows into the correct genre buckets', () => {
    const result = groupShowsByGenre([mockShowA, mockShowB, mockShowC]);
    expect(result.get('Drama')).toEqual([mockShowA, mockShowB]);
    expect(result.get('Crime')).toEqual([mockShowA, mockShowC]);
  });

  it('should sort shows within each bucket by rating descending', () => {
    const result = groupShowsByGenre([mockShowB, mockShowA]);
    expect(result.get('Drama')).toEqual([mockShowA, mockShowB]);
  });

  it('should place null-rated shows at the end of their bucket', () => {
    const result = groupShowsByGenre([mockShowA, mockShowC]);
    expect(result.get('Crime')).toEqual([mockShowA, mockShowC]);
  });

  it('should skip shows with no genres', () => {
    const result = groupShowsByGenre([mockShowA, mockShowNoGenres]);
    expect([...result.keys()]).not.toContain('');
    expect(result.size).toBe(2);
  });

  it('should return an empty Map when given an empty array', () => {
    expect(groupShowsByGenre([])).toEqual(new Map());
  });

  it('should create a singleton bucket for a genre with one show', () => {
    const result = groupShowsByGenre([mockShowD]);
    expect(result.get('Thriller')).toEqual([mockShowD]);
  });
});
