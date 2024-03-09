import { useEffect, useState } from "react";
import { Nav, LogInfo } from "./styled";
import ButtonsContainer from "../../common/ButtonsContainer";
import FilesListLink from "./FilesListLink";
import Login from "./Login";
import UserAdd from "./UserAdd";
import PasswordChange from "./PasswordChange";
import Logout from "./Logout";
import UsersListLink from "./UsersListLink";

const Navigation = ({ state, setState }) => {

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserAddModal, setShowUserAddModal] = useState(false);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const { isLoggedIn, username, isAdmin } = state;

  useEffect(() => {
    document.body.style.overflow =
      (showLoginModal || showPasswordChangeModal || showUserAddModal) ? "hidden" : "auto"

  }, [showLoginModal, showPasswordChangeModal, showUserAddModal])

  return (
    <>
      <Nav>
        {isLoggedIn && <LogInfo>zalogowany: {username}</LogInfo>}
        <ButtonsContainer>
          {!isLoggedIn &&
            <Login setState={setState} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
          }
          {isLoggedIn &&
            <>
              {isAdmin &&
                <>
                  <UserAdd showUserAddModal={showUserAddModal} setShowUserAddModal={setShowUserAddModal} />
                  <FilesListLink />
                  <UsersListLink />
                </>
              }
              <PasswordChange state={state} showPasswordChangeModal={showPasswordChangeModal} setShowPasswordChangeModal={setShowPasswordChangeModal} />
              <Logout setState={setState} />
            </>
          }
        </ButtonsContainer>
      </Nav>
    </>
  )
};

export default Navigation;