import styled from "styled-components";
import Navbar from "@/components/features/Navbar/Navbar.js";

export default function Layout({ children }) {
  return (
    <div>
      <main>{children}</main>
      <Navbar />
    </div>
  );
}
// const LayoutWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin: 0 auto;
// `;
