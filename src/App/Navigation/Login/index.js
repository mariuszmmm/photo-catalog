import React from 'react';
import { Backdrop, Form, Input } from "../../../common/Modal";
import Button from '../../../common/Button';
import useLogin from './useLogin';

export const Login = ({ setState, showLoginBackdrop, setShowLoginBackdrop }) => {
  const {
    username,
    password,
    onInputChange,
    login,
  } = useLogin(setState, setShowLoginBackdrop);

  return (
    <>
      <Button onClick={() => setShowLoginBackdrop(true)}>Logowanie</Button>
      {showLoginBackdrop &&
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
            <Button type="button" onClick={() => setShowLoginBackdrop(false)}>Wróć</Button>
          </Form>
        </Backdrop >}
    </>
  );
};

export default Login;
