import { combineReducers } from 'redux';
import { userBalanceReducer } from './userBalance/userBalanceReducer';

export const rootReducer = combineReducers({
  userBalance: userBalanceReducer
});
