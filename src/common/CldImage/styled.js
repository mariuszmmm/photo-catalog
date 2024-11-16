import styled from "styled-components";
import { AdvancedImage } from '@cloudinary/react';

export const StyledAdvancedImage = styled(AdvancedImage)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageWarapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  
  /* img{
    max-width: 100%;
    display: block;
    aspect-ratio: 16/9;
    object-fit: cover;
  } */
`;