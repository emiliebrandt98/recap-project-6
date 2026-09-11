import ActivityForm from "@/components/features/ActivityForm/ActivityForm.js";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { toast } from "react-toastify";

export default function UpdateActivity({ activities }) {
  const router = useRouter();
  const { id } = router.query;

  async function handleUpdateSubmit(data) {
    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error("Error updating activity");
      return;
    }

    mutate(`/api/activities/${id}`);
    toast.success("Activity successfully updated!");
    router.push(`/activities/${id}`);
  }

  return (
    <>
      <ActivityForm
        onSubmit={handleUpdateSubmit}
        isEditing={true}
        activities={activities}
        id={id}
      />
    </>
  );
}
