export const sortShowsByRating = (shows: Show[]): Show[] =>
  [...shows].sort((a, b) => {
    if (a.rating === b.rating) return 0;
    if (a.rating === null) return 1;
    if (b.rating === null) return -1;
    return b.rating - a.rating;
  });

export const groupShowsByGenre = (shows: Show[]): Map<string, Show[]> => {
  const map = new Map<string, Show[]>();
  for (const show of sortShowsByRating(shows)) {
    for (const genre of show.genres) {
      if (!map.has(genre)) map.set(genre, []);
      map.get(genre)!.push(show);
    }
  }
  return map;
};
