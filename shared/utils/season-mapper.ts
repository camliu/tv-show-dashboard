export const mapSeason = (season: TvmazeSeason): Season => {
  return {
    id: season.id,
    name: season.name || `Season ${season.number}`,
    number: season.number,
    image: season.image?.medium || undefined,
  };
};
