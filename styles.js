import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    max-width: 100%;
    margin: 0;
    font-family: system-ui;
  }
`;
