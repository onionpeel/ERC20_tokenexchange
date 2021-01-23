import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const BuyForm = () => {
  let tokenExchangeContract = useSelector(state => state.tokenExchangeContract);
  let [tokenAmount, setTokenAmount] = useState('');
  let [ethAmount, setEthAmount] = useState(0);

  const handleOnChange = e => {
    console.log(e.target.value)
    setTokenAmount(e.target.value);
    let eth = convertToEth(tokenAmount);
    setEthAmount(eth);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log(ethAmount);
    setTokenAmount('');
    setEthAmount(0);
  };

  const convertToEth = tokens => {
    let eth = tokens / 100;
    return eth.toString();
  };

  const buy = async () => {

  };

  return (
    <div>
      <Row>
        <Col>
          <div className="d-flex justify-content-center mt-3 mb-3">
            <Form inline>
              <Form.Label htmlFor="amount" style={{fontSize: '1.75em'}}>
                Amount of FUN tokens to buy:
              </Form.Label>
              <Form.Control
                className="ml-2"
                id="amount"
                placeholder="0"
                style={{backgroundColor: "#f5e1fa"}}
                value={tokenAmount}
                onChange={handleOnChange}
              />
            </Form>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center mb-4">
          <div style={{fontSize: "1.75em"}}>
            {ethAmount} ETH
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center mb-3">
          <Button variant='secondary' type="button" onClick={handleOnSubmit}>Buy tokens</Button>
        </Col>
      </Row>
    </div>
  );
};
