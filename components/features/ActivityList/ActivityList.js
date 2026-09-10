import styled from "styled-components";
import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";
import { toast } from "react-toastify";
import { useActivity } from "@/hooks/useActivity";

export default function ActivityList({ activities }) {
  const { isDeleting } = useActivity;

  if (!activities || activities.length === 0) {
    return <p>No activities found.</p>;
  }

  return (
    <div>
      {toast.success(isDeleting && "Activity successfully deleted")}
      {toast.success(created && "Activity successfully created")}

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
