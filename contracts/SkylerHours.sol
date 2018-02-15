pragma solidity ^0.4.4;

import './zeppelin/ownership/Ownable.sol';

contract SkylerHours is Ownable {

    struct hourToken {
       bytes32 key;
       bool unredeemed;
    }
    
    bytes32[] allHours;
    
    mapping (bytes32 => hourToken) public keyToToken;

    function createToken(bytes32 _str) public {
        bytes32 hashKey = keccak256(_str);
        keyToToken[hashKey].key = hashKey;
        keyToToken[hashKey].unredeemed = true;
        allHours.push(hashKey);
    }
    
    function redeemToken(bytes32 _str) public {
        bytes32 hashKey = keccak256(_str);
        keyToToken[hashKey].unredeemed = false;
    }
    
    function checkToken(bytes32 _str) public view returns (bool) {
        bytes32 hashKey = keccak256(_str);
        return keyToToken[hashKey].unredeemed;
    }
    
    function getTokensList() public view returns (bytes32[]) {
        return allHours;
    }

}