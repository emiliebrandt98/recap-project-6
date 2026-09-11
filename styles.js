import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

h3{
  font-size:1.25rem;
}

  body {
    min-width: 375px;
    max-width: 100%;
    font-family: system-ui;
    min-height: 100vh;
    margin: 0;
  }

  main {
    margin: 24px 2rem 60px 2rem;
  }

`;
