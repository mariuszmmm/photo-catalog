import { useState } from "react";
import { Nav, LogInfo } from "./styled";
import { ChangePassword } from "./ChangePassword";
import { AddUserForm } from "./AddUserForm";
import { LogIn } from "./LogIn";
import { LogOut } from "./LogOut";
import { RemainingTime } from "./RemainingTime"
import LoginForm from "./LoginForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { AddUser } from "./AddUser";

const Navigation = ({ state, setState }) => {

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const { isLoggedIn, username, remainingTime } = state;

  return (
    <>
      <Nav>
        {isLoggedIn ?
          <LogInfo>{username}</LogInfo>
          : <LogInfo>nie zalogowan</LogInfo>}
        {!isLoggedIn && !showLoginForm &&
          <LogIn setShowLoginForm={setShowLoginForm} />
        }
        {!isLoggedIn && showLoginForm &&
          <LoginForm setState={setState} setShowLoginForm={setShowLoginForm}
          />}
        {isLoggedIn && !showChangePasswordForm && !showAddUserForm &&
          <>
            {state.isAdmin && <AddUser setShowAddUserForm={setShowAddUserForm} />}
            <ChangePassword setChangePasswordForm={setShowChangePasswordForm} />
            <LogOut state={state} setState={setState} setShowLoginForm={setShowLoginForm} />
          </>
        }
        {isLoggedIn && showChangePasswordForm &&
          <ChangePasswordForm setShowChangePasswordForm={setShowChangePasswordForm} state={state} setState={setState} />}
        {isLoggedIn && showAddUserForm && state.isAdmin &&
          <AddUserForm setShowAddUserForm={setShowAddUserForm} />}
      </Nav>
    </>
  )
};

export default Navigation;