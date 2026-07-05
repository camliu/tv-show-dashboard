import { storeToRefs } from 'pinia';

export const useWatchlistPinia = () => {
  const store = useWatchlistStore();
  const { watchlist } = storeToRefs(store);

  return {
    watchlist,
    addToWatchlist: store.addToWatchlist,
    removeFromWatchlist: store.removeFromWatchlist,
    isInWatchlist: store.isInWatchlist,
  };
};
