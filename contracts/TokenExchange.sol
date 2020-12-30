pragma solidity ^0.7.6;

import './FunToken.sol';

contract TokenExchange {
  uint public exchangeRate;
  FunToken private funToken;

  constructor(FunToken _funToken, uint _exchangeRate) {
    exchangeRate = _exchangeRate;
    funToken = _funToken;
  }

  function buyTokens() public payable {

  }
}

// state variables
// uint public exchangeRate
// FunToken funToken
//
// functions
// public buyTokens
//
//
// public sellTokens
//
// event
// Bought
//   amount
//   buyer msg.sender
//   buyerNewBalance
