import { combineReducers } from 'redux';
import { userBalanceReducer } from './userBalance/userBalanceReducer';
import { transactionFormReducer } from './transactionForm/transactionFormReducer';
import { tokenExchangeContractReducer } from './tokenExchangeContract/tokenExchangeContractReducer';

export const rootReducer = combineReducers({
  userBalance: userBalanceReducer,
  transactionForm: transactionFormReducer,
  tokenExchangeContract: tokenExchangeContractReducer
});
