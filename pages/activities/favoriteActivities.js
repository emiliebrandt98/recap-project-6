import ActivityCard from "@/components/features/ActivityCard/ActivityCard";

export default function FavoriteActivites({
  activities,
  isFavorite,
  onToggle,
}) {
  const favoriteActivities =
    activities?.filter((activity) => isFavorite.includes(activity._id)) ?? [];

  if (favoriteActivities.length === 0) {
    return <p>No Favorites.</p>;
  }

  return (
    <div>
      {favoriteActivities.map((activity) => {
        return (
          <ActivityCard
            key={activity._id}
            id={activity._id}
            title={activity.title}
            categories={activity.categories}
            isFavorite={isFavorite}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
}
