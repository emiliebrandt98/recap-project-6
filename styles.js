import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
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

  // Tablet
 @media (min-width: 768px) {
    body {
      margin: 20px auto;
      max-width: 700px;
    }
  }

  // Desktop
  @media (min-width: 1024px) {
    body {
      max-width: 960px;
    }
  }
`;
