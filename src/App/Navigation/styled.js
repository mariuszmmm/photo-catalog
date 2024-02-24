import styled, { css } from "styled-components";

export const Nav = styled.nav`
  height: 80px;
  min-width: max-content;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  gap: 5px;
  font-weight: 700;
  border-bottom: 1px solid black;
  padding: 15px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  height: 1rem;
  width: 150px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1em ;
  margin-right: 10px;

  ${({ $incorrect }) => $incorrect && css`
    background-color: #f78e8e;
  `}
`;

export const LogInfo = styled.p`
  font-size: 1.5em ;
  width: 100%;
  margin: 0;
`;