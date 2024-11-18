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
    transition: 0.1s ease;
    background-color: white;
    height: fit-content;

    &:hover{
      background-color: #ff9000cc;
    }

    &:active{
      box-shadow: none ;
    }

    &:disabled{
      background-color: #d9c3a700;
      cursor: not-allowed;
    }

    &:disabled:active{
      box-shadow: 2px 2px 2px 2px black ;
    }
`;