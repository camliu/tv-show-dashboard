import { useLocalStorage } from '@vueuse/core';

export const useWatchlistLocalStorage = () => {
  const watchlist = useLocalStorage<Show[]>('watchList', []);

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
};
