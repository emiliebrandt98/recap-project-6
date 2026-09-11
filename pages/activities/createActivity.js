import ActivityForm from "@/components/features/ActivityForm/ActivityForm.js";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { toast } from "react-toastify";

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
      toast.error("Error creating activity");
      return;
    }

    mutate("/api/activities");
    toast.success("Activity successfully created!");
    router.push("/");
  }

  return (
    <>
      <ActivityForm activities={activities} onSubmit={handleCreateSubmit} />
    </>
  );
}
