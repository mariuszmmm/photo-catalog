import styled from "styled-components";

export const Nav = styled.nav`
  min-height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  margin: 0;
  gap: 15px;
  font-weight: 700;
  border-bottom: 1px solid black;
  padding: 15px;
  margin-bottom: 20px;

  @media (max-width: 560px){
    flex-direction: column;
  }
`;

export const Info = styled.p`
  font-size: 1.2em ;
  min-width: max-content;
  margin: 0;
`;