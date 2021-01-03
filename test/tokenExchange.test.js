const TokenExchange = artifacts.require('TokenExchange');
const FunToken = artifacts.require('FunToken');
const Web3 = require('Web3');

contract('TokenExchange contract', async ([deployer, buyer]) => {
  const web3 = new Web3('http://127.0.0.1:9545');
  let funToken, tokenExchange;

  beforeEach(async () => {
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
      await tokenExchange.buyTokens({from: buyer, value: Web3.utils.toWei('2', 'ether')});
      const buyerBalance = await funToken.balanceOf(buyer);
      const tokenExchangeEthBalance = await web3.eth.getBalance(tokenExchange.address);
      assert.equal(buyerBalance, Web3.utils.toWei('200', 'ether'));
      assert.equal(tokenExchangeEthBalance, Web3.utils.toWei('2', 'ether'));
    });

    it('A BoughtTokens event should be emitted', async () => {
      const receipt = await tokenExchange.buyTokens({from: buyer, value: Web3.utils.toWei('2', 'ether')});
      const event = receipt.logs[0].args;
      assert.equal(event.seller, tokenExchange.address);
      assert.equal(event.buyer, buyer);
      assert.equal(event.tokenAmount, Web3.utils.toWei('200'));
      assert.equal(event.rate, '100');
    });
  });

  describe('TokenExchange contract: sellTokens()', () => {
    it('user can sell 100 tokens at exchangeRate', async () => {
      await tokenExchange.buyTokens({from: buyer, value: Web3.utils.toWei('2', 'ether')});
      await funToken.approve(tokenExchange.address, Web3.utils.toWei('100', 'ether'), {from: buyer});

      const receipt = await tokenExchange.sellTokens(100, {from: buyer});
      const event = receipt.logs[0].args;

      let tokenExchangeEthBalance = await web3.eth.getBalance(tokenExchange.address);
      tokenExchangeEthBalance = Web3.utils.fromWei(tokenExchangeEthBalance, 'ether');

      let buyerTokenBalance = await funToken.balanceOf(buyer);
      buyerTokenBalance = Web3.utils.fromWei(buyerTokenBalance, 'ether');

      assert.equal(tokenExchangeEthBalance, '1');
      assert.equal(buyerTokenBalance, '100');
      assert.equal(event.buyer, buyer);
      assert.equal(event.seller, tokenExchange.address);
      assert.equal(Web3.utils.fromWei(event.tokenAmount, 'ether'), '100');
      assert.equal(event.rate, '100');
    });
  });
});
