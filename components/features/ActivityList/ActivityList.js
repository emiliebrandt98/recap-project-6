import styled from "styled-components";
import { useRouter } from "next/router";
import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";
import Toast from "@/components/ui/Toast/Toast.js";

export default function ActivityList({ activities }) {
  const router = useRouter();
  const { deleted } = router.query;

  function handleCloseToast() {
    // Remove the parameter from the URL when the toast disappears
    router.replace("/", undefined, { shallow: true });
  }

  return (
    <div>
      {deleted && (
        <Toast
          type="success"
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
