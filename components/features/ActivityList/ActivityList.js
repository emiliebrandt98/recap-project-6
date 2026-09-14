import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";
import { useState } from "react";
import { Search } from "lucide-react";
import styled from "styled-components";

export default function ActivityList({
  activities,
  isFavorite,
  onToggle,
  activeCategories,
}) {
  const [search, setSearch] = useState("");

  const searchActivities = activities?.filter((activity) =>
    activity.title.toLowerCase().includes(search.toLowerCase())
  );

  const suggestions = searchActivities?.filter((activity) =>
    activity.title.toLowerCase().startsWith(search.toLowerCase())
  );

  if (!activities || activities.length === 0) {
    return <p>No activities found.</p>;
  }

  function matchesActiveCategories(activity) {
    if (activeCategories.length === 0) return true;

    return activity.categories.some((category) =>
      activeCategories.includes(category.name)
    );
  }

  const filteredCategories = activities.filter(matchesActiveCategories);

  if (filteredCategories.length === 0) {
    return <p>No activities found for this category.</p>;
  }

  const activitiesToShow = search ? suggestions : filteredCategories;

  return (
    <>
      <label htmlFor="search">Search activities</label>

      <SearchContainer>
        <Search size={20} />

        <input
          id="search"
          name="search"
          placeholder="Search for Activities"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </SearchContainer>

      {activitiesToShow.map((activity) => {
        return (
          <ActivityCard
            key={activity._id}
            id={activity._id}
            title={activity.title}
            categories={activity.categories}
          />
        );
      })}
    </>
  );
}
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px 12px;
  width: 300px;

  input {
    border: none;
    outline: none;
    width: 100%;
  }
`;
