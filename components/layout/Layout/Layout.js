import styled from "styled-components";
import Navbar from "@/components/features/Navbar/Navbar.js";

export default function Layout({ children }) {
  return (
    <LayoutWrapper>
      <HeaderContainer>
        <header>Activity App</header>
      </HeaderContainer>

      <main>{children}</main>
      <Navbar />
    </LayoutWrapper>
  );
}
const LayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const HeaderContainer = styled.header`
  width: 100%;
  text-align: center;
  border: solid black 2px;
`;
