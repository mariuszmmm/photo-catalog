import Button from "../../common/Button";
import ItemsContainer from "../../common/ItemsContainer";
import Textarea from "../../common/Textarea";
import useItems from "./useItems";
import { Backdrop } from "../../common/Modal";
import InputFile from "../../common/InputFile";
import ImageItem from "./ImageItem";
import AddNewItem from "./AddNewItem";
import { API_URL } from "../api";
import DownloadButton from "../../common/DownloadButton";
import ButtonsContainer from "../../common/ButtonsContainer";
import SectionItems from "../../common/SectionItems";
import Input from "../../common/Input";
import { Info } from "../Navigation/styled";

const Items = ({ state, setState }) => {
  const {
    headerEditRef,
    editedItem,
    editedItemChange,
    editedItemFileChange,
    setEditedItem,
    deleteItem,
    deleteImage,
    saveEditedItem,
  } = useItems(state, setState);

  const items = state.filter ? state.filteredItems : state.items;

  return (
    <>
      {state.loading &&
        <Backdrop>ŁADOWANIE ...</Backdrop>}
      {state.isAdmin &&
        <AddNewItem
          state={state}
          setState={setState}
        />}
      {!state.loading &&
        <>
          <SectionItems>
            {items.map((item, index) =>
              <ItemsContainer key={item._id}>
                {<ImageItem item={item} editedItemId={editedItem.id} editImage={editedItem.image} />}
                {!state.isLoggedIn &&
                  <>
                    <Info>{index + 1}. {item.header}</Info>
                    <p>{item.content}</p>
                  </>}
                {state.isLoggedIn &&
                  (editedItem.id === item._id ?
                    <>
                      <Input
                        ref={headerEditRef}
                        type="text"
                        name="header"
                        value={editedItem.header}
                        onChange={editedItemChange}
                      />
                      <Textarea
                        type="text"
                        name="content"
                        value={editedItem.content}
                        onChange={editedItemChange}
                        $edited
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
                      <Info>{index + 1}. {item.header}</Info>
                      <p>{item.content}</p>
                      <ButtonsContainer>
                        <DownloadButton href={item.image && `${API_URL}/download/${item.image}`} disabled={!item.image}>
                          Pobierz plik
                        </DownloadButton>

                        <Button type="button" onClick={() => setEditedItem({
                          ...editedItem, id: item._id, header: item.header, content: item.content
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
          </SectionItems>
        </>
      }
    </>
  )
};

export default Items;