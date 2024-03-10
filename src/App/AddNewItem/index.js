import Button from "../../common/Button";
import { Form } from "./styled";
import Image from "../../common/Image";
import ImageContainer from "../../common/ImageContainer";
import InputFile from "../../common/InputFile";
import Textarea from "../../common/Textarea";

const AddNewItem = ({ newItem, areaRef, formRef, addNewItem, newItemContentChange, newItemFileChange, state }) => {

  return (
    <Form ref={formRef} onSubmit={addNewItem}  >
      <ImageContainer>
        {newItem.image && <Image $isLoaded={newItem.image} src={newItem.image} alt="foto" />}
      </ImageContainer>
      <Textarea
        ref={areaRef}
        autoFocus
        type="text"
        name="textarea"
        value={newItem.content}
        placeholder="wpisz tekst"
        onChange={newItemContentChange}
      />
      <InputFile type="file" onChange={newItemFileChange} />
      <Button type="onSumbit">Dodaj</Button>
      <p>Ilość elementów: {state.items.length}</p>
    </Form>
  )
};

export default AddNewItem;