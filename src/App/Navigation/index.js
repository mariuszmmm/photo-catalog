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

const Navigation = ({ state, setState, showBackdrop, setShowBackdrop }) => {
  const { isLoggedIn, username, isAdmin } = state.user;

  return (
    <Nav>
      {isLoggedIn &&
        <InfoContainer>
          <RemainingSessionTime state={state} setState={setState} />
          <Info>zalogowano: {username}</Info>
          <Info>Ilość elementów: {state.items.length}</Info>
        </InfoContainer>
      }
      <ButtonsContainer>
        {!isLoggedIn &&
          <Login
            setState={setState}
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