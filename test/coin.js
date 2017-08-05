var Coin = artifacts.require("./Coin.sol");

contract('Coin', function(accounts) {
  it("should set side to positive", function() {
    return Coin.new("positive").then(function(instance) {
      return instance.side.call();
    }).then(function(side) {
      assert.equal(side.valueOf(), "positive", "side wasn't set to positive");
    });
  });
});
