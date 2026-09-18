import ActivityList from "@/components/features/ActivityList/ActivityList";
import useFavorites from "@/hooks/useFavorites";
import styled from "styled-components";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import Filter from "@/components/features/Filter/Filter";
import sortActivitiesByDate from "@/lib/activities/sortActivitiesByDate";
import {
  matchesActiveCategories,
  matchesSearch,
} from "@/lib/activities/filterActivities";

export default function FavoriteActivities({
  activities,
  isLoading,
  activeCategories,
  onApply,
  search,
  onSearch,
  sortOrder,
  onSetOrder,
}) {
  const { isFavorite } = useFavorites();

  const favoriteActivities =
    activities?.filter((activity) => isFavorite.includes(activity._id)) ?? [];

  if (isLoading) {
    return <p>Loading....</p>;
  }

  const filteredFavorites = favoriteActivities.filter(
    (activity) =>
      matchesActiveCategories(activity, activeCategories) &&
      matchesSearch(activity, search)
  );

  const sortedFavorites = sortActivitiesByDate(filteredFavorites, sortOrder);

  if (favoriteActivities.length === 0) {
    return <p>No Favorites.</p>;
  }

  return (
    <>
      <h1>Favorite Activities</h1>

      <SearchFilterWrapper>
        <SearchBar search={search} onSearch={onSearch} />
        <Filter
          activeCategories={activeCategories}
          onApply={onApply}
          activeSortOrder={sortOrder}
          onApplySort={onSetOrder}
        />
      </SearchFilterWrapper>

      {sortedFavorites.length === 0 ? (
        <p>No matching favorite activities found.</p>
      ) : (
        <ActivityList activities={sortedFavorites} />
      )}
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
