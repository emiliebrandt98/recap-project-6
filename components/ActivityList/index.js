import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";
import ActivityCard from "../ActivityCard/ActivityCard";
import SuccessToast from "../SuccessToast/SuccessToast";

export default function ActivityList() {
  const router = useRouter();
  const { deleted } = router.query;
  const { data: activities, error, isLoading } = useSWR("/api/activities");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  function handleCloseToast() {
    // Remove the parameter from the URL when the toast disappears
    router.replace("/", undefined, { shallow: true });
  }

  return (
    <div>
      {deleted && (
        <SuccessToast
          message="Activity deleted successfully!"
          duration={3000}
          onClose={handleCloseToast}
        />
      )}

      <StyledHeader>Activities List</StyledHeader>
      <ActivityCard activities={activities} />
    </div>
  );
}

const StyledHeader = styled.h1`
  text-align: center;
`;
