import { useState } from 'react';
import Navigation from './Navigation';
import Container from '../common/Container';
import Header from '../common/Header';
import Items from './Items';

const App = () => {
  const [state, setState] = useState({
    loading: false,
    username: undefined,
    isAdmin: false,
    isLoggedIn: false,
    items: []
  });
  // console.log("state: ", state)

  return (
    <>
      <Navigation
        state={state}
        setState={setState}
      />
      <Header>Foto Katalog</Header>
      <Container>
        <Items
          state={state}
          setState={setState}
        />
      </Container>
    </>
  );
};

export default App;
