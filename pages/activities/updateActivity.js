import ActivityForm from "@/components/ActivityForm";

export default function UpdateAcitvity({ isEditing, activities }) {
  return <ActivityForm isEditing={isEditing} activities={activities} />;
}
