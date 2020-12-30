const FunToken = artifacts.require('FunToken');
const TokenExchange = artifacts.require('TokenExchange');
const Web3 = require('Web3');

module.exports = async deployer => {
  await deployer.deploy(FunToken, Web3.utils.toWei('1000', 'ether'));
  const funToken = await FunToken.deployed();

  await deployer.deploy(TokenExchange, funToken.address, '10');
  const tokenExchange = await TokenExchange.deployed();
  await funToken.transfer(tokenExchange.address, Web3.utils.toWei('1000', 'ether'));
};
