import styled from "styled-components";
import LinkTo from "@/components/ui/LinkTo/LinkTo.js";
import ActivityInfo from "@/components/features/ActivityInfo/ActivityInfo.js";
import { X, Pencil } from "lucide-react";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/Button/Button.js";
import DeleteConfirmation from "@/components/ui/DeleteConfirmation/DeleteConfirmation.js";
import { useActivity } from "@/hooks/useActivity";
import { useRouter } from "next/router";

export default function ActivityDetailsPage() {
  const router = useRouter();

  const {
    isConfirming,
    setIsConfirming,
    handleDelete,
    activity,
    isLoading,
    error,
  } = useActivity();

  if (isLoading) {
    return (
      <>
        <LinkTo pathname={"/"} />
        <StyledMessage>Loading your page. Just a second.</StyledMessage>
      </>
    );
  }

  if (error) {
    return (
      <>
        <LinkTo pathname={"/"} />
        <StyledMessage>
          Sorry we couldn't retrieve the activity at the moment. Please try
          again later.
        </StyledMessage>
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

          {isConfirming && (
            <DeleteConfirmation
              onDeleteConfirm={() => handleDelete()}
              onCancel={() => setIsConfirming(false)}
            />
          )}
        </StyledButtons>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.main`
  width: min(80vw, 22rem);
  padding: 10px;

  border: black solid 3px;
`;

const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-Text-White);
  margin-top: 20px;
  gap: 5px;
`;

const StyledMessage = styled.p`
  text-align: center;
`;
