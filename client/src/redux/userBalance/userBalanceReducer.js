import {
  SET_USER_BALANCE,
  LOADING_USER_BALANCE
} from '../types';

const initialState = {};

export const userBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_BALANCE:
      return {
        ...state,
        value: action.payload,
        isLoading: false
      };

    case LOADING_USER_BALANCE:
      return {
        ...state,
        value: null,
        isLoading: true
      };

    default:
      return state;
  }
};
