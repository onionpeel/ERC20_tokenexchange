import { useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { selectBuyForm } from '../../redux/transactionForm/transactionFormAction';
import { selectSellForm } from '../../redux/transactionForm/transactionFormAction';
import "./ExchangeRate.css";

export const ExchangeRate = () => {
  const dispatch = useDispatch();

  const handleOnClickBuy = () => {
    dispatch(selectBuyForm());
  };

  const handleOnClickSell = () => {
    dispatch(selectSellForm());
  };

  return (
    <Row className="justify-content-center">
      <Col md="9">
        <div className="ExchangeRate">
          <div className="exchangeRate-text">
            1 ETH = 100 FUN Tokens
          </div>
          <div className="d-flex justify-content-around mb-3">
            <Button variant="dark" onClick={handleOnClickBuy}>Buy tokens</Button>
            <Button variant="dark" onClick={handleOnClickSell}>Sell tokens</Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};
