const TokenExchange = artifacts.require('TokenExchange');
const FunToken = artifacts.require('FunToken');
const Web3 = require('Web3');

contract('TokenExchange contract', async ([deployer, buyer]) => {
  let funToken, tokenExchange;

  before(async () => {
    funToken = await FunToken.new(Web3.utils.toWei('100000', 'ether'));
    tokenExchange = await TokenExchange.new(funToken.address, '100')
    await funToken.transfer(tokenExchange.address, Web3.utils.toWei('100000', 'ether'));
  });

  describe('TokenExchange deploy', () => {
    it('a new TokenExchange contract should be created', async () => {
      assert(tokenExchange.address !== '', 'tokenExchange should have an address');
      assert(tokenExchange.address !== undefined, 'tokenExchange should have an address');
      assert(tokenExchange.address !== null, 'tokenExchange should have an address');
      assert(tokenExchange.address.length > 0, 'tokenExchange should have an address');
    });

    it('TokenExchange exchangeRate should be set to 100', async () => {
      const exchangeRate = await tokenExchange.exchangeRate();
      assert.equal(exchangeRate, 100, 'exchangeRate is 100');
    });

    it('TokenExchange balance should be 100000 * 10**18', async () => {
      const balance = await funToken.totalSupply();
      assert.equal(Web3.utils.fromWei(balance, 'ether'), 100000);
    });
  });

  describe('TokenExchange contract: buyTokens()', () => {
    it('user can purchase 200 tokens at the exchangeRate', async () => {
      await tokenExchange.buyTokens({from: buyer, value: 2});
      const buyerBalance = await funToken.balanceOf(buyer);
      assert.equal(buyerBalance, Web3.utils.toWei('200', 'ether'));
    });

    it('A BoughtTokens event should be emitted', async () => {
      const receipt = await tokenExchange.buyTokens({from: buyer, value: 2});
      console.log(receipt.logs[0].args)
      const event = await tokenExchange.BoughtTokens((error, result) => console.log(result));
    });
  });
});
