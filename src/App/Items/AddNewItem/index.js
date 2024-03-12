import Button from "../../../common/Button";
import { ContentContainer, Form } from "./styled";
import Image from "../../../common/Image";
import ImageContainer from "../../../common/ImageContainer";
import InputFile from "../../../common/InputFile";
import Textarea from "../../../common/Textarea";
import Input from "../../../common/Input";
import useAddNewItem from "./useAddNewItem";

const AddNewItem = ({ state, setState }) => {

  const {
    newItem,
    headerRef,
    formRef,
    onAddNewItemSubmit,
    onNewItemChange,
    onNewItemFileChange,
  } = useAddNewItem(state, setState);

  return (
    <Form ref={formRef} onSubmit={onAddNewItemSubmit}  >
      <ContentContainer>
        <ImageContainer>
          {newItem.image && <Image $isLoaded={newItem.image} src={newItem.image} alt="foto" />}
        </ImageContainer>
        <InputFile type="file" onChange={onNewItemFileChange} />
      </ContentContainer>
      <ContentContainer>
        <Input
          autoFocus
          ref={headerRef}
          type="text"
          name="header"
          value={newItem.header}
          placeholder="tytuł"
          onChange={onNewItemChange}
        />
        <Textarea
          type="text"
          name="content"
          value={newItem.content}
          placeholder="opis"
          onChange={onNewItemChange}
        />
        <Button type="onSumbit">Dodaj</Button>
      </ContentContainer>
    </Form>
  )
};

export default AddNewItem;