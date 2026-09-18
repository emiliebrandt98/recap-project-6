import styled from "styled-components";
import { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import { GreyIconButton } from "@/components/ui/Button/Button.js";

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
    <ImageInputWrapper>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
      />

      {!displayedImageUrl && (
        <UploadButton
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={16} />
          <span>Choose image</span>
        </UploadButton>
      )}

      {displayedImageUrl && (
        <PreviewContainer>
          <StyledRemoveButton
            type="button"
            onClick={handleRemoveImage}
            ariaLabel="Remove image"
            Icon={X}
          />
          <PreviewImage
            src={displayedImageUrl}
            alt="Preview of selected image"
          />
        </PreviewContainer>
      )}
    </ImageInputWrapper>
  );
}

const ImageInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacing-m);
  align-items: flex-start;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
  padding: var(--padding-m) var(--padding-ml);
  background-color: var(--color-grey-light);
  color: var(--font-text-dark);
  border: 1px dashed var(--color-grey-dark);
  border-radius: var(--border-radius-s);
  cursor: pointer;
  font-size: 0.75rem;

  &:hover {
    background-color: var(--color-accent);
  }
`;

const PreviewContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 300px;
`;

const PreviewImage = styled.img`
  display: block;
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: var(--border-radius-m);
`;

const StyledRemoveButton = styled(GreyIconButton)`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
`;
