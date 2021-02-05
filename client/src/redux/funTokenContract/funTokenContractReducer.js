import { FUN_TOKEN_CONTRACT } from '../types';

const initialState = null;

export const funTokenContractReducer = (state = initialState, action) => {
  switch (action.type) {
    case FUN_TOKEN_CONTRACT:
      return action.payload;

    default:
      return state;
  }
};
