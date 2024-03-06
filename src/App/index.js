import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Container from '../common/Container';
import Header from '../common/Header';
import Items from './Items';
import { RemainingTime } from './Navigation/RemainingTime';

const App = () => {
  const [state, setState] = useState({
    loading: true,
    username: undefined,
    isAdmin: false,
    isLoggedIn: false,
    items: [],
    sessionTime: undefined,
    remainingTime: 0,
  });

  useEffect(() => {
    const iterval = setInterval(() => {
      if (state.isLoggedIn) {
        const time = Math.floor(new Date().getTime() / 1000);
        const remainingTime = state.sessionTime - time;
        setState((prevState) => ({ ...prevState, remainingTime }))
      } else {
        clearInterval(iterval);
      }
    }, 1000)

    return () => clearInterval(iterval);
  }, [state.isLoggedIn])

  useEffect(() => {
    if (state.remainingTime <= 0) {
      sessionStorage.removeItem("token");
      setState((prevState) => ({
        ...prevState,
        // loading: false,
        isLoggedIn: false,
        username: undefined,
        isAdmin: false,
      }));
      // setShowLoginForm(false);
    }
  }, [state.remainingTime])


  return (
    <>
      <Navigation
        state={state}
        setState={setState}
      />
      <Container>
        <RemainingTime state={state} />
        <Header>Foto Katalog</Header>
        <Items
          state={state}
          setState={setState}
        />
      </Container>
    </>
  );
};

export default App;
