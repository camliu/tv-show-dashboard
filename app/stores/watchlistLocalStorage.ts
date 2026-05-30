import { defineStore } from 'pinia';

export const useWatchlistLocalStorageStore = defineStore('watchlistLocalStorage', () => {
  const getInitialWatchlist = (): Show[] => {
    const stored = localStorage.getItem('watchlist');
    return stored ? JSON.parse(stored) : [];
  };

  const watchlist = ref<Show[]>(getInitialWatchlist());

  function addToWatchlist(show: Show) {
    watchlist.value.push(show);
  }

  function removeFromWatchlist(show: Show) {
    watchlist.value = watchlist.value.filter(item => item.id !== show.id);
  }

  function isInWatchlist(show: Show) {
    return watchlist.value.some(item => item.id === show.id);
  }

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
});
