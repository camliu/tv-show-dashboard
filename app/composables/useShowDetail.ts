export const useShowDetail = (id: string | number) => {
  return useFetch<Show>(`/api/shows/${id}`, {
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  });
};
