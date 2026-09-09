import ActivityForm from "@/components/ActivityForm";

export default function CreateActivity({ activities }) {
  return (
    <>
      <ActivityForm activities={activities} />
    </>
  );
}
