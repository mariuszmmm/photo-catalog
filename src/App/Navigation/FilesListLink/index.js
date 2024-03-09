import { API_URL } from "../../api/api";
import DownloadButton from "../../../common/DownloadButton"

const FilesListLinkButton = () => (
  <DownloadButton href={`${API_URL}/files`} target="_blank">
    Lista plików
  </DownloadButton>
);

export default FilesListLinkButton;