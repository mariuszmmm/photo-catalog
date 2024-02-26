import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 15px;
  padding: 10px;
  border: 1px solid black;
  background-color: rgba(255,255,255, 0.2);

  p{
    margin:0 10px 0 0;
    font-weight:700;
    flex-grow: 1;
  }
`;