import ActivityForm from "@/components/features/ActivityForm/ActivityForm.js";
import { useRouter } from "next/router";
import { mutate } from "swr";

export default function CreateActivity({ activities }) {
  const router = useRouter();

  async function handleCreateSubmit(data) {
    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return <p>"Error creating activity"</p>;
    }

    mutate("/api/activities");
    router.push({ pathname: "/", query: { created: "true" } });
  }

  return (
    <>
      <ActivityForm activities={activities} onSubmit={handleCreateSubmit} />
    </>
  );
}
