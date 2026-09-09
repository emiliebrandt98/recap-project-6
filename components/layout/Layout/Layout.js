import styled from "styled-components";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

export default function Layout({ children, onEdit }) {
  return (
    <div>
      <HeaderContainer>
        <header>Activity App</header>
      </HeaderContainer>

      <main>{children}</main>

      <StyledFooter>
        <Link onClick={() => onEdit?.(false)} href="/activities/createActivity">
          <CirclePlus />
        </Link>
      </StyledFooter>
    </div>
  );
}

const HeaderContainer = styled.header`
  text-align: center;
  border: solid black 2px;
`;

const StyledFooter = styled.footer`
  display: flex;
  background-color: grey;
  padding: 10px;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  border: solid black 2px;
`;
