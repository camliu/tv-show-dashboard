import { groupShowsByGenre } from '~~/shared/utils/show-transformer';

export const useShowList = () => {
  const { data, status, error } = useFetch<Show[]>('/api/shows', {
    server: false,
    lazy: true,
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  });

  watchEffect(() => {
    if (error.value) throw error.value;
  });

  const groupedShows = computed(() =>
    data.value ? [...groupShowsByGenre(data.value).entries()] : [],
  );
  return {
    groupedShows,
    status,
  };
};
