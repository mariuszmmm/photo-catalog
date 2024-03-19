import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

body{
  background-color: #dba764cc;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin: 0 auto;
  min-width: 300px;
}

html{
  box-sizing: border-box;
}

*, ::after, ::before {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;