import Button from '../../../common/Button';
import { Container, Form, Input, Label } from '../../../common/Modal';
import { Backdrop } from "../../../common/Backdrop";
import { useUserAdd } from './useUserAdd';
import ButtonsContainer from '../../../common/ButtonsContainer';

const UserAdd = ({ showBackdrop, setShowBackdrop }) => {
  const {
    username,
    password,
    userAdd,
    setInputChange,
  } = useUserAdd(setShowBackdrop);

  return (
    <>
      <Button onClick={() => setShowBackdrop("userAdd")}>Dodaj użytkownika</Button>
      {showBackdrop === "userAdd" &&
        <Backdrop>
          <Form onSubmit={userAdd}>
            <Container>
              <Label>login:</Label>
              <Input
                type="text"
                placeholder="username"
                name="username"
                value={username}
                autoComplete="username"
                onChange={setInputChange}
              />
            </Container>
            <Container>
              <Label>hasło:</Label>
              <Input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                autoComplete="current-password"
                onChange={setInputChange}
              />
            </Container>
            <ButtonsContainer>
              <Button type="submit" >Zapisz</Button>
              <Button type="button" onClick={() => setShowBackdrop(null)} >Anuluj</Button>
            </ButtonsContainer>
          </Form>
        </Backdrop>}
    </>
  );
};

export default UserAdd;
