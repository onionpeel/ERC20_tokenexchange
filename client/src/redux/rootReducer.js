import { combineReducers } from 'redux';
import { userBalanceReducer } from './userBalance/userBalanceReducer';
import { transactionFormReducer } from './transactionForm/transactionFormReducer';
import { tokenExchangeContractReducer } from './tokenExchangeContract/tokenExchangeContractReducer';
import { funTokenContractReducer } from './funTokenContract/funTokenContractReducer';

export const rootReducer = combineReducers({
  userBalance: userBalanceReducer,
  transactionForm: transactionFormReducer,
  tokenExchangeContract: tokenExchangeContractReducer,
  funTokenContract: funTokenContractReducer
});
