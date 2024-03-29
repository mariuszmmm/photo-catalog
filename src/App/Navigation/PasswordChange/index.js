import Button from "../../../common/Button";
import { Container, Form, Input, Label } from "../../../common/Modal";
import ButtonsContainer from "../../../common/ButtonsContainer"
import { Backdrop } from "../../../common/Backdrop";
import usePasswordChange from "./usePasswordChange";

const PasswordChange = ({ state, showBackdrop, setShowBackdrop }) => {
  const {
    password,
    newPassword,
    setInputChange,
    passwordChange,
  } = usePasswordChange(state, setShowBackdrop);

  return (
    <>
      <Button onClick={() => setShowBackdrop("passwordChange")}>Zmień hasło</Button>
      {showBackdrop === "passwordChange" &&
        <Backdrop>
          <Form onSubmit={passwordChange}>
            <Container>
              <Input
                $hidden
                type="text"
                autoComplete="username"
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
            <Container>
              <Label>nowe hasło:</Label>
              <Input
                type="password"
                placeholder="new password"
                name="newPassword"
                value={newPassword}
                autoComplete="new-password"
                onChange={setInputChange}
              />
            </Container>
            <ButtonsContainer>
              <Button type="submit">Zapisz</Button>
              <Button type="button" onClick={() => setShowBackdrop(null)}>Anuluj</Button>
            </ButtonsContainer>
          </Form>
        </Backdrop>
      }
    </>
  )
};

export default PasswordChange;