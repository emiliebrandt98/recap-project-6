import styled from "styled-components";
import LinkTo from "@/components/ui/LinkTo/LinkTo.js";
import ActivityInfo from "@/components/features/ActivityInfo/ActivityInfo.js";
import { X, Pencil } from "lucide-react";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/Button/Button.js";
import DeleteDialog from "@/components/ui/DeleteDialog/DeleteDialog";
import { useActivity } from "@/hooks/useActivity";
import { useRouter } from "next/router";

export default function ActivityDetailsPage() {
  const router = useRouter();

  const {
    isConfirming,
    setIsConfirming,
    handleDelete,
    activity,
    isLoadingActivity,
    error,
  } = useActivity();

  if (isLoadingActivity) {
    return (
      <>
        <LinkTo pathname={"/"} />
        <p>Loading your page. Just a second.</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <LinkTo pathname={"/"} />
        <p>
          Sorry we couldn't retrieve the activity at the moment. Please try
          again later.
        </p>
      </>
    );
  }

  return (
    <>
      <LinkTo pathname={"/"} />

      <StyledContainer>
        <ActivityInfo activity={activity} />

        <StyledButtons>
          <PrimaryButton
            type="button"
            buttonText={"Update"}
            Icon={Pencil}
            onClick={() =>
              router.push(`/activities/${activity?._id}/updateActivity`)
            }
          />
          <SecondaryButton
            type="button"
            onClick={() => setIsConfirming(true)}
            buttonText={"Delete"}
            Icon={X}
          />

          <DeleteDialog
            isOpen={isConfirming}
            onClose={() => setIsConfirming(false)}
            onConfirm={handleDelete}
            title="Delete Activity"
            message="Do you really want to delete this activity?"
          />
        </StyledButtons>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
`;
