import styled, { css } from "styled-components";

export default styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${({ isLoaded }) => !isLoaded && css`visibility: hidden`}
`;

