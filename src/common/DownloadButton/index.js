import styled, { css } from "styled-components"

export default styled.a`
  min-width: max-content;
  font-size: 1em ;
  padding: 6px 15px 4px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px black ;
  cursor: pointer;
  flex: 1 0 0;
  margin-right: 5px;
  font-weight: 700;
  color: black;
  background-color: white;
  text-align: center;
  text-decoration: none;

  ${({ disabled }) => disabled && css`
    background-color: inherit;
    color: gray;
    cursor: auto;
    user-select: none;
  `};

    &:hover{
      background-color: yellow;

      ${({ disabled }) => disabled && css`
        background-color: inherit;
      `};
    }

    &:active{
      box-shadow: none ;
      background-color: green;

      ${({ disabled }) => disabled && css`
        background-color: inherit;
        box-shadow: 2px 2px 2px 2px black ;
      `};
    }

`;