import Button from "../../common/Button";
import ItemContainer from "../../common/ItemContainer";
import Textarea from "../../common/Textarea";
import useItems from "./useItems";
import { Backdrop } from "../../common/Backdrop";
import InputFile from "../../common/InputFile";
import ImageItem from "./ImageItem";
import AddNewItem from "../AddNewItem";
import ButtonLink from "../../common/ButtonLink";
import ButtonsContainer from "../../common/ButtonsContainer";
import SectionItems from "../../common/SectionItems";
import Input from "../../common/Input";
import { useState } from "react";
import Confirmation from "./Confirmation";
import ExampleItems from "./ExampleItems";

const Items = ({ state, setState, showBackdrop, setShowBackdrop }) => {
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
    onCancelEditedItemClick,
    confirm,
  } = useItems(state, setState, confirmation, setConfirmation);
  const { loading } = state;
  const { isLoggedIn, isAdmin } = state.user;
  const items = state.search ? state.filteredItems : state.items;

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
        <SectionItems>
          {items.map((item, index) =>
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
                      <Button type="button" onClick={() => onCancelEditedItemClick(item._id)}>
                        Anuluj
                      </Button>
                    </ButtonsContainer>
                  </>
                  :
                  <>
                    <h2>{index + 1}. {item.header}</h2>
                    <p>{item.content}</p>
                    <ButtonsContainer>
                      <ButtonLink href={item.downloadUrl} disabled={!item.image}>
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
      }
      {isLoggedIn &&
        <ExampleItems
          state={state}
          setState={setState}
          showBackdrop={showBackdrop}
          setShowBackdrop={setShowBackdrop}
        />
      }
    </>
  )
};

export default Items;