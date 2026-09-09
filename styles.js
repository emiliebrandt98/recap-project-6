import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    max-width: 100%;
    margin: 0 auto;
    font-family: system-ui;
    min-height: 100vh;
  }

  main {
   width: 80%;
   padding-bottom: 60px; // is needed, otherwise footer overlapps main content
  }
`;
