export const useSearchStore = defineStore('search', () => {
  const query = ref('');
  const suggestions = ref<Show[]>([]);
  let abortController: AbortController | null = null;

  async function search(q: string) {
    abortController?.abort();
    abortController = new AbortController();

    if (!q.trim()) {
      suggestions.value = [];
      return;
    }
    try {
      suggestions.value = await $fetch<Show[]>('/api/shows/search', {
        query: { q },
        signal: abortController.signal,
      });
    }
    catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      suggestions.value = [];
    }
  }

  function clear() {
    query.value = '';
    suggestions.value = [];
  }

  return {
    query,
    suggestions,
    search,
    clear,
  };
});
