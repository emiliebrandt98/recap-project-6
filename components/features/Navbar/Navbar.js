import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { House, PlusCircle, Heart } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  return (
    <StyledFooter>
      <StyledLink $active={router.pathname === "/"} href="/" aria-label="Home">
        <House size={24} />
      </StyledLink>

      <StyledLink
        $active={router.pathname === "/activities/createActivity"}
        href="/activities/createActivity"
        aria-label="Create Activity"
      >
        <PlusCircle size={24} />
      </StyledLink>

      <StyledLink
        $active={router.pathname === "/activities/favoriteActivities"}
        href="/activities/favoriteActivities"
        aria-label="Favorites"
      >
        <Heart size={24} />
      </StyledLink>
    </StyledFooter>
  );
}
const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  height: 56px;
  align-items: center;
  background-color: var(--color-grey-light);
  position: fixed;
  bottom: 0;
  left: 0;
`;

const StyledLink = styled(Link)`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  color: ${(props) =>
    props.$active ? "var(--color-icon-light)" : "var(--color-icon-dark)"};
  background-color: ${(props) =>
    props.$active ? "var(--color-primary)" : "var(--color-grey-light)"};
`;
