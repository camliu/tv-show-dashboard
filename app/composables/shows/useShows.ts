import { groupShowsByGenre } from '~~/shared/utils/show-transformer';

export const useShows = () => {
  const { data: cachedShows } = useNuxtData<Show[]>('shows');

  const { data, status, error } = useFetch<Show[]>('/api/shows', {
    key: 'shows',
    server: false,
    lazy: true,
    getCachedData: () => cachedShows.value ?? undefined,
  });

  const groupedShows = computed(() =>
    data.value ? [...groupShowsByGenre(data.value).entries()] : [],
  );

  return {
    groupedShows,
    status,
    error,
  };
};
