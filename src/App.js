import { useState } from 'react';
import Navigation from './Navigation';
import Container from './common/Container';
import Header from './common/Header';
import Tasks from './features/Tasks';
import useTasks from './features/useTasks';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { loading } = useTasks();

  return (
    <>
      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Container>
        <Header>{loading ? "Ładowanie ..." : "Lista zadań"}</Header>
        {loading || <Tasks loggedIn={loggedIn} />}
      </Container>
    </>
  );
};

export default App;
