import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <header>Activity App</header>

      <main>{children}</main>

      <StyledFooter>
        <Link href="/activityCreateForm">
          <Image width={24} height={24} src="/assets/circle-plus.png" />
        </Link>
      </StyledFooter>
    </div>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  background-color: grey;
  width: 100%;
  padding: 10px;
  justify-content: center;
  position: fixed;
  bottom: 0;
  margin: 0 auto;

  border: solid black 2px;
`;
