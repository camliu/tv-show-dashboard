import { storeToRefs } from 'pinia';

export const useShowSearch = (router = useRouter()) => {
  const store = useSearchStore();
  const { query, suggestions } = storeToRefs(store);

  function search(event: { query: string }) {
    store.search(event.query);
  }

  function select(event: { value: Show }) {
    store.clear();
    requestAnimationFrame(() => router.push(`/shows/${event.value.id}`));
  }

  return {
    query,
    suggestions,
    search,
    select,
  };
};
