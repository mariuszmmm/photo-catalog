import Button from "../../../common/Button";
import { logout } from "./logout"

const Logout = ({ setState }) => (
  <Button onClick={() => logout(setState)}>Wyloguj</Button>
);

export default Logout;