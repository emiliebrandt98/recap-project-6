import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styled from "styled-components";

export default function LinkTo({ pathname }) {
  return (
    <StyledLink href={pathname}>
      <ArrowLeft size={18} />
      Back to Activities
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-s);

  text-decoration: none;
  color: var(--font-text-dark);

  &:hover {
    text-decoration: underline;
  }
`;
