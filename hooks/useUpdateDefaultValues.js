import { useState, useEffect } from "react";

export function useUpdateDefaultValues(activityID, allCategories) {
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (activityID?.description) {
      setDescription(activityID.description);
    }
  }, [activityID]);

  useEffect(() => {
    if (activityID?.categories && allCategories) {
      const selected = allCategories
        .filter((category) =>
          activityID.categories.some(
            (categoryId) => String(categoryId._id) === String(category._id)
          )
        )
        .map((category) => ({
          value: category._id,
          label: category.name,
        }));

      setSelectedCategories(selected);
    }
  }, [activityID, allCategories]);

  return {
    description,
    setDescription,
    selectedCategories,
    setSelectedCategories,
  };
}
