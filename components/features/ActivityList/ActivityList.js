import styled from "styled-components";
import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";

export default function ActivityList({ activities }) {
  if (!activities || activities.length === 0) {
    return <p>No activities found.</p>;
  }

  return (
    <div>
      <StyledHeader>Activities Planner</StyledHeader>
      <StyledCards>
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
      </StyledCards>
    </div>
  );
}

const StyledHeader = styled.h1`
  font-family: var(--headline-Text);
  font-weight: 700;
  color: var(--color-Headline);
  text-align: center;
`;

const StyledCards = styled.div`
  font-family: var(--ui-Text);
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
