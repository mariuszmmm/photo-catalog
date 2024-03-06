import styled from "styled-components";

export default styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: minmax(0, 500px) minmax(0, 500px);;
  gap: 10px;
  margin: 0 30px;
  /* width: 500px; */

  @media (max-width:600px){
    grid-template-columns: 100%;
  }
`;