import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { SellForm } from '../SellForm/SellForm';
import { BuyForm } from '../BuyForm/BuyForm';
import './TransactionForm.css';

export const TransactionForm = () => {
  let transactionType = useSelector(state => state.transactionForm);

  return (
    <Row className="justify-content-center">
      <Col md="9">
        <div className="TransactionForm">
          {transactionType === "BUY_FORM" ?
            <BuyForm />
            :
            <SellForm />
          }
        </div>
      </Col>
    </Row>
  );
};
