import { useState } from 'react';
import Navigation from './Navigation';
import Container from '../common/Container';
import Header from '../common/Header';
import Tasks from './Tasks';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Navigation
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Container>
        <Header>{loading ? "Ładowanie ..." : "Lista zadań"}</Header>
        <Tasks
          loading={loading}
          setLoading={setLoading}
          state={state}
          setState={setState}
          loggedIn={loggedIn}
        />
      </Container>
    </>
  );
};

export default App;
