import Button from "../../common/Button";
import ItemContainer from "../../common/ItemContainer";
import Textarea from "../../common/Textarea";
import useItems from "./useItems";
import { Backdrop } from "../../common/Backdrop";
import InputFile, { InputFileWrapper } from "../../common/InputFile";
import ImageItem from "./ImageItem";
import AddNewItem from "../AddNewItem";
import ButtonLink from "../../common/ButtonLink";
import ButtonsContainer from "../../common/ButtonsContainer";
import SectionItems from "../../common/SectionItems";
import Input from "../../common/Input";
import { useRef, useState } from "react";
import Confirmation from "./Confirmation";
import ExampleItems from "./ExampleItems";
import { Loader } from "../../common/Loader";

const Items = ({ state, setState, showBackdrop, setShowBackdrop }) => {
  const [confirmation, setConfirmation] = useState({ state: false });
  const InputFileRef = useRef(null);
  const [itemSaving, setItemSaving] = useState(false);
  const [itemDeleting, setItemDeleting] = useState(false);
  const [imageDeleting, setImageDeleting] = useState(false);
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
      {confirmation.calback &&
        <Confirmation
          query="Napewno usunąć ?"
          confirmation={confirmation}
          setConfirmation={setConfirmation}
        />}
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
                      disabled={itemSaving || imageDeleting}
                      onChange={onEditedItemChange}
                    />
                    <Textarea
                      type="text"
                      name="content"
                      value={editedItem.content}
                      disabled={itemSaving || imageDeleting}
                      onChange={onEditedItemChange}
                      $edited
                    />
                    <InputFileWrapper>
                      <InputFile
                        type="file"
                        ref={InputFileRef}
                        disabled={itemSaving || imageDeleting}
                        onChange={(event) => onEditedItemFileChange(event, InputFileRef)}
                      />
                      <Loader loading={itemSaving || imageDeleting} />
                    </InputFileWrapper>
                    <ButtonsContainer>
                      <Button
                        type="button"
                        disabled={!item.image || itemSaving || imageDeleting}
                        onClick={() => confirm(onDeleteItemImageClick, item._id, setImageDeleting)}
                      >
                        Usuń zdjęcie
                      </Button>
                      <Button
                        type="button"
                        disabled={itemSaving || imageDeleting}
                        onClick={() => onSaveEditedItemClick(setItemSaving)}
                      >
                        Zapisz
                      </Button>
                      <Button
                        type="button"
                        disabled={itemSaving || imageDeleting}
                        onClick={() => onCancelEditedItemClick()}
                      >
                        Anuluj
                      </Button>
                    </ButtonsContainer>
                  </>
                  :
                  <>
                    <h2>{index + 1}. {item.header}</h2>
                    <p>{item.content}</p>
                    <ButtonsContainer>
                      <ButtonLink
                        href={item.downloadUrl}
                        disabled={!item.image || itemDeleting}
                      >
                        Pobierz plik
                      </ButtonLink>
                      <Button
                        type="button"
                        disabled={editedItem.id || itemDeleting}
                        onClick={() => onEditItemClick(item._id, item.header, item.content, index)}
                      >
                        Edytuj
                      </Button>
                      <Button
                        type="button"
                        disabled={editedItem.id || itemDeleting}
                        onClick={() => confirm(onDeleteItemClick, item._id, setItemDeleting)}
                      >
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