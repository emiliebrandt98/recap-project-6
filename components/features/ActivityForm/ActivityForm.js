import styled from "styled-components";
import { useState } from "react";
import { X, Check } from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import CategorySelect from "@/components/ui/CategorySelect/CategorySelect";
import { useUpdateDefaultValues } from "@/hooks/useUpdateDefaultValues";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/Button/Button.js";
import { toast } from "react-toastify";
import ActivityImageInput from "../ActivityImageInput/ActivityImageInput";
import { useImage } from "@/hooks/useImage";

export default function ActivityForm({ isEditing, activities, onSubmit, id }) {
  const { data: allCategories } = useSWR("/api/categories");
  const [imageRemoved, setImageRemoved] = useState(false);

  // Select and Description
  const activityID = activities?.find((activity) => activity._id === id);
  const {
    description,
    setDescription,
    selectedCategories,
    setSelectedCategories,
    existingImageUrl,
    existingPublicId,
  } = useUpdateDefaultValues(activityID, allCategories);

  const handleSelectedCategories = (selected) => {
    if (selected && selected.length > 3) {
      toast.error("You can select a maximum of 3 categories.");
      return;
    }

    setSelectedCategories(selected || []);
  };

  // Image
  const { uploadImage, deleteImage } = useImage();

  async function handleSubmitActivity(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    //categories
    data.categories = selectedCategories.map(
      (categoryOption) => categoryOption.value
    );

    if (data.categories.length < 1) {
      toast.error("Please select at least 1 category.");
      return;
    }

    //image
    const imageFile = formData.get("image");

    try {
      if (imageFile && imageFile.size > 0) {
        const { imageUrl, public_id } = await uploadImage(
          formData,
          existingPublicId
        );

        data.imageUrl = imageUrl;
        data.imagePublicId = public_id;
      } else if (imageRemoved) {
        await deleteImage(existingPublicId);

        data.imageUrl = "/assets/placeholder.jpg";
        data.imagePublicId = null;
      } else {
        data.imageUrl = activityID?.imageUrl ?? "/assets/placeholder.jpg";
        data.imagePublicId = activityID?.imagePublicId ?? null;
      }

      delete data.image;
      await onSubmit(data);
    } catch (error) {
      console.error({ status: error.message });
      toast.error("Image upload failed");
    }
  }

  return (
    <Form onSubmit={handleSubmitActivity}>
      <h1>{isEditing ? "Edit Activity" : "Create new Activity"}</h1>

      <label htmlFor="title">
        Title <small>(required)</small>
      </label>

      <Input
        defaultValue={activityID?.title}
        id="title"
        name="title"
        placeholder="Name for your activity"
        required
      />

      <TextContainer>
        <label htmlFor="description">Description</label>

        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={8}
          maxLength={400}
          placeholder="Describe your activity ..."
        />

        <LetterCount>{400 - description.length} Letters left</LetterCount>
      </TextContainer>

      <label htmlFor="category">
        Category <small>(required)</small>
      </label>
      <small>You can select a maximum of 3 categories.</small>
      <CategorySelect
        value={selectedCategories}
        onChange={handleSelectedCategories}
        placeholder="Please select a Category"
      />

      <label htmlFor="area">Area</label>

      <Input
        defaultValue={activityID?.area}
        id="area"
        name="area"
        placeholder="Which area does your activity belong to?"
      />

      <label htmlFor="country">Country</label>

      <Input
        defaultValue={activityID?.country}
        id="country"
        name="country"
        placeholder="Which country does your activity belong to?"
      />

      <ActivityImageInput
        existingImageUrl={existingImageUrl}
        imageRemoved={imageRemoved}
        onImageRemoved={setImageRemoved}
      />

      <PrimaryButton
        type="submit"
        buttonText={isEditing ? "Update Activity" : "Create new Activity"}
        Icon={Check}
      />
      <Link href={isEditing ? `/activities/${id}` : "/"}>
        <SecondaryButton type="button" buttonText={"Cancel"} Icon={X} />
      </Link>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: auto;
`;

const Input = styled.input`
  padding: 8px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  min-height: 150px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LetterCount = styled.p`
  font-size: small;
  align-self: flex-end;
  margin: 0;
  margin-right: 5px;
`;
