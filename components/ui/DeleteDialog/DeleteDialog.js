import styled from "styled-components";
import { useEffect, useRef } from "react";
import { PrimaryButton, SecondaryButton } from "../Button/Button";

export default function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete",
  message = "Do you really want to delete this?",
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <Dialog ref={dialogRef} onClose={onClose}>
      <h2>{title}</h2>
      <p>{message}</p>

      <ButtonWrapper>
        <PrimaryButton
          type="button"
          buttonText={"Confirm"}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        />
        <SecondaryButton
          type="button"
          buttonText={"Cancel"}
          onClick={onClose}
        />
      </ButtonWrapper>
    </Dialog>
  );
}

const Dialog = styled.dialog`
  width: 335px;
  padding: var(--padding-l);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-l);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: var(--border-radius-m);
  background: var(--color-background-dialog);
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
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-m);
`;
