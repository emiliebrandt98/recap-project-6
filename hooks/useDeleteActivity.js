import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

export function useDeleteActivity(activityId) {
  const router = useRouter();

  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    if (!activityId) return null;

    setIsDeleting(true);
    setError(null);

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
      setError("Activity could not be deleted. Please try again.");
      setIsDeleting(false);
      setIsConfirming(false);
    }
  }

  return {
    isConfirming,
    setIsConfirming,
    isDeleting,
    error,
    handleDelete,
  };
}
