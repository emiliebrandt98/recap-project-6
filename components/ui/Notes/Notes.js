import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "../Button/Button";
import { toast } from "react-toastify";
import { useActivity } from "@/hooks/useActivity";

export default function Notes() {
  const [openNotes, setOpenNotes] = useState(false);
  const [clearNote, setClearNote] = useState(false);
  const [isNoteEditing, setIsNoteEditing] = useState(false);
  const [isNoteDeleting, setIsNoteDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { activity, id } = useActivity();

  function handleOpenNotes() {
    setOpenNotes(true);
  }

  function handelSubmitNote(event) {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
    } catch (error) {
      console.error({ message: error.message });
      toast.error("Note upload failed.");
      setIsLoading(false);
    }
  }
  return (
    <>
      <NoteButton type="button" onClick={handleOpenNotes}>
        <PlusIcon />
        Add Note
      </NoteButton>

      <NoteForm onSubmit={handelSubmitNote}>
        <label htmlFor="note">
          {isNoteEditing ? "Edit Note" : "Create Note"}
        </label>

        <Textarea
          type="textarea"
          aria-label="Notes"
          id="note"
          name="note"
          rows={8}
          placeholder="Write down your notes..."
        />

        <PrimaryButton
          type="submit"
          buttonText={
            isLoading ? "Saving..." : isNoteEditing ? "Update Note" : "Add Note"
          }
          Icon={Check}
        />

        <SecondaryButton type="button" buttonText={"Cancel"} Icon={X} />
      </NoteForm>
    </>
  );
}
const NoteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: auto;
`;

const Textarea = styled.textarea`
  padding: 8px;
  min-height: 150px;
`;

const NoteButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;

  width: 100%;
  cursor: pointer;
`;

const PlusIcon = styled(Plus)`
  background-color: lightgrey;
  padding: 2px;
  border-radius: 4px;
`;
