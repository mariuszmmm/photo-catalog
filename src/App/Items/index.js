import Button from "../../common/Button";
import ItemContainer from "../../common/ItemContainer";
import Textarea from "../../common/Textarea";
import useItems from "./useItems";
import { Backdrop } from "../../common/Modal";
import InputFile from "../../common/InputFile";
import ImageItem from "./ImageItem";
import AddNewItem from "../AddNewItem";
import { API_URL } from "../api";
import ButtonLink from "../../common/ButtonLink";
import ButtonsContainer from "../../common/ButtonsContainer";
import SectionItems from "../../common/SectionItems";
import Input from "../../common/Input";
import { useState } from "react";
import Confirmation from "./Confirmation";

const Items = ({ state, setState }) => {
  const [confirmation, setConfirmation] = useState({ state: null });
  const {
    headerEditRef,
    editedItem,
    onEditedItemChange,
    onEditedItemFileChange,
    onEditItemClick,
    onDeleteItemClick,
    onDeleteItemImageClick,
    onSaveEditedItemClick,
    confirm,
  } = useItems(state, setState, confirmation, setConfirmation);
  const { loading, isLoggedIn, isAdmin } = state.user;

  return (
    <>
      {loading &&
        <Backdrop>ŁADOWANIE ...</Backdrop>}
      {confirmation.state === false && <Confirmation confirmation={confirmation} setConfirmation={setConfirmation} />}
      {isAdmin &&
        <AddNewItem
          state={state}
          setState={setState}
        />}
      {!loading &&
        <>
          <SectionItems>
            {state.items.map((item, index) =>
              <ItemContainer
                key={item._id}
                id={item._id}
                $filteredOut={item.filteredOut}
              >
                {<ImageItem
                  item={item}
                  editedItemId={editedItem.id}
                  editImage={editedItem.image}
                />
                }
                {!isLoggedIn &&
                  <>
                    <h2>{index + 1}. {item.header}</h2>
                    <p>{item.content}</p>
                  </>
                }
                {isLoggedIn &&
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
                        <Button type="button" onClick={() => confirm(onDeleteItemImageClick, item._id)} disabled={!item.image}>
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
                        <ButtonLink href={item.image && `${API_URL}/items/${item.image}`} disabled={!item.image}>
                          Pobierz plik
                        </ButtonLink>
                        <Button type="button" onClick={() => onEditItemClick(item._id, item.header, item.content, index)} disabled={editedItem.id}>
                          Edytuj
                        </Button>
                        <Button type="button" onClick={() => confirm(onDeleteItemClick, item._id)} disabled={editedItem.id}>
                          Usuń
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