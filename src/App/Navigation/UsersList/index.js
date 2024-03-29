import ButtonsContainer from "../../../common/ButtonsContainer";
import Button from "../../../common/Button";
import { Form } from '../../../common/Modal';
import { Backdrop } from "../../../common/Backdrop";
import { useUsersList } from "./useUsersList";
import { useState } from "react";
import ListContainer from "../../../common/ListContainer";

const UsersList = ({ showBackdrop, setShowBackdrop }) => {
  const [users, setUsers] = useState([])
  const { usersList } = useUsersList(setUsers, setShowBackdrop);

  return (
    <>
      <Button onClick={() => usersList()}>Lista użytkowników</Button>
      {showBackdrop === "usersList" &&
        <Backdrop>
          <Form>
            <b>Lista użytkowników</b>
            <ListContainer>
              <ol>
                {users.map((user) =>
                  <li key={user}>{user}</li>)}
              </ol>
            </ListContainer>
            <ButtonsContainer>
              <Button type="button" onClick={() => setShowBackdrop(null)} >Wróć</Button>
            </ButtonsContainer>
          </Form>
        </Backdrop>}
    </>
  );
};

export default UsersList;