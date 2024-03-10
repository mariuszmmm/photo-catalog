import { useEffect, useState } from "react";
import { Nav, Info } from "./styled";
import ButtonsContainer from "../../common/ButtonsContainer";
import FilesListLink from "./FilesListLink";
import Login from "./Login";
import UserAdd from "./UserAdd";
import PasswordChange from "./PasswordChange";
import Logout from "./Logout";
import UsersListLink from "./UsersListLink";
import { RemainingSessionTime } from "../RemainingSessionTime";
import InfoContainer from "../../common/InfoContainer";

const Navigation = ({ state, setState }) => {

  const [showLoginBackdrop, setShowLoginBackdrop] = useState(false);
  const [showUserAddBackdrop, setShowUserAddBackdrop] = useState(false);
  const [showPasswordChangeBackdrop, setShowPasswordChangeBackdrop] = useState(false);
  const { isLoggedIn, username, isAdmin } = state;

  useEffect(() => {
    document.body.style.overflow =
      (showLoginBackdrop || showPasswordChangeBackdrop || showUserAddBackdrop) ? "hidden" : "auto"

  }, [showLoginBackdrop, showPasswordChangeBackdrop, showUserAddBackdrop]);

  return (
    <>
      <Nav>
        {isLoggedIn &&
          <InfoContainer>
            <Info>zalogowany: {username}</Info>
            <RemainingSessionTime state={state} setState={setState} />
            <Info>Ilość elementów: {state.items.length}</Info>

          </InfoContainer>
        }
        <ButtonsContainer>
          {!isLoggedIn &&
            <Login
              setState={setState}
              showLoginBackdrop={showLoginBackdrop}
              setShowLoginBackdrop={setShowLoginBackdrop} />
          }
          {isLoggedIn &&
            <>
              {isAdmin &&
                <UserAdd showUserAddBackdrop={showUserAddBackdrop}
                  setShowUserAddBackdrop={setShowUserAddBackdrop} />
              }
              <PasswordChange state={state} showPasswordChangeBackdrop={showPasswordChangeBackdrop} setShowPasswordChangeBackdrop={setShowPasswordChangeBackdrop} />
              {isAdmin &&
                <>
                  <FilesListLink />
                  <UsersListLink />
                </>
              }
              <Logout setState={setState} />
            </>
          }
        </ButtonsContainer>
      </Nav>
    </>
  )
};

export default Navigation;