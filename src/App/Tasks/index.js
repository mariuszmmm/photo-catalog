import Button from "../../common/Button";
import ItemsContainer from "../../common/ItemsContainer";
import Textarea from "../../common/Textarea";
import useTasks from "./useTasks";
import TaskContainer from "../../common/TaskContainer";
import Loader from "../../common/Loader";
import InputFile from "../../common/InputFile";
import { Image } from "./Image";
import FormAddNewTask from "./FormAddNewTask";

const Tasks = ({ state, setState }) => {
  const {
    areaRef,
    newTask,
    addNewTask,
    newTaskContentChange,
    newTaskFileChange,
    areaEditRef,
    editedTask,
    editedTaskContentChange,
    editedTaskFileChange,
    setEditedTask,
    deleteTask,
    deleteImage,
    saveEditedTask,
  } = useTasks(state, setState);

  return (
    <>
      {state.loading &&
        <Loader>ŁADOWANIE ...</Loader>}
      {state.loggedIn &&
        <FormAddNewTask
          newTask={newTask}
          areaRef={areaRef}
          addNewTask={addNewTask}
          newTaskContentChange={newTaskContentChange}
          newTaskFileChange={newTaskFileChange}
          state={state}
        />}
      <TaskContainer>
        {state.tasks.map((task) =>
          <ItemsContainer key={task._id}>
            {editedTask.id === task._id ? <Textarea
              ref={areaEditRef}
              type="text"
              name="textarea"
              value={editedTask.content}
              onChange={editedTaskContentChange}
            /> : <p>{task.content}</p>}
            {<Image task={task} editedTaskId={editedTask.id} editImage={editedTask.image} />}
            {state.loggedIn &&
              <>
                {editedTask.id ?
                  <>
                    <InputFile type="file" onChange={(event) => editedTaskFileChange(event, task._id)} disabled={editedTask.id !== task._id} />
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
                      ...editedTask, id: task._id, content: task.content
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