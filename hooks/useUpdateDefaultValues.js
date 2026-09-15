import { useState, useEffect } from "react";

export function useUpdateDefaultValues(activityID, allCategories) {
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [existingPublicId, setExistingPublicId] = useState(null);

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

  useEffect(() => {
    if (activityID?.imageUrl) {
      setExistingImageUrl(activityID.imageUrl);
    }
  }, [activityID]);

  useEffect(() => {
    if (activityID?.imagePublicId) {
      setExistingPublicId(activityID.imagePublicId);
    }
  }, [activityID]);

  return {
    description,
    setDescription,
    selectedCategories,
    setSelectedCategories,
    existingImageUrl,
    existingPublicId,
  };
}
