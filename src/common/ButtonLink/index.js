import styled, { css } from "styled-components"

export default styled.a`
  min-width: max-content;
  font-size: 1em ;
  padding: 6px 15px;
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
  line-height: 1rem;

  ${({ disabled }) => disabled && css`
    background-color: lightgray;
    color: gray;
    cursor: not-allowed;
    user-select: none;
  `};

    &:hover{
      background-color: #ff9000cc;

      ${({ disabled }) => disabled && css`
        background-color: lightgray;
      `};
    }

    &:active{
      box-shadow: none ;

      ${({ disabled }) => disabled && css`
        background-color: lightgray;
        box-shadow: 2px 2px 2px 2px black ;
      `};
    }
`;