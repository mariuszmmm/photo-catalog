import { API_URL } from "../../api";
import ButtonLink from "../../../common/ButtonLink"

const FilesListLinkButton = () => (
  <ButtonLink href={`${API_URL}/files`} target="_blank">
    Lista plików
  </ButtonLink>
);

export default FilesListLinkButton;