import ButtonLink from "../../../common/ButtonLink";
import ButtonsContainer from "../../../common/ButtonsContainer";
import Button from "../../../common/Button";
import { Form } from '../../../common/Modal';
import { Backdrop } from "../../../common/Backdrop";
import { useFilesList } from "./useFilesList";
import { useState } from "react";
import ListContainer from "../../../common/ListContainer";

const FilesList = ({ showBackdrop, setShowBackdrop }) => {
  const [files, setFiles] = useState({ images: [] });
  const { filesList } = useFilesList(setFiles, setShowBackdrop);

  return (
    <>
      <Button onClick={() => filesList()}>Lista plików</Button>
      {showBackdrop === "filesList" &&
        <Backdrop>
          <Form>
            <h1>Lista obrazów</h1>
            <ListContainer>
              {files.images.length === 0 ?
                <p>Ładowanie&nbsp;listy&nbsp;...</p>
                :
                <ul>
                  {files.images?.map((file, index) => (
                    <li key={file.public_id}>
                      <span>{`${index + 1}. ${file.name}`}</span>
                      <a href={file.downloadUrl} download={file.name} >
                        Pobierz plik
                      </a>
                    </li>
                  ))}
                </ul>
              }
            </ListContainer>
            <ButtonsContainer>
              <ButtonLink href={files.zipUrl}>
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