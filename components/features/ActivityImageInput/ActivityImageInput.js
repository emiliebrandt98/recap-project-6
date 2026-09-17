import styled from "styled-components";
import { useState, useRef } from "react";
import { X } from "lucide-react";

export default function ActivityImageInput({
  existingImageUrl,
  imageRemoved,
  onImageRemoved,
}) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const isRealImage =
    existingImageUrl && existingImageUrl !== "/assets/placeholder.jpg";

  const displayedImageUrl = imageRemoved
    ? null
    : previewUrl || (isRealImage ? existingImageUrl : null);

  function handleImageChange(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
      onImageRemoved(false);
    } else {
      setPreviewUrl(null);
    }
  }

  function handleRemoveImage() {
    setPreviewUrl(null);
    onImageRemoved(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <>
      <label htmlFor="image">Image</label>

      <input
        ref={fileInputRef}
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
      />

      {displayedImageUrl && (
        <PreviewImage src={displayedImageUrl} alt="Preview of selected image" />
      )}

      {displayedImageUrl && displayedImageUrl !== "/assets/placeholder.jpg" && (
        <button
          type="button"
          onClick={handleRemoveImage}
          aria-label="Remove image"
        >
          <X size={16} />
        </button>
      )}
    </>
  );
}

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
`;
