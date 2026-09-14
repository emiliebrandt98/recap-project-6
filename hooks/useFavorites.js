import useLocalStorageState from "use-local-storage-state";
export default function useFavorites() {
  const [isFavorite, setIsFavorite] = useLocalStorageState("Favorites", {
    defaultValue: [],
  });

  function handleFavoreite(id) {
    if (isFavorite.includes(id)) {
      const filteredFavorites = isFavorite.filter(
        (favoriteId) => favoriteId !== id
      );
      setIsFavorite(filteredFavorites);
    } else {
      setIsFavorite([...isFavorite, id]);
    }
  }

  return {
    onToggle: handleFavoreite,
    isFavorite,
    setIsFavorite,
  };
}
