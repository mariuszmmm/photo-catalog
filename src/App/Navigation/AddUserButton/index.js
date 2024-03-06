import Button from "../../../common/Button"

export const AddUserButton = ({ setShowAddUserForm }) => {
  const addUserHandler = () => {
    setShowAddUserForm(true);
  };

  return (
    <Button onClick={addUserHandler}>Add user</Button>
  )
};