import Button from "../../common/Button";
import FormContainer from "../../common/FormContainer";
import Img from "../../common/Img";
import ImgContainer from "../../common/ImgContainer";
import InputFile from "../../common/InputFile";
import Textarea from "../../common/Textarea";

const FormAddNewTask = ({ newTask, areaRef, addNewTask, newTaskContentChange, newTaskFileChange, state }) => (
  <form onSubmit={addNewTask}  >
    <FormContainer>
      <ImgContainer>
        {newTask.image && <Img $isLoaded={newTask.image} src={newTask.image} alt="image task" />}
      </ImgContainer>
      <Textarea
        ref={areaRef}
        autoFocus
        type="text"
        name="textarea"
        value={newTask.content}
        placeholder="wpisz tekst"
        onChange={newTaskContentChange}
      />
      <InputFile type="file" onChange={newTaskFileChange} />
      <Button type="onSumbit">Dodaj</Button>
      <p>Ilość zadań: {state.tasks.length}</p>
    </FormContainer>
  </form>
);

export default FormAddNewTask;