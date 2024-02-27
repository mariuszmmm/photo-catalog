import styled from "styled-components";

export default styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 0 10%;

  @media (max-width:760px){
    grid-template-columns: 60%;
  }
`;