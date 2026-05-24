export const useShow = (id: string | number) => {
  const { data: cachedShow } = useNuxtData<Show>(`show-${id}`);

  return useFetch<Show>(`/api/shows/${id}`, {
    key: `show-${id}`,
    getCachedData: () => cachedShow.value ?? undefined,
  });
};
