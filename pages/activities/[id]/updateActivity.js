import ActivityForm from "@/components/features/ActivityForm/ActivityForm.js";

export default function UpdateActivity({ activities }) {
  return (
    <>
      <ActivityForm isEditing={true} activities={activities} />
    </>
  );
}
