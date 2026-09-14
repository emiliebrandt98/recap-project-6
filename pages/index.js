import ActivityList from "@/components/features/ActivityList/ActivityList.js";
import { PrimaryButton } from "@/components/ui/Button/Button.js";
import { mutate } from "swr";
import CategoryFilter from "@/components/features/CategoryFilter/CategoryFilter";
import { useState } from "react";
import styled from "styled-components";

export default function HomePage({ activities, isLoading, error }) {
  const [activeCategories, setActiveCategories] = useState([]);

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
        activities={activities}
        activeCategories={activeCategories}
      />
    </>
  );
}
const StyledHeader = styled.h1`
  text-align: center;
`;
