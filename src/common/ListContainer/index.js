import styled from "styled-components";

export default styled.div`
  height: 50%;
  width: 100%;
  overflow-y: auto;
  padding: 0 10px;
  margin: 0;

  ul {
    padding: 0 ;
  }

  li {
    padding: 2px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }
    
  a {
    min-width: max-content
  }
`;