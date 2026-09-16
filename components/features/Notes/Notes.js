import { useState } from "react";
import { Plus } from "lucide-react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "../../ui/Button/Button";
import { toast } from "react-toastify";
import { useActivity } from "@/hooks/useActivity";
import { mutate } from "swr";
import DeleteDialog from "../../ui/DeleteDialog/DeleteDialog";

export default function Notes() {
  const { activity, id } = useActivity();

  const [openNote, setOpenNote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  return (
    <>
      {!openNote && (
        <>
          {isNoteEditing ? (
            <CurrentNote>
              <NoteText>{activity.note}</NoteText>

              <hr />

              <ButtonLinkWrapper>
                {isNoteEditing && (
                  <Button
                    type="button"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Delete Note
                  </Button>
                )}

                <Button type="button" onClick={handleOpenNotes}>
                  Edit Note
                </Button>
              </ButtonLinkWrapper>
            </CurrentNote>
          ) : (
            <NoteButton type="button" onClick={handleOpenNotes}>
              <PlusIcon />
              {isNoteEditing ? "Edit Note" : "Add Note"}
            </NoteButton>
          )}
        </>
      )}

      <DeleteDialog
        onDeleteDialogOpen={setIsDeleteDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        onSaveNote={handleSaveNote}
      />

      {openNote && (
        <NoteForm onSubmit={handelSubmitNote}>
          <Textarea
            aria-label="Note"
            id="note"
            name="note"
            rows={8}
            defaultValue={activity.note}
            placeholder="Write down your notes..."
          />

          <ButtonWrapper>
            <SecondaryButton
              type="button"
              buttonText={"Cancel"}
              onClick={() => setOpenNote(false)}
            />
            <PrimaryButton
              type="submit"
              buttonText={
                isLoading
                  ? "Saving..."
                  : isNoteEditing
                    ? "Update Note"
                    : "Add Note"
              }
            />
          </ButtonWrapper>
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
  background-color: #f2f2f2;
  padding: 16px 1rem;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  min-height: 150px;
  border-radius: 6px;
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
  width: 100%;
`;

const NoteText = styled.p`
  font-size: 1rem;
  line-height: 1.2rem;
`;

const CurrentNote = styled.div`
  background-color: #f2f2f2;
  padding: 16px 20px;
  border-radius: 8px;
`;

const ButtonLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  padding: 6px 8px;
`;

const Button = styled.button`
  background-color: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
`;
