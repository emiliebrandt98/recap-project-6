import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";

export default function ActivityList({
  activities,
  search,
  activeCategories,
  searchResults,
}) {
  if (!activities || activities.length === 0) {
    return <p>No activities found.</p>;
  }

  function matchesActiveCategories(activity) {
    if (activeCategories.length === 0) return true;

    return activity.categories.some((category) =>
      activeCategories.includes(category.name)
    );
  }
  const filteredCategories = activities.filter(matchesActiveCategories);
  const activitiesToShow = search ? searchResults : filteredCategories;

  if (filteredCategories.length === 0) {
    return <p>No activities found for this category.</p>;
  }

  return (
    <>
      {activitiesToShow?.map((activity) => {
        return (
          <ActivityCard
            key={activity._id}
            id={activity._id}
            title={activity.title}
            categories={activity.categories}
          />
        );
      })}
    </>
  );
}
