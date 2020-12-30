pragma solidity ^0.7.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FunToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("Fun Token", "FUN") {
    _mint(msg.sender, initialSupply * 10**18);
  }
}
