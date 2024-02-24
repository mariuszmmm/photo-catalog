import Button from "../../common/Button";
import ItemsContainer from "../../common/ItemsContainer";
import Textarea from "../../common/Textarea";
import useTasks from "./useTasks";
import Form from "../../common/Form";
import Loader from "../../common/Loader";
import Img from "../../common/Img";
import InputFile from "../../common/InputFile";
import { API_URL } from "../../features/api";


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
      {loading && <Loader />}
      <Form onSubmit={addNewTask}  >
        {loggedIn &&
          <ItemsContainer>
            <Textarea
              ref={areaRef}
              autoFocus
              type="text"
              name="textarea"
              value={newTask}
              onChange={inputNewTaskHandler}
            />
            {image && <Img src={image} alt="image task" />}
            <InputFile type="file" onChange={handleFileChange} />
            <Button type="onSumbit">Dodaj</Button>
          </ItemsContainer>
        }
      </Form >
      <p>Ilość zadań: {state.length}</p>
      {state.map((task, index) =>
        <ItemsContainer key={task._id}>
          <p>{index + 1}.({task._id})</p>
          {editedTaskId === task._id ? <Textarea
            ref={areaEditRef}
            type="text"
            name="textarea"
            value={editContent || setEditContent(task.content)}
            onChange={(event) => setEditContent(event.target.value)}
          /> : <p>{task.content}</p>}
          {editedTaskId === task._id ?
            (editImage ?
              <Img src={editImage} alt="aaa" />
              :
              task.image && <Img src={`${API_URL}/Images/` + task.image} alt="image task" />)
            :
            task.image && <Img src={`${API_URL}/Images/` + task.image} alt="image task" />}
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
    </>
  )
};

export default Tasks;