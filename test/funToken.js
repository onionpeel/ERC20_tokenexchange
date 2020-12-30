const FunToken = artifacts.require('FunToken');

contract('FunToken tests', async accounts => {
  it('should deploy the FunToken', async () => {
    const funToken = await FunToken.deployed();
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
    assert.equal(totalSupply, 100 * 10**18);
    assert.equal(msgSenderBalance, 100 * 10**18);
  });
});
