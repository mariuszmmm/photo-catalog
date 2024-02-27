import { useState } from "react";
import { Nav, Input, LogInfo } from "./styled";
import Button from "../../common/Button";

const Navigation = ({ loggedIn, setLoggedIn, state, setState }) => {
  const [userName, setUserName] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [incorrectLogin, setIncorrectLogin] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false);

  const user = {
    name: "admin",
    password: "admin"
  };

  const handleLogin = () => {
    setShowLoginForm(true);
  };

  const isCorrectLogin = () => {
    const isCorrectLogin = user.name === userName && user.password === password
    setIncorrectLogin(!isCorrectLogin);
    return isCorrectLogin;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    isCorrectLogin() && setState({ ...state, loggedIn: true })
  };

  const handleOnInputUser = ({ target }) => {
    setIncorrectLogin(false);
    setUserName(target.value)
  }

  const handleOnInputPassword = ({ target }) => {
    setIncorrectLogin(false);
    setPassword(target.value)
  }

  const handleLogout = () => {
    setState({ ...state, loggedIn: false });
    setShowLoginForm(false);
  };

  return (
    <Nav>
      {state.loggedIn && <LogInfo>zalogowano : {user.name}</LogInfo>}
      {!state.loggedIn && !showLoginForm &&
        <Button onClick={handleLogin}>Logowanie</Button>
      }
      {!state.loggedIn && showLoginForm &&
        <form onSubmit={handleSubmit}>
          user:
          <Input
            value={userName}
            $incorrect={incorrectLogin}
            onChange={handleOnInputUser}
            onClick={handleOnInputUser}
          />
          password:
          <Input
            value={password}
            $incorrect={incorrectLogin}
            onChange={handleOnInputPassword}
            onClick={handleOnInputUser}
          />
          <Button type="onSumbit" >Zaloguj</Button>
        </form>
      }
      {state.loggedIn &&
        <Button onClick={handleLogout}>Wyloguj</Button>
      }
    </Nav>
  )
};

export default Navigation;