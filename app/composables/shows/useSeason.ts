export const useSeason = (id: string | number) => {
  const { data: cachedSeason } = useNuxtData<Season[]>(`seasons-${id}`);

  return useFetch<Season[]>(`/api/shows/${id}/seasons`, {
    key: `seasons-${id}`,
    getCachedData: () => cachedSeason.value ?? undefined,
  });
};
