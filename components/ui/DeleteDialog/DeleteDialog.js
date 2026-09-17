import styled from "styled-components";
import { useEffect, useRef } from "react";
import { PrimaryButton, SecondaryButton } from "../Button/Button";

export default function DeleteDialog({
  onDeleteDialogOpen,
  isDeleteDialogOpen,
  onSaveNote,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isDeleteDialogOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isDeleteDialogOpen]);

  function handleRemoveNote() {
    onSaveNote("");
    onDeleteDialogOpen(false);
  }

  function handleCloseDialog() {
    onDeleteDialogOpen(false);
  }

  return (
    <Dialog ref={dialogRef} onClose={() => onDeleteDialogOpen(false)}>
      <h2>Delete</h2>
      <p>
        Do you really want to <b>delete</b> your note?
      </p>

      <ButtonWrapper>
        <SecondaryButton
          type="button"
          buttonText={"Cancel"}
          onClick={() => handleCloseDialog(false)}
        />
        <PrimaryButton
          type="button"
          buttonText={"Confirm"}
          onClick={handleRemoveNote}
        />
      </ButtonWrapper>
    </Dialog>
  );
}

const Dialog = styled.dialog`
  width: 20.9375rem;
  padding: 1.5rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;

  border-radius: 0.75rem;
  background: #fff;
  border: none;

  &:not([open]) {
    display: none;
  }

  &[open] {
    display: flex;
  }

  ::backdrop {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
`;
