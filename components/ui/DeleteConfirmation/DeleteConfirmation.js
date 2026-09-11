import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/Button/Button.js";
import { X, Check } from "lucide-react";
import styled from "styled-components";

export default function DeleteConfirmation({ onCancel, onDeleteConfirm }) {
  return (
    <ConfirmWrapper>
      <ConfirmMessage>
        Are you sure you want to delete this activity?
      </ConfirmMessage>

      <ButtonWrapper>
        <PrimaryButton
          onClick={onDeleteConfirm}
          buttonText={"Confirm"}
          Icon={Check}
        />
        <SecondaryButton onClick={onCancel} buttonText={"Cancel"} Icon={X} />
      </ButtonWrapper>
    </ConfirmWrapper>
  );
}

const ConfirmWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
  gap: 18px;

  border-radius: 16px;
  background-color: var(--color-Navbar);
`;

const ConfirmMessage = styled.p`
  color: var(--color-Text);
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
