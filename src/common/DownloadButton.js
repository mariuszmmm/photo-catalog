import styled, { css } from "styled-components"
import Button from "./Button";

export default styled.a`
  width: fit-content;
  color: black;



  ${({ $aaa }) => $aaa && css`
    color: black;
    /* background-color: grey; */
    padding: 10px;
    text-decoration: none;
    /* display: none; */
  `};




  min-width: max-content;
    height: max-content;
    font-size: 1em ;
    margin: 0 8px 2px 4px;
    padding: 5px 15px;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 2px ;
    cursor: pointer;

    &:hover{
      background-color: yellow;
    }

    &:active{
      box-shadow: none ;
      background-color: green;
    }

    &:disabled{
      background-color: inherit;
      cursor: auto;
    }

    &:disabled:active{
      box-shadow: 2px 2px 2px 2px ;
    }




`;