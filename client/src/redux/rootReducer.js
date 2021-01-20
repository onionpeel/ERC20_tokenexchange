import { combineReducers } from 'redux';
import { userBalanceReducer } from './userBalance/userBalanceReducer';
import { transactionFormReducer } from './transactionForm/transactionFormReducer';

export const rootReducer = combineReducers({
  userBalance: userBalanceReducer,
  transactionForm: transactionFormReducer
});
