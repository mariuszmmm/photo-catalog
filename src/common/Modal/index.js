import styled, { css } from "styled-components";

export const Form = styled.form`
  min-width: max-content;
  background-color: #dba764cc;
  text-shadow: none;
  font-size: 1rem;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  user-select: auto;
  line-height: 1.5rem;
  border: solid 3px black;
  border-radius: 20px;
  box-shadow: 15px 15px 20px black;
  padding: 30px 60px;
  position: relative;
  
  button{
    width: 120px;
  }

  p{
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 10px;
    font-weight: 700;
    margin: 5px;
  }

  h2{
    text-align: center;
    margin: 5px;
  }
`;

export const Label = styled.label`
  margin-left: -55px;
  width: 100px;
  text-align: right;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  height: 1rem;
  width: 200px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1em;

  ${({ $incorrect }) => $incorrect && css`
    background-color: #ff0000;
  `}

  ${({ $hidden }) => $hidden && css`
    visibility: hidden;
    position: absolute;
  `}
`;