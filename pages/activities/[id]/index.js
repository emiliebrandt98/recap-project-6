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
import { useDeleteActivity } from "@/hooks/useDeleteActivity";
import { useRouter } from "next/router";
import Toast from "@/components/ui/Toast/Toast";

export default function ActivityDetailsPage({ onCloseToast }) {
  const router = useRouter();
  const { updated } = router.query;

  // –––––– hooks for fetch activity and delete

  const { activity, isLoading, error } = useActivity();
  const {
    isConfirming,
    setIsConfirming,
    isDeleting,
    error: deleteError,
    handleDelete,
  } = useDeleteActivity(activity?._id);

  if (isLoading) {
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
    <main>
      {updated && (
        <Toast
          type="success"
          message="Activity successfully updated!"
          duration={3000}
          onCloseToast={onCloseToast}
        />
      )}
      <LinkTo pathname={"/"} />

      <ActivityInfo activity={activity} />

      <PrimaryButton
        type="button"
        buttonText={"Update Activity"}
        Icon={Pencil}
        onClick={() =>
          router.push(`/activities/${activity?._id}/updateActivity`)
        }
      />

      {deleteError && <AlertText role="alert">{deleteError}</AlertText>}

      {isConfirming ? (
        <DeleteConfirmation
          onDeleteConfirm={handleDelete}
          onCancel={() => setIsConfirming(false)}
          isDeleting={isDeleting}
        />
      ) : (
        <SecondaryButton
          type="button"
          onClick={() => setIsConfirming(true)}
          buttonText={"Delete Activity"}
          Icon={X}
        />
      )}
    </main>
  );
}

const AlertText = styled.p`
  color: red;
  margin-top: 1rem;
`;
