import Button from "../../../common/Button";
import { Container, Form, Input, Label } from "../../../common/Modal";
import ButtonsContainer from "../../../common/ButtonsContainer"
import { Backdrop } from "../../../common/Backdrop";
import usePasswordChange from "./usePasswordChange";
import { useState } from "react";
import { Loader } from "../../../common/Loader";

const PasswordChange = ({ state, showBackdrop, setShowBackdrop }) => {
  const [loading, setLoading] = useState(false);
  const {
    password,
    newPassword,
    setInputChange,
    passwordChange,
  } = usePasswordChange(state, setLoading, setShowBackdrop);

  return (
    <>
      <Button onClick={() => setShowBackdrop("passwordChange")}>Zmień hasło</Button>
      {showBackdrop === "passwordChange" &&
        <Backdrop>
          <Form onSubmit={passwordChange}>
            <Loader loading={loading} />
            <h1>Zmiana hasła</h1>
            <Container>
              <Input
                $hidden
                type="text"
                autoComplete="username"
              />
              <Label>hasło:</Label>
              <Input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                autoComplete="current-password"
                onChange={setInputChange}
                disabled={loading}
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
                disabled={loading}
              />
            </Container>
            <ButtonsContainer>
              <Button type="submit" disabled={loading}>Zapisz</Button>
              <Button type="button" onClick={() => setShowBackdrop(null)}>Anuluj</Button>
            </ButtonsContainer>
          </Form>
        </Backdrop>
      }
    </>
  )
};

export default PasswordChange;