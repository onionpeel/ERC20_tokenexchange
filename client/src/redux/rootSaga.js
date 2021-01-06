import { all } from 'redux-saga/effects';
import { watchInitializeSaga } from './initialize/initializeSaga';
import { watchUnsubscribeSaga } from './initialize/initializeSaga';

export function* rootSaga() {
  yield all([
    watchInitializeSaga(),
    watchUnsubscribeSaga()
  ]);
};
