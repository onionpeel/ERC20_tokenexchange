const FunToken = artifacts.require('FunToken');

module.exports = deployer => {
  deployer.deploy(FunToken, 100);
};
