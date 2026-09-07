import AcitityForm from "@/components/ActivityForm";

export default function ActivityForm({ isEditing, activities }) {
  return (
    <>
      <AcitityForm isEditing={isEditing} activities={activities} />
    </>
  );
}
