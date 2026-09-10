import { useState } from "react";
import styled from "styled-components";
import { X, Check } from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import CategorySelect from "@/components/ui/CategorySelect/CategorySelect";
import Toast from "@/components/ui/Toast/Toast";
import { useUpdateDefaultValues } from "@/hooks/useUpdateDefaultValues";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/Button/Button.js";

export default function ActivityForm({ isEditing, activities, onSubmit, id }) {
  const { data: allCategories } = useSWR("/api/categories");
  const [errorValidation, setErrorValidation] = useState("");
  const [saveError, setSaveError] = useState("");

  // ––– Select and Description
  const activityID = activities?.find((activity) => activity._id === id);
  const {
    description,
    setDescription,
    selectedCategories,
    setSelectedCategories,
  } = useUpdateDefaultValues(activityID, allCategories);

  const handleSelectedCategories = (selected) => {
    if (selected && selected.length > 3) {
      setErrorValidation("Maximum number of categories selected.");
      return;
    }
    setErrorValidation("");
    setSelectedCategories(selected || []);
  };

  async function handleSubmitActivity(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.categories = selectedCategories.map(
      (categoryOption) => categoryOption.value
    );

    if (data.categories.length < 1) {
      setErrorValidation("Please select at least 1 category.");
      return;
    }

    setErrorValidation("");

    try {
      onSubmit(data);
    } catch (error) {
      setSaveError(error.message);
    }
  }
  return (
    <Form onSubmit={handleSubmitActivity}>
      {saveError && (
        <Toast
          type="error"
          message={saveError}
          onCloseToast={() => setSaveError("")}
        />
      )}
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
        required
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

      {errorValidation && <Validation>{errorValidation}</Validation>}

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

const Validation = styled.p`
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  text-align: center;
  color: #721c24;
  background-color: #f8d7da;

  animation: shake 0.4s ease-in-out;

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20%,
    60% {
      transform: translateX(-8px);
    }
    40%,
    80% {
      transform: translateX(8px);
    }
  }
`;
