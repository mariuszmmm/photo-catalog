import Button from "../../common/Button"

export const AddUser = ({ setShowAddUserForm }) => {
  const addUserHandler = () => {
    setShowAddUserForm(true);
  };

  return (
    <Button onClick={addUserHandler}>Add user</Button>
  )
};