import { TOKEN_EXCHANGE_CONTRACT } from '../types';

const initialState = null;

export const tokenExchangeContractReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_EXCHANGE_CONTRACT:
      return action.payload;

    default:
      return state;
  }
};
