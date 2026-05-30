export const mapCastMember = (castMember: TvmazeCastMember): Actor => {
  return {
    id: castMember.person.id,
    name: castMember.person.name,
    character: castMember.character.name,
    image: castMember.person.image?.medium || undefined,
  };
};
