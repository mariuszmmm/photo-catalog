import { useState } from 'react';
import Navigation from './Navigation';
import Container from '../common/Container';
import Header from '../common/Header';
import Items from './Items';
import SearchItems from './Items/SearchItems';

const App = () => {
  const [state, setState] = useState({
    loading: true,
    username: null,
    isAdmin: false,
    isLoggedIn: false,
    sessionTime: null,
    remainingSessionTime: 0,
    items: [],
    filter: false,
    filteredItems: [],
  });

  return (
    <>
      <Navigation
        state={state}
        setState={setState}
      />
      <SearchItems state={state} setState={setState} />
      <Container>
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
