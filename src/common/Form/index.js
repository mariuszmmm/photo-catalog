import styled from "styled-components";

export default styled.form`
  /* position: absolute; */
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