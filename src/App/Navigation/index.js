import { Nav, Info } from "./styled";
import ButtonsContainer from "../../common/ButtonsContainer";
import FilesList from "./FilesList";
import Login from "./Login";
import UserAdd from "./UserAdd";
import PasswordChange from "./PasswordChange";
import Logout from "./Logout";
import UsersList from "./UsersList";
import { RemainingSessionTime } from "../RemainingSessionTime";
import InfoContainer from "../../common/InfoContainer";
import { useState } from "react";

const Navigation = ({ state, setState, showBackdrop, setShowBackdrop }) => {
  const { isLoggedIn, username, isAdmin } = state.user;
  const [session, setSession] = useState({
    sessionTime: {},
  });

  return (
    <Nav>
      {isLoggedIn &&
        <InfoContainer>
          <RemainingSessionTime state={state} setState={setState} session={session} setSession={setSession} />
          <Info>zalogowano: {username}</Info>
          <Info>ilość wejść: {state.visitCount}</Info>
        </InfoContainer>
      }
      <ButtonsContainer>
        {!isLoggedIn &&
          <Login
            setState={setState}
            setSession={setSession}
            showBackdrop={showBackdrop}
            setShowBackdrop={setShowBackdrop}
          />
        }
        {isLoggedIn &&
          <>
            {isAdmin &&
              <UserAdd
                showBackdrop={showBackdrop}
                setShowBackdrop={setShowBackdrop}
              />
            }
            <PasswordChange
              state={state}
              showBackdrop={showBackdrop}
              setShowBackdrop={setShowBackdrop}
            />
            {isAdmin &&
              <>
                <FilesList showBackdrop={showBackdrop} setShowBackdrop={setShowBackdrop} />
                <UsersList showBackdrop={showBackdrop} setShowBackdrop={setShowBackdrop} />
              </>
            }
            <Logout setState={setState} />
          </>
        }
      </ButtonsContainer>
    </Nav>
  )
};

export default Navigation;