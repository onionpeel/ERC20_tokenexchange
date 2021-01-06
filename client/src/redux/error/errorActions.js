import {
  SET_ERROR,
  CLEAR_ERROR
} from '../types';

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error.toString()
});

export const clearError = () => ({
  type: CLEAR_ERROR
});
