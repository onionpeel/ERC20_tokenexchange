const TokenExchange = artifacts.require('TokenExchange');
const FunToken = artifacts.require('FunToken');
const Web3 = require('Web3');

contract('TokenExchange contract', async accounts => {
  it('should deploy the TokenExchange contract', async () => {
    let funToken = await FunToken.new(Web3.utils.toWei('1000', 'ether'));
    let tokenExchange = await TokenExchange.new(funToken.address, '10')
    await funToken.transfer(tokenExchange.address, Web3.utils.toWei('1000', 'ether'));



    // assert(tokenExchange.address !== '');
    // assert(tokenExchange.address !== undefined);
    // assert(tokenExchange.address !== null);
    // assert(tokenExchange.address.length > 0);
    // assert(exchangeRate, 10);
  });
});
