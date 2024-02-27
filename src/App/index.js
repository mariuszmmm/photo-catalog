import { useState } from 'react';
import Navigation from './Navigation';
import Container from '../common/Container';
import Header from '../common/Header';
import Tasks from './Tasks';

const App = () => {
  const [state, setState] = useState({
    loading: true,
    loggedIn: false,
    tasks: []
  });

  return (
    <>
      <Navigation
        state={state}
        setState={setState}
      />
      <Header>Lista zadań</Header>
      <Container>
        <Tasks
          state={state}
          setState={setState}
        />
      </Container>
    </>
  );
};

export default App;
