import { Form, Button, Row, Col } from 'react-bootstrap';

export const SellForm = () => {
  return (
    <div>
      <Row>
        <Col>
          <div className="d-flex justify-content-center mt-3 mb-3">
            <Form inline>
              <Form.Label htmlFor="amount" style={{fontSize: '1.75em'}}>
                Amount of FUN tokens to sell:
              </Form.Label>
              <Form.Control
                className="ml-2"
                id="amount"
                placeholder="0"
                style={{backgroundColor: "#f5e1fa"}}
              />
            </Form>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center mb-4">
          <div style={{fontSize: "1.75em"}}>
            XXXX ETH
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center mb-3">
          <Button variant='secondary' type="submit">Sell tokens</Button>
        </Col>
      </Row>
    </div>
  );
};
