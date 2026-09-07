import styled from "styled-components";
import ActivityCard from "../ActivityCard/ActivityCard";

export default function ActivityList({ activities }) {


  return (
    <div>
      <StyledHeader>Activities List</StyledHeader>
      <ActivityCard activities={activities} />
    </div>
  );
}

const StyledHeader = styled.h1`
  text-align: center;
`;
