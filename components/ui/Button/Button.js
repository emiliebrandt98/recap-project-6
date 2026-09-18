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

export function GreyIconButton({
  disabled,
  onClick,
  Icon,
  Content,
  type = "button",
  ariaLabel,
}) {
  return (
    <SytledGreyIconButton
      aria-label={ariaLabel}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={24} />} {Content}
    </SytledGreyIconButton>
  );
}

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const StyledPrimaryButton = styled(BaseButton)`
  width: 100%;
  gap: var(--spacing-s);
  padding: var(--padding-ml) var(--padding-m);
  background-color: var(--color-primary);
  color: var(--font-text-light);
  border-radius: var(--border-radius-m);
  font-weight: 700;

  &:hover {
    background-color: var(--color-primary-hover-1);
  }
`;

const StyledSecondaryButton = styled(BaseButton)`
  width: 100%;
  gap: var(--spacing-s);
  padding: var(--padding-ml) var(--padding-m);
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--font-text-dark);
  border-radius: var(--border-radius-m);
  font-weight: 700;

  &:hover {
    background-color: var(--color-primary-hover-2);
  }
`;

const SytledGreyIconButton = styled(BaseButton)`
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: var(--border-radius-l);
  background-color: var(--color-grey-light);
  color: var(--color-grey-dark);

  &:hover {
    background-color: var(--color-accent);
  }
`;
