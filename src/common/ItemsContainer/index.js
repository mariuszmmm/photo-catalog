import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
  padding: 10px;
  border: 1px solid black;
  background-color: rgba(255,255,255, 0.2);

  p{
    margin:0;
    padding: 10px;
    font-weight:700;
    text-align: justify;
    flex-grow: 0;
  }
`;