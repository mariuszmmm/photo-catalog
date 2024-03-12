import ButtonLink from "../../../common/ButtonLink";
import { API_URL } from "../../api"

const UsersListLink = () => (
  <ButtonLink href={`${API_URL}/users`} target="_blank">
    Lista użytkowników
  </ButtonLink>
);

export default UsersListLink;