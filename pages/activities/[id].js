import { useRouter } from "next/router";
import useSWR from "swr";
import LinkTo from "@/components/LinkTo";
import ActivityInfo from "@/components/ActivityInfo";
import Link from "next/link";
import { X } from "lucide-react";
import { SecondaryButton } from "@/components/Button/Button";
import { useState } from "react";
import DeleteActivityConfirmation from "@/components/DeleteActivityConfirmation/DeleteActivityConfirmation";
import styled from "styled-components";
import { useSWRConfig } from "swr";

export default function ActivityDetails({ onEdit }) {
  const router = useRouter();
  const { id } = router.query;

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    data: activity,
    isLoading,
    error,
  } = useSWR(id ? `/api/activities/${id}` : null);

  async function handleDeleteActivity() {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(`/api/activities/${activity._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsConfirmingDelete(false);
        router.push({
          pathname: "/",
          query: { deleted: "true" },
        });
      } else {
        setDeleteError("Activity could not be deleted. Please try again.");
        setIsConfirmingDelete(false);
        setIsDeleting(false);
      }
    } catch (error) {
      setDeleteError("Network error. Please check your connection.");
      setIsConfirmingDelete(false);
      setIsDeleting(false);
    }

    mutate("/api/activities");
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
      <Link
        onClick={() => onEdit(true)}
        href={`/activities/updateActivity?id=${activity._id}`}
      >
        Update Acitvity
      </Link>

      <AlertText role="alert">{deleteError}</AlertText>

      {isConfirmingDelete ? (
        <DeleteActivityConfirmation
          onDeleteConfirm={handleDeleteActivity}
          onCancel={() => setIsConfirmingDelete(false)}
          isDeleting={isDeleting}
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

const AlertText = styled.p`
  color: "red";
  margin-top: "1rem";
`;
