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
    inputNewTaskHandler,
    addNewTask,
    deleteTask,
    handleNewFileChange,
    deleteImage,
    saveEditedTask,
    handleEditFileChange,

    newTask,
    editedTask,
    setEditedTask
  } = useTasks(state, setState);

  return (
    <>
      {state.loading &&
        <Loader>ŁADOWANIE ...</Loader>}
      {state.loggedIn &&
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
              onChange={inputNewTaskHandler}
            />
            <InputFile type="file" onChange={handleNewFileChange} />
            <Button type="onSumbit">Dodaj</Button>
            <p>Ilość zadań: {state.tasks.length}</p>
          </FormContainer>
        </form>
      }
      <TaskContainer>
        {state.tasks.map((task) =>
          <ItemsContainer key={task._id}>
            {editedTask.id === task._id ? <Textarea
              ref={areaEditRef}
              type="text"
              name="textarea"
              value={editedTask.content || setEditedTask({ ...editedTask, content: task.content })}
              onChange={(event) =>
                setEditedTask({ ...editedTask, content: event.target.value })}
            /> : <p>{task.content}</p>}
            {<Image task={task} editedTaskId={editedTask.id} editImage={editedTask.image} />}
            {state.loggedIn &&
              <>
                {editedTask.id ?
                  <>
                    <InputFile type="file" onChange={(event) => handleEditFileChange(event, task._id)} disabled={editedTask.id !== task._id} />
                    <Button type="button" onClick={() => deleteImage(task._id)} disabled={(editedTask.id !== task._id) || !task.image}>
                      Usuń zdjęcie
                    </Button>
                    <Button type="button" onClick={() => saveEditedTask(task._id)} disabled={editedTask.id !== task._id}>
                      Zapisz
                    </Button>
                  </>
                  :
                  <>
                    <Button type="button" onClick={() => setEditedTask({
                      ...editedTask, id: task._id
                    })}>
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