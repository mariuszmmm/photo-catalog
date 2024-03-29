import { API_URL } from "../../api";
import ButtonLink from "../../../common/ButtonLink";
import ButtonsContainer from "../../../common/ButtonsContainer";
import Button from "../../../common/Button";
import { Form } from '../../../common/Modal';
import { Backdrop } from "../../../common/Backdrop";
import { useFilesList } from "./useFilesList";
import { useState } from "react";
import ListContainer from "../../../common/ListContainer";

const FilesList = ({ showBackdrop, setShowBackdrop }) => {
  const [files, setFiles] = useState([])
  const { filesList } = useFilesList(setFiles, setShowBackdrop);

  return (
    <>
      <Button onClick={() => filesList()}>Lista plików</Button>
      {showBackdrop === "filesList" &&
        <Backdrop>
          <Form>
            <b>Lista plików</b>
            <ListContainer>
              <ol>
                {files.map((file) =>
                (<li key={file}>{file}{" "}
                  <a href={file && `${API_URL}/files/download/${file}`}
                    disabled={!file}
                    download={file}
                  >
                    Pobierz plik
                  </a>
                </li>))}
              </ol>
            </ListContainer>
            <ButtonsContainer>
              <ButtonLink type="button" href={`${API_URL}/files/download/`}>
                Zapisz wszystkie
              </ButtonLink>
              <Button type="button" onClick={() => setShowBackdrop(null)} >Wróć</Button>
            </ButtonsContainer>
          </Form>
        </Backdrop>}
    </>
  );
};

export default FilesList;