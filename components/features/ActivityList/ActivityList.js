import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";

export default function ActivityList({ activities }) {
  if (!activities || activities.length === 0) {
    return <p>No activities found.</p>;
  }

  return (
    <>
      {activities.map((activity) => {
        return (
          <ActivityCard
            key={activity._id}
            id={activity._id}
            title={activity.title}
            categories={activity.categories}
            imageUrl={activity.imageUrl}
          />
        );
      })}
    </>
  );
}
