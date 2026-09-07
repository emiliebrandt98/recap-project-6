import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

export default function ActivityForm({ isEditing, activities }) {
  const { mutate } = useSWRConfig();
  const [countLetters, setCounLetters] = useState("");
  const router = useRouter();
  const { id } = router.query;

  // Die Activity finden, die gerade bearbeitet wird
  const activity = activities?.find((activity) => activity._id === id);

  // Alte Description beim Editieren in den State laden
  useEffect(() => {
    if (isEditing && activity) {
      setCounLetters(activity.description || "");
    }
  }, [isEditing, activity]);

  // Alle Kategorien aus allen Activities holen und Duplikate entfernen
  const categories = [
    ...new Map(
      (activities || [])
        .flatMap((activity) => activity.categories || [])
        .map((category) => [category._id, category])
    ).values(),
  ];

  async function handleActivity(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = isEditing
      ? await fetch(`/api/activities/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      : await fetch("/api/activities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

    if (!response.ok) {
      console.log(
        isEditing ? "Error updating activity" : "Error creating activity"
      );
      return;
    }

    mutate();

    event.target.reset();

    if (isEditing) {
      router.push(`/activities/${id}`);
    } else {
      router.push("/");
    }
  }

  return (
    <Form onSubmit={handleActivity}>
      <h1>{isEditing ? "Edit Activity" : "Create new Activity"}</h1>

      <label htmlFor="title">
        Title <small>(required)</small>
      </label>

      <Input
        defaultValue={activity?.title || ""}
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
          value={countLetters}
          rows={8}
          maxLength={150}
          placeholder="Describe your activity ..."
          onChange={(event) => setCounLetters(event.target.value)}
        />

        <LetterCount>{150 - countLetters.length} Letters left</LetterCount>
      </TextContainer>

      <label htmlFor="category">Category</label>

      <Select
        id="category"
        name="category"
        defaultValue={activity?.categories?.[0]?._id || ""}
      >
        <option value="">Please select a category</option>

        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </Select>

      <label htmlFor="area">Area</label>

      <Input
        defaultValue={activity?.area || ""}
        id="area"
        name="area"
        placeholder="Which area does your activity belong to?"
      />

      <label htmlFor="country">Country</label>

      <Input
        defaultValue={activity?.country || ""}
        id="country"
        name="country"
        placeholder="Which country does your activity belong to?"
      />

      <Button type="submit">
        {isEditing ? "Update Activity" : "Create new Activity"}
      </Button>
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

const Select = styled.select`
  padding: 8px;
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
