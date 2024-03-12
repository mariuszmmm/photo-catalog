import Button from "../../common/Button";
import ItemContainer from "../../common/ItemContainer";
import Textarea from "../../common/Textarea";
import useItems from "./useItems";
import { Backdrop } from "../../common/Modal";
import InputFile from "../../common/InputFile";
import ImageItem from "./ImageItem";
import AddNewItem from "./AddNewItem";
import { API_URL } from "../api";
import ButtonLink from "../../common/ButtonLink";
import ButtonsContainer from "../../common/ButtonsContainer";
import SectionItems from "../../common/SectionItems";
import Input from "../../common/Input";

const Items = ({ state, setState }) => {
  const {
    headerEditRef,
    editedItem,
    onEditedItemChange,
    onEditedItemFileChange,
    onEditItemClick,
    onDeleteItemClick,
    onDeleteItemImageClick,
    onSaveEditedItemClick,
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
              <ItemContainer key={item._id}>
                {<ImageItem item={item} editedItemId={editedItem.id} editImage={editedItem.image} />}
                {!state.isLoggedIn &&
                  <>
                    <h2>{index + 1}. {item.header}</h2>
                    <p>{item.content}</p>s
                  </>}
                {state.isLoggedIn &&
                  (editedItem.id === item._id ?
                    <>
                      <Input
                        ref={headerEditRef}
                        type="text"
                        name="header"
                        value={editedItem.header}
                        onChange={onEditedItemChange}
                      />
                      <Textarea
                        type="text"
                        name="content"
                        value={editedItem.content}
                        onChange={onEditedItemChange}
                        $edited
                      />
                      <InputFile type="file" onChange={(event) => onEditedItemFileChange(event, item._id)} />
                      <ButtonsContainer>
                        <Button type="button" onClick={() => onDeleteItemImageClick(item._id)}>
                          Usuń zdjęcie
                        </Button>
                        <Button type="button" onClick={() => onSaveEditedItemClick(item._id)}>
                          Zapisz
                        </Button>
                      </ButtonsContainer>
                    </>
                    :
                    <>
                      <h2>{index + 1}. {item.header}</h2>
                      <p>{item.content}</p>
                      <ButtonsContainer>
                        <ButtonLink href={item.image && `${API_URL}/download/${item.image}`} disabled={!item.image}>
                          Pobierz plik
                        </ButtonLink>
                        <Button type="button" onClick={() => onEditItemClick(item._id, item.header, item.content, index)} disabled={editedItem.id}>
                          Edytuj
                        </Button>
                        <Button type="button" onClick={() => onDeleteItemClick(item._id)} disabled={editedItem.id}>
                          Usuń zadanie
                        </Button>
                      </ButtonsContainer>
                    </>
                  )
                }
              </ItemContainer>
            )}
          </SectionItems>
        </>
      }
    </>
  )
};

export default Items;