import { useState } from "react";

export function useImage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function uploadImage(formData, oldPublicId = null) {
    setIsUploading(true);

    try {
      if (oldPublicId) {
        formData.append("oldPublicId", oldPublicId);
      }

      const response = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed.");
      }

      return await response.json();
    } finally {
      setIsUploading(false);
    }
  }

  async function deleteImage(publicId) {
    if (!publicId) return;

    setIsDeleting(true);

    try {
      const response = await fetch("/api/image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        throw new Error("Image deletion failed.");
      }

      return true;
    } finally {
      setIsDeleting(false);
    }
  }

  return {
    uploadImage,
    deleteImage,
    isUploading,
    isDeleting,
  };
}
