import ActivityForm from "@/components/features/ActivityForm/ActivityForm.js";

export default function CreateActivity({ activities }) {
  return (
    <main>
      <ActivityForm activities={activities} />
    </main>
  );
}
