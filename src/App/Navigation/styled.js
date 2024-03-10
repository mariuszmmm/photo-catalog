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
`;

export const LogInfo = styled.p`
  font-size: 1em ;
  min-width: max-content;
  margin: 0;
  flex: 1 0 auto;
`;