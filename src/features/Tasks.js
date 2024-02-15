import Button from "../common/Button";
import ItemsContainer from "../common/ItemsContainer";
import Textarea from "../common/Textarea";
import useTasks from "./useTasks";

const Tasks = ({ loggedIn }) => {
  const {
    areaRef,
    newTask,
    state,
    inputHandler,
    addNewTask,
    deleteClick
  } = useTasks();

  return (
    <form onSubmit={addNewTask}>
      {loggedIn &&
        <ItemsContainer>
          <Textarea
            ref={areaRef}
            autoFocus
            type="text"
            name="textarea"
            value={newTask}
            onChange={inputHandler}
          />
          <Button type="onSumbit">Dodaj</Button>
        </ItemsContainer>
      }
      {state.map((note, index) =>
        <ItemsContainer key={note.id}>
          <p>{index + 1}. {note.content}</p>
          {loggedIn &&
            <Button onClick={() => deleteClick(note.id)}>Usuń</Button>
          }
        </ItemsContainer>
      )}
    </form>
  )
};

export default Tasks;