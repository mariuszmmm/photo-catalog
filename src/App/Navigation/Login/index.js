import React from 'react';
import { Backdrop, Form, Input } from "../../../common/Modal";
import Button from '../../../common/Button';
import useLogin from './useLogin';

export const Login = ({ setState, showBackdrop, setShowBackdrop }) => {
  const {
    username,
    password,
    onInputChange,
    login,
  } = useLogin(setState, setShowBackdrop);

  return (
    <>
      <Button onClick={() => setShowBackdrop("login")}>Logowanie</Button>
      {showBackdrop === "login" &&
        <Backdrop>
          <Form onSubmit={login}>
            <div>
              <p>login:</p>
              <Input
                type="text"
                placeholder="username"
                name="username"
                value={username}
                autoComplete="username"
                onChange={onInputChange}
              />
            </div>
            <div>
              <p>hasło:</p>
              <Input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                autoComplete="current-password"
                onChange={onInputChange}
              />
            </div>
            <Button type="submit">Zaloguj</Button>
            <Button type="button" onClick={() => setShowBackdrop(null)}>Wróć</Button>
          </Form>
        </Backdrop >}
    </>
  );
};

export default Login;
