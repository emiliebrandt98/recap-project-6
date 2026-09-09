import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styled from "styled-components";

export default function LinkTo({ pathname }) {
  return (
    <StyledLink href={pathname}>
      <ArrowLeft size={18} />
      Back to Activities List
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;

  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
  }
`;
