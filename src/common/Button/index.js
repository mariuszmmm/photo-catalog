import styled from "styled-components";

export default styled.button`
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
      box-shadow: 2px 2px 2px 2px black ;
    }
`;