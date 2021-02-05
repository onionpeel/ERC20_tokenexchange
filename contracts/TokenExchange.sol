//SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import './FunToken.sol';

contract TokenExchange {
  uint public exchangeRate;
  FunToken public funToken;

  event BoughtTokens(
    address indexed seller,
    address indexed buyer,
    uint indexed tokenAmount,
    uint rate
  );

  event SoldTokens(
    address indexed buyer,
    address indexed seller,
    uint indexed tokenAmount,
    uint rate
  );

  event SenderTokenBalance(
    uint indexed userBalance
  );

  constructor(FunToken _funToken, uint _exchangeRate) {
    exchangeRate = _exchangeRate;
    funToken = _funToken;
  }

  function ethToTokens(uint _wei) private view returns(uint) {
    return _wei * exchangeRate;
  }

  function tokensToWei(uint _tokens) private view returns(uint) {
    return _tokens / exchangeRate * 10**18;
  }

  function buyTokens() public payable {
    uint tokens = ethToTokens(msg.value);
    funToken.transfer(msg.sender, tokens);
    emit BoughtTokens(address(this), msg.sender, tokens, exchangeRate);
    emit SenderTokenBalance(funToken.balanceOf(msg.sender));
  }

  function sellTokens(uint tokens) public returns (uint, uint, uint) {
    uint ethInWei = tokensToWei(tokens);
    uint tokensInWei = tokens*10**18;
    uint sellerBalance = funToken.balanceOf(msg.sender);

    require(sellerBalance >= tokensInWei, 'Seller trying to sell more tokens than are in seller account');

    address addr = address(this);
    uint contractBalance = addr.balance;

    require(contractBalance >= ethInWei, 'Transaction exceeds TokenExchange Ether balance');


    uint contractTokens = funToken.balanceOf(addr);

    // return (tokensInWei, sellerBalance, contractTokens);


    //transfer tokens from msg.sender to tokenExchange contract
    funToken.transferFrom(msg.sender, addr, tokensInWei);

    // uint contractTokens = funToken.balanceOf(msg.sender);
    // return contractTokens;

    // transfer eth from tokenExchange contract to msg.sender
    msg.sender.transfer(ethInWei);

    emit SoldTokens(msg.sender, address(this), tokensInWei, exchangeRate);
    emit SenderTokenBalance(funToken.balanceOf(msg.sender));
  }
}
