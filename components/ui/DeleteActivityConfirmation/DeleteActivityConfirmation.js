import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { X, Check } from "lucide-react";
import styled from "styled-components";

export default function DeleteActivityConfirmation({
  onCancel,
  onDeleteConfirm,
  isDeleting,
}) {
  return (
    <ConfirmWrapper>
      <ConfirmMessage>
        Are you sure you want to delete this activity?
      </ConfirmMessage>
      <ButtonWrapper>
        <PrimaryButton
          onClick={onDeleteConfirm}
          buttonText={isDeleting ? "Deleting..." : "Confirm"}
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
  padding: 24px 1.5rem;
  gap: 18px;

  border-radius: 16px;
  background-color: #e9e9e9;
`;

const ConfirmMessage = styled.p`
  font-size: 1rem;
  line-height: 1.2rem;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
