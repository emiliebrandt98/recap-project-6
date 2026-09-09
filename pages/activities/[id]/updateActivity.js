import ActivityForm from "@/components/features/ActivityForm/ActivityForm.js";

export default function UpdateActivity({ activities }) {
  return (
    <main>
      <ActivityForm isEditing={true} activities={activities} />
    </main>
  );
}
