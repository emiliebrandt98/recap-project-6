import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { X, Check } from "lucide-react";
import useSWR from "swr";
import CategorySelect from "@/components/ui/CategorySelect/CategorySelect";
import Toast from "@/components/ui/Toast/Toast";
import { usePrefillActivity } from "@/hooks/usePrefillActivity";
import { useSaveActivity } from "@/hooks/useSaveActivity";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/Button/Button.js";

export default function ActivityForm({ isEditing = false, activities }) {
  const { data: allCategories } = useSWR("/api/categories");
  const router = useRouter();
  const { id } = router.query;

  const activityID = activities?.find((activity) => activity._id === id);

  // –––––– hooks for prefill and save

  const {
    description,
    setDescription,
    selectedCategories,
    setSelectedCategories,
  } = usePrefillActivity(activityID, allCategories);

  const { saveActivity } = useSaveActivity({ isEditing, id });

  // –––––– error handling and validation

  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");

  const handleSelectedCategories = (selected) => {
    if (selected && selected.length > 3) {
      setError("You can select a maximum of 3 categories.");
      return;
    }
    setError("");
    setSelectedCategories(selected || []);
  };

  // –––––– handle submit for create and update/edit

  async function handleActivity(event) {
    event.preventDefault();

    if (selectedCategories.length === 0) {
      setError("Please select at least 1 category.");
      return;
    }

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.categories = selectedCategories.map(
      (categoryOption) => categoryOption.value
    );

    try {
      await saveActivity(data);
      event.target.reset();
    } catch (error) {
      setSaveError(error.message);
    }

    if (data.categories.length < 1) {
      setError("Please select at least 1 category.");
      return;
    }
  }

  return (
    <Form onSubmit={handleActivity}>
      {saveError && (
        <Toast
          type="error"
          message={saveError}
          onClose={() => setSaveError("")}
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
        required
        placeholder="Name for your activity"
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

      <CategorySelect
        value={selectedCategories}
        onChange={handleSelectedCategories}
        placeholder="Please select a Category (max 3)"
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

      {error && <p>{error}</p>}

      <PrimaryButton
        type="submit"
        buttonText={isEditing ? "Update Activity" : "Create new Activity"}
        Icon={Check}
      />

      <SecondaryButton
        type="button"
        onClick={() => router.push(isEditing && id ? `/activities/${id}` : "/")}
        buttonText={"Cancel"}
        Icon={X}
      />
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

const Button = styled.button`
  padding: 8px;
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
