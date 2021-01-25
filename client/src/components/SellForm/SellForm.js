import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
const USER_ADDRESS = '0x9B178180497DF084C8eB4AA6e267cA25150DA585';
const web3 = new Web3();

export const SellForm = () => {
  let tokenExchangeContract = useSelector(state => state.tokenExchangeContract);
  let [tokenAmount, setTokenAmount] = useState('');
  let [ethAmount, setEthAmount] = useState(0);

  const handleOnChange = e => {
    setTokenAmount(e.target.value);
    let eth = convertToEth(e.target.value);
    setEthAmount(eth);
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    // let weiValue = web3.utils.toWei(ethAmount);
    await 
    await tokenExchangeContract.methods.sellTokens(tokenAmount).send({from: USER_ADDRESS});
    setTokenAmount('');
    setEthAmount(0);
  };

  const convertToEth = tokens => {
    let eth = tokens / 100;
    return eth.toString();
  };

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
          <Button variant='secondary' type="button" onClick={handleOnSubmit}>Sell tokens</Button>
        </Col>
      </Row>
    </div>
  );
};
