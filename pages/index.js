import ActivityList from "@/components/features/ActivityList/ActivityList.js";
import { PrimaryButton } from "@/components/ui/Button/Button.js";
import { mutate } from "swr";
import Filter from "@/components/features/Filter/Filter";
import styled from "styled-components";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import sortActivitiesByDate from "@/lib/activities/sortActivitiesByDate";
import {
  matchesActiveCategories,
  matchesSearch,
} from "@/lib/activities/filterActivities";

export default function HomePage({
  activities,
  isLoading,
  error,
  activeCategories,
  onApply,
  search,
  onSearch,
  sortOrder,
  onSetOrder,
}) {
  const filteredActivities = activities?.filter(
    (activity) =>
      matchesActiveCategories(activity, activeCategories) &&
      matchesSearch(activity, search)
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

  const activeActivities = sortActivitiesByDate(
    filteredActivities ?? [],
    sortOrder
  );

  return (
    <>
      <h1>Activities List</h1>

      <SearchFilterWrapper>
        <SearchBar search={search} onSearch={onSearch} />
        <Filter
          activeCategories={activeCategories}
          onApply={onApply}
          activeSortOrder={sortOrder}
          onApplySort={onSetOrder}
        />
      </SearchFilterWrapper>

      <ActivityList activities={activeActivities} />
    </>
  );
}

const SearchFilterWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: var(--spacing-m);
`;
