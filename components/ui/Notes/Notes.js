import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "../Button/Button";
import { toast } from "react-toastify";
import { useActivity } from "@/hooks/useActivity";
import { mutate } from "swr";

export default function Notes() {
  const { activity, id } = useActivity();

  const [openNote, setOpenNote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isNoteEditing = Boolean(activity.note);

  function handleOpenNotes() {
    setOpenNote(true);
  }

  async function handleSaveNote(noteValue) {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: noteValue }),
      });

      if (!response.ok) {
        throw new Error("Note update failed.");
      }

      await mutate(`/api/activities/${id}`);
      setOpenNote(false);
    } catch (error) {
      console.error({ message: error.message });
      toast.error("Note could not be saved. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handelSubmitNote(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { note: noteValue } = Object.fromEntries(formData);

    handleSaveNote(noteValue);
  }

  function handleRemoveNote() {
    handleSaveNote("");
  }

  return (
    <>
      {!openNote && (
        <>
          {isNoteEditing ? <NoteText>{activity.note}</NoteText> : null}

          <NoteButton type="button" onClick={handleOpenNotes}>
            <PlusIcon />
            {isNoteEditing ? "Edit Note" : "Add Note"}
          </NoteButton>
        </>
      )}

      {openNote && (
        <NoteForm onSubmit={handelSubmitNote}>
          <label htmlFor="note">
            {isNoteEditing ? "Edit Note" : "Create Note"}
          </label>

          <Textarea
            aria-label="Note"
            id="note"
            name="note"
            rows={8}
            defaultValue={activity.note}
            placeholder="Write down your notes..."
          />

          <ButtonWrapper>
            {isNoteEditing && (
              <SecondaryButton
                type="button"
                buttonText={"Remove Note"}
                Icon={X}
                onClick={handleRemoveNote}
              />
            )}

            <PrimaryButton
              type="submit"
              buttonText={
                isLoading
                  ? "Saving..."
                  : isNoteEditing
                    ? "Update Note"
                    : "Add Note"
              }
              Icon={Check}
            />
          </ButtonWrapper>

          <SecondaryButton
            type="button"
            buttonText={"Cancel"}
            Icon={X}
            onClick={() => setOpenNote(false)}
          />
        </NoteForm>
      )}
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const NoteText = styled.p`
  background-color: #f2f2f2;
  padding: 8px 12px;
  border-radius: 8px;
`;
