import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { House, PlusCircle } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  return (
    <StyledFooter>
      <StyledLink $active={router.pathname === "/"} href="/">
        <StyledIconContainer1>
          <House />
        </StyledIconContainer1>
      </StyledLink>
      <StyledLink
        $active={router.pathname === "/createActivity"}
        href="/createActivity"
      >
        <StyledIconContainer2>
          <PlusCircle />
        </StyledIconContainer2>
      </StyledLink>
    </StyledFooter>
  );
}
const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  border: solid black 2px;
`;

const StyledIconContainer1 = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background-color: green;
  padding: 10px;
`;

const StyledIconContainer2 = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background-color: red;
  padding: 10px;
`;

const StyledLink = styled(Link)`
  flex: 1;
  color: ${(props) => (props.$active ? "yellow" : "white")};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
