import Button from "../../common/Button";
import ItemsContainer from "../../common/ItemsContainer";
import Textarea from "../../common/Textarea";
import useItems from "./useItems";
import ItemContainer from "../../common/ItemContainer";
import Loader from "../../common/Loader";
import InputFile from "../../common/InputFile";
import { Image } from "./Image";
import FormAddNewItem from "./FormAddNewItem";
import { API_URL } from "../api/api";
import DownloadButton from "../../common/DownloadButton";

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
  console.log(state)

  return (
    <>
      {state.loading &&
        <Loader>ŁADOWANIE ...</Loader>}
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
      {!state.loading && <ItemContainer>
        {state.items.map((item) =>
          <ItemsContainer key={item._id}>
            {<Image item={item} editedItemId={editedItem.id} editImage={editedItem.image} />}

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
                  <Button type="button" onClick={() => deleteImage(item._id)} disabled={(editedItem.id !== item._id) || !item.image}>
                    Usuń zdjęcie
                  </Button>
                  <Button type="button" onClick={() => saveEditedItem(item._id)} disabled={editedItem.id !== item._id}>
                    Zapisz
                  </Button>
                </>
                :
                <>
                  <p>{item.content}</p>
                  {/* <DownloadButton> */}
                    <DownloadButton href={`${API_URL}/download/${item.image}`}
                     download $aaa disabled={editedItem.id}>  
                      Pobierz plik</DownloadButton>
                  {/* </DownloadButton> */}
                  <Button type="button" onClick={() => setEditedItem({
                    ...editedItem, id: item._id, content: item.content
                  })} disabled={editedItem.id}>
                    Edytuj
                  </Button>
                  <Button type="button" onClick={() => deleteItem(item._id)} disabled={editedItem.id}>
                    Usuń zadanie
                  </Button>
                </>
              )
            }
          </ItemsContainer>
        )}
      </ItemContainer>}
    </>
  )
};

export default Items;