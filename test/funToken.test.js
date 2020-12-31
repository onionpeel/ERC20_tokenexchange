const FunToken = artifacts.require('FunToken');
const Web3 = require('web3');

contract('FunToken tests: deploy', async accounts => {
  it('should deploy the FunToken', async () => {
    const funToken = await FunToken.new(Web3.utils.toWei('1000', 'ether'));
    const address = funToken.address;
    const name = await funToken.name.call();
    const symbol = await funToken.symbol();
    const totalSupply = await funToken.totalSupply();
    const msgSenderBalance = await funToken.balanceOf(accounts[0]);

    assert(name.length > 0);
    assert(name !== null);
    assert(name !== undefined);
    assert(name !== '');
    assert.equal(name, 'Fun Token', 'The token name is Fun Token');
    assert.equal(symbol, 'FUN', 'The token symbol is FUN');
    assert.equal(totalSupply, Web3.utils.toWei('1000', 'ether'));
    assert.equal(msgSenderBalance, Web3.utils.toWei('1000', 'ether'));
  });
});
