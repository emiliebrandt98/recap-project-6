import { createGlobalStyle } from "styled-components";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default createGlobalStyle`

   :root {
    // font-family
    --font-headline: ${poppins.style.fontFamily};
    --font-body: ${inter.style.fontFamily};

    // font-sizes
    --font-size-h1: 2rem;
    --font-size-h2: 1.5rem;
    --font-size-h3: 1.25rem;
    --font-size-body: 1rem;
    --font-size-info: 0.75rem;

    // font-color
    --font-text-dark: #001524;
    --font-text-light: #FFFFFF;
    --font-info: #3e3e3e;

    //colors
    --color-primary: #15616D;
    --color-primary-hover-1: #0e464f;
    --color-primary-hover-2: #d6e3e5;
    --color-secondary: #FF7D00;
    --color-secondary-hover: #dc6d04;
    --color-accent: #FFECD1;

    --color-background: #fbfbfb;
    --color-background-dialog: #ffffff;

    --color-icon-dark: #001524;
    --color-icon-light: #ffffff;

    --color-grey-dark: #636363;
    --color-grey-light: #f1f1f1;

    // border-radius
    --border-radius-l: 7rem;
    --border-radius-m: 0.75rem;
    --border-radius-s: 0.25rem;

    // spacing
    --spacing-s: 6px; 
    --spacing-m: 12px; 
    --spacing-ml: 18px; 
    --spacing-l: 48px; 
    
    // padding
    --padding-m: 8px;
    --padding-ml: 12px;
    --padding-l: 24px;
}
  html {
    scroll-behavior: smooth;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3 {
    font-family: ${poppins.style.fontFamily};
  }

  h1 {
    font-size: var(--font-size-h1);
    font-weight: 700;
    line-height: 2.25rem;
    color: var(--font-text-dark);
  }

  h2{
    font-size: var(--font-size-h2);
    font-weight: 700;
    line-height: 1.75rem;
    color: var(--font-text-dark);
  }

  h3{
    font-size: var(--font-size-h3);
    font-weight: 700;
    line-height: 1.5rem;
    color: var(--font-text-dark);
  }

  body {
    min-width: 375px;
    min-height: 100vh;
    max-width: 100%;

    font-family: ${inter.style.fontFamily};
    font-size: var(--font-size-body);

    background-color: var( --color-background);
    color: var(--font-text-dark);
  }

  main {
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    gap: 32px;

    margin: 24px 2rem 80px 2rem;
  }

  input, button {
    font-family: inherit;
  }
`;
