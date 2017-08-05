pragma solidity ^0.4.4;

contract Coin {

  string public side;

  function Coin (string coinSide) {
    side = coinSide;
  }
}