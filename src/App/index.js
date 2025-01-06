import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Container from '../common/Container';
import Header from '../common/Header';
import Items from './Items';
import SearchItems from './SearchItems';

const App = () => {
  const [showBackdrop, setShowBackdrop] = useState(null);
  const [state, setState] = useState({
    loading: null,
    user: {},
    items: [],
    search: false,
    filteredItems: [],
    visitCount: undefined,
  });

  useEffect(() => {
    document.body.style.overflow =
      showBackdrop ? "hidden" : "auto";
  }, [showBackdrop]);

  return (
    <>
      <Navigation
        state={state}
        setState={setState}
        showBackdrop={showBackdrop}
        setShowBackdrop={setShowBackdrop}
      />
      <SearchItems
        state={state}
        setState={setState}
      />
      <Container>
        <Header>Foto Katalog</Header>
        <Items
          state={state}
          setState={setState}
          showBackdrop={showBackdrop}
          setShowBackdrop={setShowBackdrop}
        />
      </Container>
    </>
  );
};

export default App;
