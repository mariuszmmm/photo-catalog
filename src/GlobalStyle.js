import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

body{
  background-color: grey;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  /* min-width: 300px; */
}

html{
  box-sizing: border-box;
  margin: 0 auto;
}

*, ::after, ::before {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;