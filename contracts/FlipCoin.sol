pragma solidity ^0.4.4;

import 'gametoken/contracts/GameToken.sol';
import './Coin.sol';

contract FlipCoin {

  struct sideInfo {
    Coin location;
    address[] player;
    uint256 value;
  }

  address owner;

  string public side;

  sideInfo[2] public sides;

  address[] public winners;

  uint public rewards;

  uint256 constant private MAX_UINT256 =
    0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

  modifier onlyOwner {
    require(owner == msg.sender);
    _;
  }

  function FlipCoin () {
    owner = msg.sender;

    sideInfo memory sidePositive;
    sideInfo memory sideNegative;

    sidePositive.location = new Coin('positive');
    sidePositive.value = 0;
    sides[0] = sidePositive;

    sideNegative.location = new Coin('negative');
    sideNegative.value = 0;
    sides[1] = sideNegative;
  }

  function reward(uint side) onlyOwner {
    if (rewards > 0) {
      throw;
    }

    uint total = 0;

    total += sides[0].value;
    total += sides[1].value;

    rewards = total / sides[side].player.length;

    for (uint i = 0; i < sides[side].player.length; i++) {
      winners.push(sides[side].player[i]);
    }
  }

  function guess(uint side, uint value) {
    if (sides[side].value > MAX_UINT256 - value) {
      throw;
    }

    sides[side].player.push(msg.sender);
    sides[side].value += value;
  }
}