import { Row, Col, Button } from 'react-bootstrap';
import "./ExchangeRate.css";

export const ExchangeRate = () => {

  return (
    <Row className="justify-content-center">
      <Col md="9">
        <div className="ExchangeRate">
          <div>
            1 ETH = 100 FUN Tokens
          </div>
          <div className="d-flex justify-content-around mb-2">
            <Button variant="dark">Buy tokens</Button>
            <Button variant="dark">Sell tokens</Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};
