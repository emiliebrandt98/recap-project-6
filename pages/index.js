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
  const searchActivities = activities?.filter((activity) =>
    activity.title.toLowerCase().includes(search.toLowerCase())
  );

  const searchResults = searchActivities?.filter((activity) =>
    activity.title.toLowerCase().startsWith(search.toLowerCase())
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
      <ActivityList
        activities={activities}
        activeCategories={activeCategories}
        search={search}
        searchResults={searchResults}
      />
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
