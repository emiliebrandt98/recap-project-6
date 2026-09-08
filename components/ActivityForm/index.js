import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import Select from "react-select";
import Link from "next/link";
import useSWR from "swr";

export default function ActivityForm({ isEditing, activities }) {
  const { data: allCategories } = useSWR("/api/categories");
  const [selectedCategories, setSelecttedCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const activityID = activities?.find((activity) => activity._id === id);

  useEffect(() => {
    if (activityID?.description) {
      setDescription(activityID.description);
    }
  }, [activityID]);

  useEffect(() => {
    if (activityID?.categories && allCategories) {
      const selected = allCategories
        .filter((category) =>
          activityID.categories.some(
            (categorieId) => String(categorieId._id) === String(category._id)
          )
        )
        .map((category) => ({
          value: category._id,
          label: category.name,
        }));

      setSelecttedCategories(selected);
    }
  }, [activityID, allCategories]);

  const selectedOptions = allCategories?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const handleSelectedCategories = (selected) => {
    if (selected && selected.length > 3) {
      setError("You can select a maximum of 3 categories.");
      return;
    }

    setSelecttedCategories(selected || []);
  };

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

    // Validierung vor dem Senden an die API
    if (data.categories.length < 1) {
      setError("Please select at least 1 category.");
      return;
    }

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

    mutate("/api/activities");

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

      <Select
        id="category"
        name="category"
        isMulti
        options={selectedOptions}
        value={selectedCategories}
        onChange={handleSelectedCategories}
        placeholder="Please select a Category (max 3)"
        //Text der angezeigt wird wenn keine verfügbaren Optionen zur Auswahl stehen
        noOptionsMessage={() => "No more categories."}
      />
      {error && <p>{error}</p>}

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

      <Button type="submit">
        {isEditing ? "Update Activity" : "Create new Activity"}
      </Button>
      <Link href={isEditing ? `/activities/${id}` : "/"}>
        <Button>Cancel</Button>
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
