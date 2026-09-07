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
    margin: 20px 2rem;
    font-family: system-ui;
    min-height: 100vh;
  }

  main {
    margin-bottom: 50px;
  }
`;
