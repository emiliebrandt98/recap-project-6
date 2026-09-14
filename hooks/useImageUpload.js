import { useState } from "react";
import { toast } from "react-toastify";

export function useImageUpload(activityID) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const hasRealImage =
    activityID?.imageUrl && !activityID.imageUrl.includes("placeholder.jpg");
  const showExistingImage = hasRealImage && !previewUrl;

  function handleImageChange(event) {
    setPreviewUrl(event.target.files[0]);
  }

  async function handleImageSubmit(formData) {
    const imageFile = formData.get("image");

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

        const { imageUrl } = await uploadResponse.json();
        return imageUrl;
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
    } else {
      return activityID?.imageUrl || "/assets/placeholder.jpg";
    }
  }
  return {
    previewUrl,
    showExistingImage,
    handleImageChange,
    handleImageSubmit,
  };
}
