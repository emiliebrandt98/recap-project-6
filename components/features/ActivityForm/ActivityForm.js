import styled, { css } from "styled-components";
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
import DateInnput from "../Datepicker/Datepicker";
import useDate from "@/hooks/useDate";
import ActivityImageInput from "../ActivityImageInput/ActivityImageInput";
import { useImage } from "@/hooks/useImage";
import { getCoordinates } from "@/lib/geocode";

export default function ActivityForm({ isEditing, activities, onSubmit, id }) {
  const { data: allCategories } = useSWR("/api/categories");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const { startDate, endDate, setStartDate, setEndDate } = useDate(activityID);

  const handleSelectedCategories = (selected) => {
    if (selected && selected.length > 3) {
      toast.error("You can select a maximum of 3 categories.");
      return;
    }

    setSelectedCategories(selected || []);
  };

  const { uploadImage, deleteImage } = useImage();

  async function handleSubmitActivity(event) {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.startDate = startDate;
    data.endDate = endDate;

    data.categories = selectedCategories.map(
      (categoryOption) => categoryOption.value
    );

    if (data.categories.length < 1) {
      toast.error("Please select at least 1 category.");
      setIsLoading(false);
      return;
    }

    if (endDate < startDate) {
      toast.error("The end date cannot be before the start date.");
      setIsLoading(false);
      return;
    }

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
    } catch (error) {
      console.error({ message: error.message });
      toast.error("Image upload failed");
      setIsLoading(false);
      return;
    }

    try {
      const coordinates = await getCoordinates(data.area, data.country);

      if (!coordinates) {
        toast.error(
          `Could not find the location for ${data.area}, ${data.country}.`
        );
        setIsLoading(false);
        return;
      }

      data.latitude = coordinates.latitude;
      data.longitude = coordinates.longitude;
    } catch (error) {
      console.error({ message: error.message });
      toast.error("Something went wrong while looking up the location.");
      setIsLoading(false);
      return;
    }

    delete data.image;
    await onSubmit(data);
  }

  return (
    <Form onSubmit={handleSubmitActivity}>
      <Fieldset>
        <legend>Activity Basics</legend>

        <LabelInputWrapper>
          <label htmlFor="title">
            Activity Title <small>(required)</small>
          </label>

          <Input
            defaultValue={activityID?.title}
            id="title"
            name="title"
            placeholder="e.g. Sunset Yoga at the Beach"
            required
          />
        </LabelInputWrapper>

        <LabelInputWrapper>
          <label htmlFor="category">
            Category <small>(required)</small>
          </label>

          <small>Select up to 3 categories</small>

          <CategorySelect
            value={selectedCategories}
            onChange={handleSelectedCategories}
            placeholder="Please select a Category"
          />
        </LabelInputWrapper>
      </Fieldset>

      <Fieldset>
        <legend>Additional Information</legend>

        <LabelInputWrapper>
          <label htmlFor="description">About this activity</label>

          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={8}
            maxLength={400}
            placeholder="Share details, what to bring, or what to expect ..."
          />

          <LetterCount>{400 - description.length} Letters left</LetterCount>
        </LabelInputWrapper>

        <LabelInputWrapper>
          <label htmlFor="image">Image</label>

          <small>Add 1 nice photo for your activity</small>

          <ActivityImageInput
            existingImageUrl={existingImageUrl}
            imageRemoved={imageRemoved}
            onImageRemoved={setImageRemoved}
          />
        </LabelInputWrapper>
      </Fieldset>

      <Fieldset>
        <legend>Date</legend>

        <DateInnput
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Fieldset>

      <Fieldset>
        <legend>Location</legend>

        <small>A map is shown when area and country is provided.</small>

        <LabelInputWrapper>
          <label htmlFor="area">Area</label>

          <Input
            defaultValue={activityID?.area}
            id="area"
            name="area"
            placeholder="Which area does your activity belong to?"
          />
        </LabelInputWrapper>

        <LabelInputWrapper>
          <label htmlFor="country">Country</label>

          <Input
            defaultValue={activityID?.country}
            id="country"
            name="country"
            placeholder="Which country does your activity belong to?"
          />
        </LabelInputWrapper>
      </Fieldset>

      <ButtonWrapper>
        <PrimaryButton
          type="submit"
          buttonText={
            isLoading
              ? "Saving..."
              : isEditing
                ? "Update Activity"
                : "Create new Activity"
          }
          Icon={Check}
        />
        <Link href={isEditing ? `/activities/${id}` : "/"}>
          <SecondaryButton type="button" buttonText={"Cancel"} Icon={X} />
        </Link>
      </ButtonWrapper>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  border: none;

  legend {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: var(--spacing-s);
    background-color: var(--color-primary-hover-2);
    padding: var(--padding-ml) var(--padding-m);
    width: 100%;
    border-radius: var(--border-radius-s);
    margin-bottom: var(--spacing-m);
  }
`;

const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);

  label {
    font-weight: 600;
    font-size: 1rem;
    color: var(--font-text-dark);

    small {
      color: var(--color-grey-dark);
    }
  }

  small {
    color: var(--color-grey-dark);
  }
`;

const sharedInputStyles = css`
  width: 100%;
  padding: var(--padding-ml) var(--padding-m);
  border-radius: var(--border-radius-s);
  border: 1px solid var(--color-grey-dark);
  background-color: transparent;

  &::placeholder {
    color: var(--color-grey-dark);
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Input = styled.input`
  ${sharedInputStyles}
`;

const Textarea = styled.textarea`
  ${sharedInputStyles}
  min-height: 150px;
`;

const LetterCount = styled.p`
  font-size: 0.75rem;
  align-self: flex-end;
  color: var(--color-grey-dark);
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);

  a {
    width: 100%;
    text-decoration: none;
  }
`;
