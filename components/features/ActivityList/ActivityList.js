import styled from "styled-components";
import { useRouter } from "next/router";
import ActivityCard from "@/components/features/ActivityCard/ActivityCard.js";
import Toast from "@/components/ui/Toast/Toast.js";

export default function ActivityList({ activities, onCloseToast }) {
  const router = useRouter();
  const { deleted, created } = router.query;

  return (
    <div>
      {deleted && (
        <Toast
          type="success"
          message="Activity deleted successfully!"
          duration={3000}
          onCloseToast={onCloseToast}
        />
      )}
      {created && (
        <Toast
          type="success"
          message="Activity created successfully!"
          duration={3000}
          onCloseToast={onCloseToast}
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
