import Button from "../../common/Button";
import ItemsContainer from "../../common/ItemsContainer";
import Textarea from "../../common/Textarea";
import useItems from "./useItems";
import ItemContainer from "../../common/ItemContainer";
import Loader from "../../common/Loader";
import InputFile from "../../common/InputFile";
import { Image } from "./Image";
import FormAddNewItem from "./FormAddNewItem";

const Items = ({ state, setState }) => {
  const {
    areaRef,
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
        <Loader>ŁADOWANIE ...</Loader>}
      {state.isAdmin &&
        <FormAddNewItem
          newItem={newItem}
          areaRef={areaRef}
          addNewItem={addNewItem}
          newItemContentChange={newItemContentChange}
          newItemFileChange={newItemFileChange}
          state={state}
        />}
      {state.isLoggedIn && <ItemContainer>
        {state.items.map((item) =>
          <ItemsContainer key={item._id}>
            {editedItem.id === item._id ? <Textarea
              ref={areaEditRef}
              type="text"
              name="textarea"
              value={editedItem.content}
              onChange={editedItemContentChange}
            /> : <p>{item.content}</p>}
            {<Image item={item} editedItemId={editedItem.id} editImage={editedItem.image} />}
            {state.isAdmin &&
              <>
                {editedItem.id ?
                  <>
                    <InputFile type="file" onChange={(event) => editedItemFileChange(event, item._id)} disabled={editedItem.id !== item._id} />
                    <Button type="button" onClick={() => deleteImage(item._id)} disabled={(editedItem.id !== item._id) || !item.image}>
                      Usuń zdjęcie
                    </Button>
                    <Button type="button" onClick={() => saveEditedItem(item._id)} disabled={editedItem.id !== item._id}>
                      Zapisz
                    </Button>
                  </>
                  :
                  <>
                    <Button type="button" onClick={() => setEditedItem({
                      ...editedItem, id: item._id, content: item.content
                    })}>
                      Edytuj
                    </Button>
                    <Button type="button" onClick={() => deleteItem(item._id)}>
                      Usuń zadanie
                    </Button>
                  </>}
              </>}
          </ItemsContainer>
        )}
      </ItemContainer>}
    </>
  )
};

export default Items;