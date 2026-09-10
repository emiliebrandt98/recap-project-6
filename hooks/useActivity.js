import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useState } from "react";

export function useActivity() {
  const router = useRouter();
  const { id } = router.query;

  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const { data, error, isLoading } = useSWR(
    router.isReady && id ? `/api/activities/${id}` : null
  );

  async function handleDelete(activityId = id) {
    if (!activityId) return null;

    setIsDeleting(true);
    setDeleteError("");

    try {
      const response = await fetch(`/api/activities/${activityId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Deletion failed");
      }

      await mutate("/api/activities");
      router.push({ pathname: "/", query: { deleted: "true" } });
    } catch (error) {
      setDeleteError("Activity could not be deleted. Please try again.");
      setIsDeleting(false);
      setIsConfirming(false);
    }
  }
  return {
    activity: data,
    isLoading: isLoading,
    error,
    id,
    isConfirming,
    setIsConfirming,
    isDeleting,
    handleDelete,
  };
}
