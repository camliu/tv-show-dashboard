export const useWatchlistPinia = () => {
  const store = useWatchlistStore();

  return {
    watchlist: store.watchlist,
    addToWatchlist: store.addToWatchlist,
    removeFromWatchlist: store.removeFromWatchlist,
    isInWatchlist: store.isInWatchlist,
  };
};
