pragma solidity ^0.4.4;

import './zeppelin/ownership/Ownable.sol';

contract SkylerHours is Ownable {

    struct hourToken {
       bool unredeemed;
       string name;
    }
    
    mapping (bytes32 => hourToken) public hourTokens;
    
    function createToken(bytes32 _str) public onlyOwner {
        bytes32 hashedStr = keccak256(_str);
        hourTokens[hashedStr].unredeemed = true;
    }
    
    function checkToken(bytes32 _str) public view returns (bool) {
        bytes32 hashedStr = keccak256(_str);
        return hourTokens[hashedStr].unredeemed;
    }
    
    function redeemToken(bytes32 _str) public returns (bool) {
        bytes32 hashedStr = keccak256(_str);
        hourTokens[hashedStr].unredeemed = false;
        return hourTokens[hashedStr].unredeemed;
    }

}