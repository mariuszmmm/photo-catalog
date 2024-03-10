import styled, { css } from "styled-components";

export const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 10px 5px 15px teal;
  font-size: 50px;
  font-weight: 500;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color:  rgba(255,255,255,0.8);;
  background-color: rgba(0,0,0,0.8);
  backdrop-filter: blur(5px);
  z-index: 1;
  user-select: none;
`;

export const Form = styled.form`
  width: 400px;
  height: 300px;
  background-color: silver;
  text-shadow: none;
  font-size: 1rem;
  color:  black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  user-select: auto;
  
  button{
    flex: 0 0 0;
    width: 250px;
  }

  p{
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 10px;
  }
`;

export const Input = styled.input`
  height: 1rem;
  width: 150px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1em;
  margin: 0 12px 0 3px;

  ${({ $incorrect }) => $incorrect && css`
    background-color: #ff0000;
  `}

  ${({ $hidden }) => $hidden && css`
    visibility: hidden;
    position: absolute;
  `}
`;