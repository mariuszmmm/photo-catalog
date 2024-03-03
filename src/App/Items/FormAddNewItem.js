import Button from "../../common/Button";
import FormContainer from "../../common/FormContainer";
import Img from "../../common/Img";
import ImgContainer from "../../common/ImgContainer";
import InputFile from "../../common/InputFile";
import Textarea from "../../common/Textarea";

const FormAddNewItem = ({ newItem, areaRef, formRef, addNewItem, newItemContentChange, newItemFileChange, state }) => {

  return (
    <form ref={formRef} onSubmit={addNewItem}  >
      <FormContainer>
        <ImgContainer>
          {newItem.image && <Img $isLoaded={newItem.image} src={newItem.image} alt="foto" />}
        </ImgContainer>
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
      </FormContainer>
    </form>
  )
};

export default FormAddNewItem;