import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 20px 2rem;
    font-family: system-ui;
    min-height: 100vh;
    max-width: 50rem;
  }
`;
