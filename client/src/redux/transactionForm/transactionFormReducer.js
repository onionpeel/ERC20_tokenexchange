import {
  BUY_FORM,
  SELL_FORM
} from '../types';

const initialState = BUY_FORM;

export const transactionFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_FORM:
      return BUY_FORM;
    case SELL_FORM:
      return SELL_FORM;

    default:
      return state;
  };
};
