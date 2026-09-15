import ActivityList from "@/components/features/ActivityList/ActivityList.js";
import { PrimaryButton } from "@/components/ui/Button/Button.js";
import { mutate } from "swr";
import CategoryFilter from "@/components/features/CategoryFilter/CategoryFilter";
import { useState } from "react";
import styled from "styled-components";
import SearchBar from "@/components/ui/SearchBar/SearchBar";

export default function HomePage({ activities, isLoading, error }) {
  const [activeCategories, setActiveCategories] = useState([]);
  const [search, setSearch] = useState("");

  function matchesActiveCategories(activity) {
    if (activeCategories?.length === 0) return true;

    return activity.categories.some((category) =>
      activeCategories?.includes(category.name)
    );
  }

  function matchesSearch(activity) {
    return activity.title.toLowerCase().includes(search.toLowerCase());
  }

  const filteredActivities = activities?.filter(
    (activity) => matchesActiveCategories(activity) && matchesSearch(activity)
  );

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
      <SearchContainer>
        <SearchBar search={search} onSearch={setSearch} />
        <CategoryFilter
          activeCategories={activeCategories}
          onApply={setActiveCategories}
        />
      </SearchContainer>
      <ActivityList activities={filteredActivities} />
    </>
  );
}
const StyledHeader = styled.h1`
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
