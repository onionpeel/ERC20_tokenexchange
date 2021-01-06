import {
  INITIALIZE_SAGA,
  UNSUBSCRIBE_SAGA
 } from '../types';

export const initialize = () => ({
  type: INITIALIZE_SAGA
});

export const unsubscribe = () => ({
  type: UNSUBSCRIBE_SAGA
});
