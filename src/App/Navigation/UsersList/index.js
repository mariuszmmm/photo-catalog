import ButtonsContainer from "../../../common/ButtonsContainer";
import Button from "../../../common/Button";
import { Form } from '../../../common/Modal';
import { Backdrop } from "../../../common/Backdrop";
import { useUsersList } from "./useUsersList";
import { useState } from "react";
import { ListContainer } from "../../../common/ListContainer";
import { Loader } from "../../../common/Loader";

const UsersList = ({ showBackdrop, setShowBackdrop }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { usersList } = useUsersList(setUsers, setLoading, setShowBackdrop);

  return (
    <>
      <Button onClick={() => usersList()}>Lista użytkowników</Button>
      {showBackdrop === "usersList" &&
        <Backdrop>
          <Form>
            <Loader loading={loading} />
            <h1>Lista użytkowników</h1>
            <ListContainer>
              {users.length === 0 ?
                loading ? <p>Ładowanie&nbsp;listy&nbsp;...</p> : <span>Brak użytkowników</span>
                :
                !loading && <ul>
                  {users.map((user, index) =>
                    <li key={user}>{index + 1}. {user}</li>)}
                </ul>
              }
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