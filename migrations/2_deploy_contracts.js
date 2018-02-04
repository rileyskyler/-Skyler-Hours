const Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
const SkylerHours = artifacts.require("./SkylerHours.sol");


module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, SkylerHours);
  deployer.deploy(SkylerHours);
};
