import styled from "styled-components";

export default styled.div`
  display: grid;
  justify-content: right;
  align-items: baseline;
  gap: 10px;
  margin: 15px 45px;
  grid-template-columns: minmax(0, 300px) minmax(0, auto) minmax(0, auto);

  @media (max-width:600px){
    grid-template-columns: minmax(0, 500px);
    margin: 10px 15px;
  }

  button{
    height: min-content;
    margin-bottom: 3px;
  }
`;