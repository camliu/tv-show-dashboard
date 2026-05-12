export const useShowSearch = (router = useRouter()) => {
  const query = ref('');
  const suggestions = ref<Show[]>([]);
  let abortController: AbortController | null = null;

  async function search(event: { query: string }) {
    abortController?.abort();
    abortController = new AbortController();

    if (!event.query.trim()) {
      suggestions.value = [];
      return;
    }
    try {
      suggestions.value = await $fetch<Show[]>('/api/shows/search', {
        query: { q: event.query },
        signal: abortController.signal,
      });
    }
    catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      suggestions.value = [];
    }
  }

  function select(event: { value: Show }) {
    query.value = '';
    suggestions.value = [];
    requestAnimationFrame(() => router.push(`/shows/${event.value.id}`));
  }

  return {
    query,
    suggestions,
    search,
    select,
  };
};
