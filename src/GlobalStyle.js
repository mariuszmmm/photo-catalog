import { createGlobalStyle } from "styled-components";
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

body{
  background-color: #dba764cc;
  font-family:  'Roboto', sans-serif;
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