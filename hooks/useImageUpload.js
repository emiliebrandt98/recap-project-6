import { useState } from "react";
import { toast } from "react-toastify";

export function useImageUpload(activityID) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPlaceholderActive, setIsPlaceholderActive] = useState(false);

  const hasRealImage =
    activityID?.imageUrl && !activityID.imageUrl.includes("placeholder.jpg");
  const showExistingImage = hasRealImage && !previewUrl && !isPlaceholderActive;

  function handleImageChange(event) {
    setPreviewUrl(event.target.files[0]);
    setIsPlaceholderActive(false);
  }

  function handleRemoveImage() {
    setPreviewUrl(null);
    setIsPlaceholderActive(true);

    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
  }

  async function handleImageSubmit(formData) {
    const imageFile = formData.get("image");

    if (isPlaceholderActive) {
      return {
        imageUrl: "/assets/placeholder.jpg",
        public_id: null,
      };
    }

    if (imageFile && imageFile.size > 0) {
      try {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          toast.error("Image upload failed.");
          return;
        }

        const { imageUrl, public_id } = await uploadResponse.json();
        return { imageUrl, public_id };
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
    } else {
      return {
        imageUrl: activityID?.imageUrl || "/assets/placeholder.jpg",
        public_id: activityID?.imagePublicId || null,
      };
    }
  }
  return {
    previewUrl,
    showExistingImage,
    handleImageChange,
    handleImageSubmit,
    handleRemoveImage,
  };
}
