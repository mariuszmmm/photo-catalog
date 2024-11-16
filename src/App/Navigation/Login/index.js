import React, { useState } from 'react';
import { Form, Input } from "../../../common/Modal";
import { Backdrop } from "../../../common/Backdrop";
import Button from '../../../common/Button';
import useLogin from './useLogin';
import { Container, Label } from '../../../common/Modal';
import ButtonsContainer from '../../../common/ButtonsContainer';
import { Loader } from '../../../common/Loader';

export const Login = ({ setState, setSession, showBackdrop, setShowBackdrop }) => {
  const [loading, setLoading] = useState(false);
  const {
    username,
    password,
    onInputChange,
    login,
  } = useLogin(setState, setSession, setLoading, setShowBackdrop);

  return (
    <>
      <Button onClick={() => setShowBackdrop("login")}>Logowanie</Button>
      {showBackdrop === "login" &&
        <Backdrop>
          <Form onSubmit={login}>
            <Loader loading={loading} />
            <h1>Zaloguj się</h1>
            <Container>
              <Label>login:</Label>
              <Input
                type="text"
                placeholder="username"
                name="username"
                value={username}
                autoComplete="username"
                onChange={onInputChange}
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
                autoComplete="current-password"
                onChange={onInputChange}
                disabled={loading}
              />
            </Container>
            <ButtonsContainer>
              <Button type="submit" disabled={loading}>Zaloguj</Button>
              <Button type="button" onClick={() => setShowBackdrop(null)}>Wróć</Button>
            </ButtonsContainer>
          </Form>
        </Backdrop >}
    </>
  );
};

export default Login;
