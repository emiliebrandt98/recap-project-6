import { useRouter } from "next/router";
import useSWR from "swr";
import LinkTo from "@/components/LinkTo";
import ActivityInfo from "@/components/ActivityInfo";
import { X } from "lucide-react";
import { SecondaryButton } from "@/components/Button/Button";
import { useState } from "react";
import DeleteActivityConfirmation from "@/components/DeleteActivityConfirmation/DeleteActivityConfirmation";

export default function ActivityDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const {
    data: activity,
    isLoading,
    error,
  } = useSWR(id ? `/api/activities/${id}` : null);

  async function handleDeleteActivity() {
    const response = await fetch(`/api/activities/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error(response.status);
    }
  }

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

  if (!activity) {
    return null;
  }

  return (
    <main>
      <LinkTo pathname={"/"} />
      <ActivityInfo activity={activity} />
      {isConfirmingDelete ? (
        <DeleteActivityConfirmation
          onDeleteConfirm={handleDeleteActivity}
          onCancel={() => setIsConfirmingDelete(false)}
        />
      ) : (
        <SecondaryButton
          type="button"
          onClick={() => setIsConfirmingDelete(true)}
          buttonText={"Delete Activity"}
          Icon={X}
        />
      )}
    </main>
  );
}
