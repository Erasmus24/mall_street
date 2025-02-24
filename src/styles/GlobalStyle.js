import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
    color: #333;
    padding: 0;
  }

  h1, h2, h3 {
    font-weight: bold;
  }
`;

export default GlobalStyle;
