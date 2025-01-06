import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin: 0;
  gap: 15px;
  font-weight: 700;
  padding: 15px;
  margin:  15px;
  margin: 15px;

  @media (max-width: 800px){
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }

  P{
    margin: 5px 15px;
  }
`;

export const SearchContainer = styled.form`
  display: grid;
  justify-content: right;
  align-items: baseline;
  gap: 10px;
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