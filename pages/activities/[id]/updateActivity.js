import ActivityForm from "@/components/features/ActivityForm/ActivityForm.js";
import { useRouter } from "next/router";
import { mutate } from "swr";

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
      return <p>"Error updating activity"</p>;
    }

    mutate(`/api/activities/${id}`);
    router.push({ pathname: `/activities/${id}`, query: { updated: "true" } });
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
