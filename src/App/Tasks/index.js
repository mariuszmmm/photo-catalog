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

const Tasks = ({ state, setState }) => {

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
  } = useTasks(state, setState);

  return (
    <>
      {state.loading &&
        <Loader>ŁADOWANIE ...</Loader>}
      {state.loggedIn &&
        <form onSubmit={addNewTask}  >
          <FormContainer>
            <ImgContainer>
              {image && <Img $isLoaded={image} src={image} alt="image task" />}
            </ImgContainer>
            <Textarea
              ref={areaRef}
              autoFocus
              type="text"
              name="textarea"
              value={newTask}
              placeholder="wpisz tekst"
              onChange={inputNewTaskHandler}
            />
            <InputFile type="file" onChange={handleFileChange} />
            <Button type="onSumbit">Dodaj</Button>
            <p>Ilość zadań: {state.tasks.length}</p>
          </FormContainer>
        </form>
      }
      <TaskContainer>
        {state.tasks.map((task) =>
          <ItemsContainer key={task._id}>
            {editedTaskId === task._id ? <Textarea
              ref={areaEditRef}
              type="text"
              name="textarea"
              value={editContent || setEditContent(task.content)}
              onChange={(event) => setEditContent(event.target.value)}
            /> : <p>{task.content}</p>}
            {<Image task={task} editedTaskId={editedTaskId} editImage={editImage} />}
            {state.loggedIn &&
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