import ActivityList from "@/components/features/ActivityList/ActivityList";
import useFavorites from "@/hooks/useFavorites";
export default function FavoriteActivities({ activities, isLoading }) {
  const { isFavorite, onToggle } = useFavorites();
  const favoriteActivities =
    activities?.filter((activity) => isFavorite.includes(activity._id)) ?? [];

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (favoriteActivities.length === 0) {
    return <p>No Favorites.</p>;
  }

  return (
    <>
      <ActivityList
        activities={favoriteActivities}
        isFavorite={isFavorite}
        onToggle={onToggle}
      />
    </>
  );
}
