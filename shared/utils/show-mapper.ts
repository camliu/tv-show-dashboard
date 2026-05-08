export const mapShow = (show: TvmazeShow): Show => {
  return {
    id: show.id,
    name: show.name,
    image: show.image?.medium ?? '',
    rating: show.rating?.average ?? null,
    genres: show.genres,
  };
};
