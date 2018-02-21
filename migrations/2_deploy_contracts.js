const Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
const ChainHours = artifacts.require("./ChainHours.sol");


module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, ChainHours);
  deployer.deploy(ChainHours);
};
