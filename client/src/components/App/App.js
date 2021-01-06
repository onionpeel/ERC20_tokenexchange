import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { Header } from '../Header/Header';
import { initialize, unsubscribe } from '../../redux/initialize/initializeAction';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize());

    return () => {
      dispatch(unsubscribe());
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <Header />
      </Container>
    </div>
  );
}

export default App;
