const FunToken = artifacts.require('FunToken');
const TokenExchange = artifacts.require('TokenExchange');
const Web3 = require('Web3');

module.exports = async deployer => {
  //deply ERC20 token; deploying account is credited with 100000 tokens
  await deployer.deploy(FunToken, Web3.utils.toWei('100000', 'ether'));
  const funToken = await FunToken.deployed();
  //set the exchange rate at 100 tokens per 1 eth
  await deployer.deploy(TokenExchange, funToken.address, '100');
  const tokenExchange = await TokenExchange.deployed();
  //transfer tokens from deployer account to tokenExchange contract
  await funToken.transfer(tokenExchange.address, Web3.utils.toWei('100000', 'ether'));
};
