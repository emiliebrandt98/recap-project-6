import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";
import styled from "styled-components";

export default function ActivityList({ activities }) {
  if (!activities || activities.length === 0) {
    return <p>This activity does not exist. Please try again.</p>;
  }

  return (
    <ActivityListWrapper>
      {activities.map((activity) => {
        return (
          <ActivityCard
            key={activity._id}
            id={activity._id}
            title={activity.title}
            categories={activity.categories}
            activity={activity}
            imageUrl={activity.imageUrl}
          />
        );
      })}
    </ActivityListWrapper>
  );
}
const ActivityListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(311px, 1fr));
  gap: var(--spacing-l);
  width: 100%;
`;
