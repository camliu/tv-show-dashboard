export const useShowCast = (id: string | number) =>
  useFetch<Actor[]>(`/api/shows/${id}/cast`, {
    key: 'show-cast',
  });
