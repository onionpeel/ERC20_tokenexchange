pragma solidity ^0.7.6;

import './FunToken.sol';

contract TokenExchange {
  uint public exchangeRate;
  FunToken public funToken;

  event BoughtTokens(
    address seller,
    address indexed buyer,
    uint indexed tokenAmount,
    uint indexed rate
  );

  constructor(FunToken _funToken, uint _exchangeRate) {
    exchangeRate = _exchangeRate;
    funToken = _funToken;
  }

  function ethToTokens(uint _eth) private view returns(uint) {
    return _eth * exchangeRate * 10**18;
  }

  function buyTokens() public payable {
    uint tokens = ethToTokens(msg.value);
    funToken.transfer(msg.sender, tokens);
    emit BoughtTokens(address(this), msg.sender, tokens, exchangeRate);
  }
}

// t = 100 * 1
// 100 = 100 * 1
// 100/eR = e
// public buyTokens
// input: eth value
// 1. convert eth to token amount
// 2. funToken.transfer(msg.sender, tokens)
// 3. emit event(from address, to address, token amount, exchange rate)

// public sellTokens

// event
// Bought
//   amount
//   buyer msg.sender
//   buyerNewBalance
