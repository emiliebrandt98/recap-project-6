import ActivityForm from "@/components/features/ActivityForm/ActivityForm.js";

export default function CreateActivity({ activities }) {
  return (
    <>
      <ActivityForm activities={activities} />
    </>
  );
}
