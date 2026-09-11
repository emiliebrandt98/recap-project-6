import styled from "styled-components";
import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";

export default function ActivityList({ activities }) {
  if (!activities || activities.length === 0) {
    return <p>No activities found.</p>;
  }

  return (
    <div>
      <StyledHeader>Activities List</StyledHeader>

      {activities.map((activity) => {
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

const StyledHeader = styled.h1`
  text-align: center;
`;
