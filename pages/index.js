import ActivityList from "@/components/features/ActivityList/ActivityList.js";
import { PrimaryButton } from "@/components/ui/Button/Button.js";
import { mutate } from "swr";
import CategoryFilter from "@/components/features/CategoryFilter/CategoryFilter";
import { useState } from "react";
import styled from "styled-components";

export default function HomePage({ activities, isLoading, error }) {
  const [activeCategories, setActiveCategories] = useState([]);
  function matchesActiveCategories(activity) {
    if (activeCategories?.length === 0) return true;

    return activity.categories.some((category) =>
      activeCategories?.includes(category.name)
    );
  }

  const filteredActivities = activities?.filter(matchesActiveCategories);

  if (filteredActivities?.length === 0)
    return <p>No activities found for this category.</p>;

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <p>Error fetching data.</p>
        <PrimaryButton
          type="button"
          buttonText={"Try again"}
          onClick={() => mutate()}
        />
      </div>
    );

  return (
    <>
      <StyledHeader>Activities List</StyledHeader>
      <CategoryFilter
        activeCategories={activeCategories}
        onApply={setActiveCategories}
      />
      <ActivityList
        activities={filteredActivities}
        activeCategories={activeCategories}
      />
    </>
  );
}
const StyledHeader = styled.h1`
  text-align: center;
`;
