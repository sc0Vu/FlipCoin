var GameToken = artifacts.require("gametoken/contracts/GameToken.sol");
var FlipCoin = artifacts.require("./FlipCoin.sol");

contract('FlipCoin', function(accounts) {
  var firstAccount = accounts[0];
  var secondAccount = accounts[1];
  var thirdAccount = accounts[2];

  it("should transfer GameToken and play flip game", function() {
    var token;
    var flipGame;

    return GameToken.new(10000, 'Game Token', 1, 'GT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.transfer(secondAccount, 1000, {from: firstAccount});
    }).then(function() {
      return token.balanceOf(secondAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 1000, "1000 Game Token wasn't in the second account");
    }).then(function() {
      return token.transfer(thirdAccount, 1000, {from: firstAccount});
    }).then(function() {
      return token.balanceOf(thirdAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 1000, "1000 Game Token wasn't in the third account");
    }).then(function () {
      return FlipCoin.new(token.address, {from: firstAccount});
    }).then(function (flipCoin) {
      flipGame = flipCoin;

      return flipGame.guess(0, 10, {from: secondAccount});
    }).then(function () {
      return flipGame.guess(1, 10, {from: thirdAccount});
    }).then(function () {
      return flipGame.reward(1, {from: firstAccount});
    }).then(function () {
      return flipGame.winners(0);
    }).then(function (winner) {
      assert.equal(winner.valueOf(), thirdAccount, "winner must be third account");
    }).then(function () {
      return flipGame.rewards();
    }).then(function (rewards) {
      assert.equal(rewards.valueOf(), 20, "rewards must be 20");
    });
  });
});
