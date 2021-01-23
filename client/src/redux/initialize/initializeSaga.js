import { put, takeLatest, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Web3 from 'web3';
import FunToken from '../../build/FunToken.json';
import TokenExchange from '../../build/TokenExchange';
import HDWalletProvider from '@truffle/hdwallet-provider';
import { clearError } from '../error/errorActions';
import { setUserBalance } from '../userBalance/userBalanceAction';
import { loadingUserBalance } from '../userBalance/userBalanceAction';

import {
  INITIALIZE_SAGA,
  UNSUBSCRIBE_SAGA,
  TOKEN_EXCHANGE_CONTRACT
} from '../types';
const TEMP_PRIVATE_KEY = 'b5b9941f219d78a896fbdfe571df2e756a846e57bcc853cdd8f445a6b4e5f983';

let provider;
let web3ws;
let funTokenContract;
let tokenExchangeContract;
let deployedTokenExchange;

//creates a web3 instance uses websockts and grants access to the private
//key via HDWalletProvider.  The on() function needs to be added to HDWalletProvider
//because it is not part of HDWalletProvider and is necessary for a websocket connection
const createWeb3ws = () => {
  const wsProvider = new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545");
  HDWalletProvider.prototype.on = wsProvider.on.bind(wsProvider);
  provider = new HDWalletProvider(TEMP_PRIVATE_KEY, wsProvider);
  web3ws = new Web3(provider);
  return true;
};

//create a web3 funToken instance
const initializeFunTokenContract = async () => {
  const funTokenId = await web3ws.eth.net.getId();
  const deployedFunToken = await FunToken.networks[funTokenId];
  funTokenContract = new web3ws.eth.Contract(
    FunToken.abi,
    deployedFunToken.address
  );
  return true;
};
//create a web3 tokenExchange instance
const initializeTokenExchangeContract = async () => {
  const tokenExchangeId = await web3ws.eth.net.getId();
  deployedTokenExchange = await TokenExchange.networks[tokenExchangeId];
  tokenExchangeContract = new web3ws.eth.Contract(
    TokenExchange.abi,
    deployedTokenExchange.address
  );
  return true;
};
//fetch user token balance
const getTokenBalance = async address => {
  let balance = await funTokenContract.methods.balanceOf(address).call();
  balance = web3ws.utils.fromWei(balance, 'ether');
  return balance;
};
//subscribe to any changes in the user token balance
function eventSubscribe() {
  return eventChannel(emitter => {
    let eventSubscription = tokenExchangeContract.events.SenderTokenBalance({fromBlock: "latest"})
      .on('data', event => {
        console.log("event: ", event);
        emitter(event);
      })
      .on('error', (error, receipt) => {
        if(error) {
          console.log(error);
          emitter(error);
        };
        if(receipt) {
          console.log(receipt);
          emitter(receipt);
        };
      });

    const unsubscribe = () => {
      eventSubscription.unsubscribe(error => {
        if (error) console.log(error);
      });
    };

    return unsubscribe;
  });
};


function* initializeSaga () {
  try {
    yield put(loadingUserBalance());
    yield createWeb3ws();
    yield initializeFunTokenContract();
    yield initializeTokenExchangeContract();
    yield put({type: TOKEN_EXCHANGE_CONTRACT, payload: tokenExchangeContract})
    const userBalance = yield getTokenBalance('0x9B178180497DF084C8eB4AA6e267cA25150DA585');
    yield put(setUserBalance(userBalance));

    const channel = yield call(eventSubscribe);
    while(true) {
      let event = yield take(channel);
    };

  } catch (error) {
      console.log(error);
  };
};

function* unsubscribeSaga() {
  try {
    yield provider.engine.stop();
  } catch (error) {
      yield put(clearError(error));
  };
};


export function* watchInitializeSaga() {
  yield takeLatest(INITIALIZE_SAGA, initializeSaga);
};

export function* watchUnsubscribeSaga() {
  yield takeLatest(UNSUBSCRIBE_SAGA, unsubscribeSaga);
};
