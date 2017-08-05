var Coin = artifacts.require("./Coin.sol");
var FlipCoin = artifacts.require("./FlipCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(Coin);
  deployer.deploy(FlipCoin);
};
