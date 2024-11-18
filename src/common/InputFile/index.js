import styled, { css } from "styled-components";

export const InputFileWrapper = styled.div`
  position: relative;
  padding: 10px 0;
`;

export default styled.input`
  font-weight: 700;
  font-size: 1em ;
  padding: 4px 5px;
  cursor: pointer;

  ${({ disabled }) => disabled && css`
    cursor: not-allowed;
  `};


  &::-webkit-file-upload-button  {
    min-width: max-content;
    font-size: 1em ;
    padding: 6px 15px 4px;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 2px black ;
    cursor: pointer;
    flex: 1 0 0;
    margin-right: 5px;
    font-weight: 700;
    transition: 0.1s ease;
    height: fit-content;
    margin-right: 15px;


      ${({ disabled }) => !disabled && css`
        
        &:hover{
          background-color: #ff9000cc;
        };

        &:active{
          box-shadow: none ;
        }
      `};

    ${({ disabled }) => disabled && css`
      cursor: not-allowed;
    `};
  };
`;