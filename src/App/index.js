import { useState } from 'react';
import Navigation from './Navigation';
import Container from '../common/Container';
import Header from '../common/Header';
import Tasks from './Tasks';
import { API_URL } from '../api';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("API_URL: ", API_URL);

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
