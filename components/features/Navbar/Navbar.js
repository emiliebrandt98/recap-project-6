import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { House, PlusCircle, Heart, MapPin } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  return (
    <StyledFooter>
      <StyledLink $active={router.pathname === "/"} href="/" aria-label="Home">
        <StyledIconContainer>
          <House />
        </StyledIconContainer>
      </StyledLink>

      <StyledLink
        $active={router.pathname === "/map/map"}
        href="/map/map"
        aria-label="map"
      >
        <StyledIconContainer>
          <MapPin />
        </StyledIconContainer>
      </StyledLink>

      <StyledLink
        $active={router.pathname === "/activities/createActivity"}
        href="/activities/createActivity"
        aria-label="Create Activity"
      >
        <StyledIconContainer>
          <PlusCircle />
        </StyledIconContainer>
      </StyledLink>
      <StyledLink
        $active={router.pathname === "/activities/favoriteActivities"}
        href="/activities/favoriteActivities"
        aria-label="Favorites"
      >
        <StyledIconContainer>
          <Heart />
        </StyledIconContainer>
      </StyledLink>
    </StyledFooter>
  );
}
const StyledFooter = styled.footer`
  background-color: var(--color-bG-Navbar);
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
`;

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 10px;
`;

const StyledLink = styled(Link)`
  flex: 1;
  color: ${(props) => (props.$active ? "white" : "var(--color-Text)")};
  background-color: ${(props) =>
    props.$active ? "var(--color-Button)" : "var(--color-bG-Navbar)"};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
