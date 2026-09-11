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
    // fonts
    --headline-Text: ${poppins.style.fontFamily};
    --ui-Text: ${inter.style.fontFamily};

    //colors
    --color-Text: #001524;
    --color-Bookmark: #FF7D00;
    --color-Button: #15616D;
    --color-bG: #FFFFFF;
    --color-Accent: #FFECD1;
    --color-bG-Navbar: #F1F1F1;
      /* dunkelGrau: #626262 */ */



}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    min-width: 375px;
    max-width: 100%;
    font-family: ${inter.style.fontFamily};
    min-height: 100vh;
    margin: 0;
  }

  main {
    margin: 24px 2rem 60px 2rem;
  }
`;
