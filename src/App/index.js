import { useState } from 'react';
import Navigation from './Navigation';
import Container from '../common/Container';
import Header from '../common/Header';
import Items from './Items';
import { RemainingSessionTime } from './RemainingSessionTime';

const App = () => {
  const [state, setState] = useState({
    loading: true,
    username: null,
    isAdmin: false,
    isLoggedIn: false,
    sessionTime: null,
    remainingSessionTime: 0,
    items: [],
  });

  return (
    <>
      <Navigation
        state={state}
        setState={setState}
      />
      <Container>
        <RemainingSessionTime state={state} setState={setState} />
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
