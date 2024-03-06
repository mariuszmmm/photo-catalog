import { useState } from "react";
import { Nav, LogInfo } from "./styled";
import { ChangePasswordButton } from "./ChangePasswordButton";
import { AddUserForm } from "./AddUserForm";
import { LogInButton } from "./LogInButton";
import { LogOutButton } from "./LogOutButton";
import LogInForm from "./LogInForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { AddUserButton } from "./AddUserButton";
import ButtonsContainer from "../../common/ButtonsContainer";
import DownloadButton from "../../common/DownloadButton";
import { API_URL } from "../api/api";

const Navigation = ({ state, setState }) => {

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showFotoList, setShowFotoList] = useState(false);
  const [list, setList] = useState([]);


  const { isLoggedIn, username } = state;

  return (
    <>
      <Nav>
        {isLoggedIn ?
          <LogInfo>zalogowany: {username}</LogInfo>
          : <LogInfo></LogInfo>}
        <ButtonsContainer>
          {!isLoggedIn && !showLoginForm &&
            <LogInButton setShowLoginForm={setShowLoginForm} />
          }
          {!isLoggedIn && showLoginForm &&
            <LogInForm setState={setState} setShowLoginForm={setShowLoginForm}
            />}
          {isLoggedIn && !showChangePasswordForm && !showAddUserForm &&
            <>
              {state.isAdmin &&
                <>
                  <AddUserButton setShowAddUserForm={setShowAddUserForm} />
                  <DownloadButton href={`${API_URL}/files`} target="_blank">
                      Files list
                    </DownloadButton>
                    <DownloadButton href={`${API_URL}/users`} target="_blank">
                      Users list
                    </DownloadButton>



                </>}
              <ChangePasswordButton setChangePasswordForm={setShowChangePasswordForm} />
              <LogOutButton state={state} setState={setState} setShowLoginForm={setShowLoginForm} />
            </>
          }
          {isLoggedIn && showChangePasswordForm &&
            <ChangePasswordForm setShowChangePasswordForm={setShowChangePasswordForm} state={state} setState={setState} />}
          {isLoggedIn && showAddUserForm && state.isAdmin &&
            <AddUserForm setShowAddUserForm={setShowAddUserForm} />}

        </ButtonsContainer>
      </Nav>
    </>
  )
};

export default Navigation;