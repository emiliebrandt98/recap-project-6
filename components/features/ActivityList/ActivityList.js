import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";

export default function ActivityList({ activities, activeCategories }) {
  if (!activities || activities.length === 0) {
    return <p>No activities found.</p>;
  }

  function matchesActiveCategories(activity) {
    if (activeCategories.length === 0) return true;

    return activity.categories.some((category) =>
      activeCategories.includes(category.name)
    );
  }

  const filteredActivities = activities.filter(matchesActiveCategories);

  if (filteredActivities.length === 0)
    return <p>No activities found for this category.</p>;

  return (
    <div>
      {filteredActivities.map((activity) => {
        return (
          <ActivityCard
            key={activity._id}
            id={activity._id}
            title={activity.title}
            categories={activity.categories}
          />
        );
      })}
    </div>
  );
}
