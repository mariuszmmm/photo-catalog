import styled from "styled-components";

export const ListContainer = styled.div`
  height: 50%;
  width: 100%;
  overflow-y: auto;
  padding: 0 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  ul {
    padding: 0 ;
  }

  li {
    padding: 2px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    font-weight: bold;
  }
    
  a {
    min-width: max-content
  }
`;