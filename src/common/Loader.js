import styled from "styled-components";

export default styled.div`
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
`;