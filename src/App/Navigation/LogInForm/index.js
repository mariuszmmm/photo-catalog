// Login.js
import React, { useEffect, useState } from 'react';
import { Input } from '../styled';
import Button from '../../../common/Button';
import useFetch from '../../api/useFetch';
import Form from '../../../common/Form';
import Loader from '../../../common/Loader';

export const LogInForm = ({ setState, setShowLoginForm
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectLogin, setIncorrectLogin] = useState(false)

  const {
    logInToServer,
  } = useFetch();

  const userChange = ({ target }) => {
    setIncorrectLogin(false);
    setUsername(target.value)
  }

  const passwordChange = ({ target }) => {
    setIncorrectLogin(false);
    setPassword(target.value)
  }

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await logInToServer(username, password);
      setState((prevState) =>
      ({
        ...prevState,
        isLoggedIn: true,
        username: loginData.username,
        isAdmin: loginData.isAdmin,
        sessionTime: loginData.sessionTime,
      }))
      setShowLoginForm(false);
    } catch (error) {
      const status = error.response.status;
      if (status === 400) {
        alert("WPROWADŹ LOGIN I HASŁO")
      } else if (status === 401) {
        setIncorrectLogin(true)
      } else if (status === 404) {
        alert("UŻYTKOWNIK NIE ZOSTAŁ ZNALEZIONY")
      } else {
        alert("BŁĄD LOGOWANIA")
      };
    }
  };


  return (
    <Loader>
      <Form onSubmit={login}>
        <div>
          <p>user:</p>
          <Input
            type="text"
            placeholder="user"
            value={username}
            autoComplete="username"
            $incorrect={incorrectLogin}
            onChange={userChange}
          />
        </div>
        <div>
          <p>password:</p>
          <Input
            type="password"
            placeholder="password"
            value={password}
            $incorrect={incorrectLogin}
            autoComplete="current-password"
            onChange={passwordChange}
          />
        </div>
        <Button type="submit" >Login</Button>
        <Button type="button" onClick={() => setShowLoginForm(false)} >Anuluj</Button>
      </Form>
    </Loader >
  );
};

export default LogInForm;
