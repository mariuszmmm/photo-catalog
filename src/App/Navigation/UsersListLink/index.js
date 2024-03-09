import DownloadButton from "../../../common/DownloadButton"
import { API_URL } from "../../api/api"

const UsersListLink = () => (
  <DownloadButton href={`${API_URL}/users`} target="_blank">
    Lista użytkowników
  </DownloadButton>
);

export default UsersListLink;