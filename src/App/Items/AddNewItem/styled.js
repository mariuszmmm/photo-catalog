import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  justify-content: center;
  grid-template-columns: minmax(0, 500px) minmax(0, 500px);;
  gap: 10px;
  margin: 30px;

  @media (max-width:600px){
    grid-template-columns: 100%;
    margin: 30px 0;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

`;