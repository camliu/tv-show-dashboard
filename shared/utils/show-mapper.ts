export const mapShow = (show: TvmazeShow): Show => {
  return {
    id: show.id,
    name: show.name,
    image: show.image?.medium || undefined,
    imageOriginal: show.image?.original || undefined,
    rating: show.rating?.average ?? null,
    genres: show.genres,
    summary: show.summary ?? '',
    status: show.status,
    premiered: show.premiered,
    ended: show.ended,
    network: show.network?.name ?? show.webChannel?.name ?? null,
    language: show.language,
    runtime: show.runtime,
  };
};
