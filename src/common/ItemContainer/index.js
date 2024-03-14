import styled, { css } from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px;
  gap: 10px;
  border: 1px solid black;
  background-color: rgba(255,255,255, 0.2);

  ${({ $filteredOut }) => $filteredOut && css`
    display: none;
  `};

  h2{
    margin: 10px;
    font-weight:700;
    text-align: justify;
    flex-grow: 0;
  }

  p{
    margin:0 10px;
    text-align: justify;
    flex-grow: 0;
  }
`;