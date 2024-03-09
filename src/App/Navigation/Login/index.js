import React from 'react';
import { Input } from '../styled';
import Button from '../../../common/Button';
import Form from '../../../common/Form';
import Modal from '../../../common/Modal';
import useLogin from './useLogin';

export const Login = ({ setState, showLoginModal, setShowLoginModal }) => {
  const {
    username,
    password,
    onInputChange,
    login,
  } = useLogin(setState, setShowLoginModal);

  return (
    <>
      <Button onClick={() => setShowLoginModal(true)}>Logowanie</Button>
      {showLoginModal &&
        <Modal>
          <Form onSubmit={login}>
            <div>
              <p>użytkownik:</p>
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
            <Button type="button" onClick={() => setShowLoginModal(false)}>Wróć</Button>
          </Form>
        </Modal >}
    </>
  );
};

export default Login;
