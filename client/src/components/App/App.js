import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { Header } from '../Header/Header';
import { ExchangeRate } from '../ExchangeRate/ExchangeRate';
import { TransactionForm } from '../TransactionForm/TransactionForm';
import { initialize, unsubscribe } from '../../redux/initialize/initializeAction';
import './App.css';

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
        <ExchangeRate />
        <TransactionForm />
      </Container>
    </div>
  );
}

export default App;
