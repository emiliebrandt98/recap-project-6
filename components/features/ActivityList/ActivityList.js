import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";
import { act } from "react";

export default function ActivityList({ activities }) {
  if (!activities || activities.length === 0) {
    return <p>This activity does not exist. Please try again.</p>;
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
            startDate={activity.startDate}
            endDate={activity.endDate}
            activity={activity}
          />
        );
      })}
    </>
  );
}
