import { storeToRefs } from 'pinia';

export const useShowSearch = (router = useRouter()) => {
  const store = useSearchStore();
  const { query, suggestions } = storeToRefs(store);

  function search(event: { query: string }) {
    store.search(event.query);
  }

  function select(event: { value: Show }) {
    router.push(`/shows/${event.value.id}`);
    store.clear();
  }

  return {
    query,
    suggestions,
    search,
    select,
  };
};
