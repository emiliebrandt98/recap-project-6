import { useRouter } from "next/router";
import { mutate } from "swr";

export function useSaveActivity({ isEditing, id }) {
  const router = useRouter();

  async function saveActivity(data) {
    const url = isEditing ? `/api/activities/${id}` : "/api/activities";
    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        isEditing ? "Error updating activity" : "Error creating activity"
      );
    }

    mutate("/api/activities");
    if (id) mutate(`/api/activities/${id}`);

    if (isEditing) {
      router.push({
        pathname: `/activities/${id}`,
        query: { updated: "true" },
      });
    } else {
      router.push({ pathname: "/", query: { created: "true" } });
    }
  }

  return { saveActivity };
}
