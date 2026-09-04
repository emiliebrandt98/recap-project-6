import Image from "next/image";
import useSWR from "swr";
import styled from "styled-components";
import ActivityCard from "../ActivityCard/ActivityCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ActivityList() {
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR("/api/activities", fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

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
