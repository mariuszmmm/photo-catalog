import { useState } from 'react';
import Navigation from './Navigation';
import Container from '../common/Container';
import Header from '../common/Header';
import Items from './Items';
import SearchItems from './SearchItems';

const App = () => {
  const [state, setState] = useState({
    loading: null,
    user: {},
    sessionTime: {},
    items: [],
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
