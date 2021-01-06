import {
  SET_USER_BALANCE,
  LOADING_USER_BALANCE
} from '../types';

export const setUserBalance = userBalance => ({
  type: SET_USER_BALANCE,
  payload: userBalance
});

export const loadingUserBalance = () => ({
  type: LOADING_USER_BALANCE
});
