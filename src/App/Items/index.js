import Button from "../../common/Button";
import ItemsContainer from "../../common/ItemsContainer";
import Textarea from "../../common/Textarea";
import useItems from "./useItems";
import Modal from "../../common/Modal";
import InputFile from "../../common/InputFile";
import { Image } from "./Image";
import FormAddNewItem from "./FormAddNewItem";
import { API_URL } from "../api/api";
import DownloadButton from "../../common/DownloadButton";
import ButtonsContainer from "../../common/ButtonsContainer";
import SectionItems from "../../common/sectionItems";


const Items = ({ state, setState }) => {
  const {
    areaRef,
    formRef,
    newItem,
    addNewItem,
    newItemContentChange,
    newItemFileChange,
    areaEditRef,
    editedItem,
    editedItemContentChange,
    editedItemFileChange,
    setEditedItem,
    deleteItem,
    deleteImage,
    saveEditedItem,
  } = useItems(state, setState);

  return (
    <>
      {state.loading &&
        <Modal>ŁADOWANIE ...</Modal>}
      {state.isAdmin &&
        <FormAddNewItem
          newItem={newItem}
          areaRef={areaRef}
          formRef={formRef}
          addNewItem={addNewItem}
          newItemContentChange={newItemContentChange}
          newItemFileChange={newItemFileChange}
          state={state}
        />}
      {!state.loading && <SectionItems>
        {state.items.map((item) =>
          <ItemsContainer key={item._id}>
            {<Image item={item} editedItemId={editedItem.id} editImage={editedItem.image} />}
            {!state.isLoggedIn && <p>{item.content}</p>}
            {state.isLoggedIn &&
              (editedItem.id === item._id ?
                <>
                  <Textarea
                    ref={areaEditRef}
                    type="text"
                    name="textarea"
                    value={editedItem.content}
                    onChange={editedItemContentChange}
                  />
                  <InputFile type="file" onChange={(event) => editedItemFileChange(event, item._id)} />
                  <ButtonsContainer>
                    <Button type="button" onClick={() => deleteImage(item._id)} disabled={(editedItem.id !== item._id) || !item.image}>
                      Usuń zdjęcie
                    </Button>
                    <Button type="button" onClick={() => saveEditedItem(item._id)} disabled={editedItem.id !== item._id}>
                      Zapisz
                    </Button>
                  </ButtonsContainer>
                </>
                :
                <>
                  <p>{item.content}</p>

                  <ButtonsContainer>

                    <DownloadButton href={`${API_URL}/download/${item.image}`} disabled={!item.image}>
                      Pobierz plik
                    </DownloadButton>

                    <Button type="button" onClick={() => setEditedItem({
                      ...editedItem, id: item._id, content: item.content
                    })} disabled={editedItem.id}>
                      Edytuj
                    </Button>
                    <Button type="button" onClick={() => deleteItem(item._id)} disabled={editedItem.id}>
                      Usuń zadanie
                    </Button>
                  </ButtonsContainer>
                </>
              )
            }
          </ItemsContainer>
        )}
      </SectionItems>}
    </>
  )
};

export default Items;