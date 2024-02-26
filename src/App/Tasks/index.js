import Button from "../../common/Button";
import ItemsContainer from "../../common/ItemsContainer";
import Textarea from "../../common/Textarea";
import useTasks from "./useTasks";
import FormContainer from "../../common/FormContainer";
import TaskContainer from "../../common/TaskContainer";
import Loader from "../../common/Loader";
import Img from "../../common/Img";
import InputFile from "../../common/InputFile";
import { Image } from "./Image";
import ImgContainer from "../../common/ImgContainer";

const Tasks = ({ loading, setLoading, state, setState, loggedIn }) => {

  const {
    areaRef,
    areaEditRef,
    newTask,
    inputNewTaskHandler,
    addNewTask,
    deleteTask,
    handleFileChange,
    image,
    deleteImage,
    saveEditedTask,
    editedTaskId,
    editContent,
    editImage,
    setEditedTaskId,
    setEditContent,
    handleEditFileChange,
  } = useTasks(state, setState, setLoading);

  return (
    <>
      {loading &&
        <Loader>ŁADOWANIE ...</Loader>}
      {loggedIn && <FormContainer>
        <form onSubmit={addNewTask}  >
          <ItemsContainer>
            <Textarea
              ref={areaRef}
              autoFocus
              type="text"
              name="textarea"
              value={newTask}
              placeholder="wpisz tekst"
              onChange={inputNewTaskHandler}
            />
            <ImgContainer>
              {image && <Img src={image} alt="image task" />}
            </ImgContainer>
            <InputFile type="file" onChange={handleFileChange} />
            <Button type="onSumbit">Dodaj</Button>
          </ItemsContainer>
          <p>Ilość zadań: {state.length}</p>
        </form>
      </FormContainer >}


      <TaskContainer>
        {state.map((task) =>
          <ItemsContainer key={task._id}>
            {editedTaskId === task._id ? <Textarea
              ref={areaEditRef}
              type="text"
              name="textarea"
              value={editContent || setEditContent(task.content)}
              onChange={(event) => setEditContent(event.target.value)}
            /> : <p>{task.content}</p>}
            {<Image task={task} editedTaskId={editedTaskId} editImage={editImage} />}
            {loggedIn &&
              <>
                {editedTaskId ?
                  <>
                    <InputFile type="file" onChange={(event) => handleEditFileChange(event, task._id)} disabled={editedTaskId !== task._id} />
                    <Button type="button" onClick={() => deleteImage(task._id)} disabled={editedTaskId !== task._id}>
                      Usuń zdjęcie
                    </Button>
                    <Button type="button" onClick={() => saveEditedTask(task._id)} disabled={editedTaskId !== task._id}>
                      Zapisz
                    </Button>
                  </>
                  :
                  <>
                    <Button type="button" onClick={() => setEditedTaskId(task._id)}>
                      Edytuj
                    </Button>
                    <Button type="button" onClick={() => deleteTask(task._id)}>
                      Usuń zadanie
                    </Button>
                  </>}
              </>}
          </ItemsContainer>
        )}
      </TaskContainer>
    </>
  )
};

export default Tasks;