import Button from '../../../common/Button';
import { Container, Form, Input, Label } from '../../../common/Modal';
import { Backdrop } from "../../../common/Backdrop";
import { useUserAdd } from './useUserAdd';
import ButtonsContainer from '../../../common/ButtonsContainer';
import { Loader } from '../../../common/Loader';
import { useState } from 'react';

const UserAdd = ({ showBackdrop, setShowBackdrop }) => {
  const [loading, setLoading] = useState(false);
  const {
    username,
    password,
    userAdd,
    setInputChange
  } = useUserAdd(setLoading, setShowBackdrop);

  return (
    <>
      <Button onClick={() => setShowBackdrop("userAdd")}>Dodaj użytkownika</Button>
      {showBackdrop === "userAdd" &&
        <Backdrop>
          <Form onSubmit={userAdd}>
            {loading && <Loader />}
            <h1>Dodaj użytkownika</h1>
            <Container>
              <Label>login:</Label>
              <Input
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={setInputChange}
                disabled={loading}
              />
            </Container>
            <Container>
              <Label>hasło:</Label>
              <Input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={setInputChange}
                disabled={loading}
              />
            </Container>
            <ButtonsContainer>
              <Button type="submit" disabled={loading}>Zapisz</Button>
              <Button type="button" onClick={() => setShowBackdrop(null)}>Anuluj</Button>
            </ButtonsContainer>
          </Form>
        </Backdrop>}
    </>
  );
};

export default UserAdd;
