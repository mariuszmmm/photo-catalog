import ButtonLink from "../../../common/ButtonLink";
import ButtonsContainer from "../../../common/ButtonsContainer";
import Button from "../../../common/Button";
import { Form } from '../../../common/Modal';
import { Backdrop } from "../../../common/Backdrop";
import { useFilesList } from "./useFilesList";
import { useState } from "react";
import { ListContainer } from "../../../common/ListContainer";
import { Loader } from "../../../common/Loader";

const FilesList = ({ showBackdrop, setShowBackdrop }) => {
  const [files, setFiles] = useState({ images: [] });
  const [loading, setLoading] = useState(true);
  const { getFilesList } = useFilesList(setFiles, setLoading, setShowBackdrop);

  return (
    <>
      <Button onClick={() => getFilesList()}>Lista plików</Button>
      {showBackdrop === "filesList" &&
        <Backdrop>
          <Form>
            <Loader loading={loading} />
            <h1>Lista plików</h1>
            <ListContainer>
              {files.images.length === 0 ?
                loading ? <p>Ładowanie&nbsp;...</p> : <span>Brak plików</span>
                :
                !loading && <ul>
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
              {files.images.length > 0 && !loading && <ButtonLink href={files.zipUrl}
              >
                Zapisz wszystkie
              </ButtonLink>}
              <Button type="button" onClick={() => setShowBackdrop(null)} >Wróć</Button>
            </ButtonsContainer>
          </Form>
        </Backdrop>}
    </>
  );
};

export default FilesList;