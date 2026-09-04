import styled from "styled-components";
import { useState } from "react";

export default function ActivityForm() {
  const [countLetters, setCounLetters] = useState("");

  async function handleCreateActivity(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Error creating activity");
      return;
    }
  }
  return (
    <Form onSubmit={handleCreateActivity}>
      <h1>Create new Activity</h1>

      <label>Title</label>
      <Input required placeholder="Name for your activity" />
      <TextContainer>
        <label>Description</label>
        <Textarea
          value={countLetters}
          rows={8}
          maxLength={150}
          required
          placeholder="Describe your activity ..."
          onChange={(event) => setCounLetters(event.target.value)}
        />
        <LetterCount>{150 - countLetters.length} Letters left</LetterCount>
      </TextContainer>

      <label>Category</label>
      <Select required>
        <option value="">Please select a category</option>
      </Select>

      <label>Area</label>
      <Input required placeholder="Which area does your category belong to?" />

      <label>Country</label>
      <Input
        required
        placeholder="Which country does your category belong to?"
      />

      <Button>Create new Activity</Button>
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
  margin-top: 0;
  margin-right: 5px;
`;
