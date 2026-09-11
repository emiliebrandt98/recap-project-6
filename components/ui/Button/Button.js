import styled from "styled-components";

export function PrimaryButton({
  disabled,
  buttonText,
  onClick,
  Icon,
  type = "button",
}) {
  return (
    <StyledPrimaryButton type={type} onClick={onClick} disabled={disabled}>
      {Icon && <Icon size={16} />}
      <span>{buttonText}</span>
    </StyledPrimaryButton>
  );
}

export function SecondaryButton({
  disabled,
  buttonText,
  onClick,
  Icon,
  type = "button",
}) {
  return (
    <StyledSecondaryButton type={type} onClick={onClick} disabled={disabled}>
      {Icon && <Icon size={16} />}
      <span>{buttonText}</span>
    </StyledSecondaryButton>
  );
}

const BaseButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 2rem;
`;

const StyledPrimaryButton = styled(BaseButton)`
  background-color: var(--color-bG-Navbar);
  color: var(--color-Text);
  border: none;
`;

const StyledSecondaryButton = styled(BaseButton)`
  background-color: var(--color-bG-Navbar);
  color: var(--color-Text);
  border: none;
`;
