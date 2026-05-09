import { groupShowsByGenre } from '~~/shared/utils/show-transformer';

export const useShowList = () => {
  const { data, error, pending } = useFetch('/api/shows');
  const groupedShows = computed(() =>
    data.value ? [...groupShowsByGenre(data.value).entries()] : [],
  );
  return {
    groupedShows,
    error,
    pending,
  };
};
