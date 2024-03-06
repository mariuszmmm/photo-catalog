import styled from "styled-components"
import Button from "../Button";

export default styled(Button).attrs({ as: 'a' })`
  color: black;
  background-color: white;
  text-align: center;
  text-decoration: none;
`;