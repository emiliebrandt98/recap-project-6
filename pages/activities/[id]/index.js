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

      <ActivityInfo activity={activity} />

      <PrimaryButton
        type="button"
        buttonText={"Update Activity"}
        Icon={Pencil}
        onClick={() =>
          router.push(`/activities/${activity?._id}/updateActivity`)
        }
      />

      {isConfirming ? (
        <DeleteConfirmation
          onDeleteConfirm={() => handleDelete()}
          onCancel={() => setIsConfirming(false)}
        />
      ) : (
        <SecondaryButton
          type="button"
          onClick={() => setIsConfirming(true)}
          buttonText={"Delete Activity"}
          Icon={X}
        />
      )}
    </>
  );
}
