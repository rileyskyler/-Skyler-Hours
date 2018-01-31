pragma solidity ^0.4.2;

contract SkylerHours is Ownable{

    struct hourToken {
       bool unredeemed;
    }
    
    mapping (bytes32 => hourToken) public hourTokens;
    
    function createToken(string _str) public onlyOwner {
        bytes32 newStr = keccak256(_str);
        hourTokens[newStr].unredeemed = true;
    }
    
    function check(string _str) public view returns (bool) {
        bytes32 newStr = keccak256(_str);
        return hourTokens[newStr].unredeemed;
    }
    
    function redeem(string _str) public returns (bool) {
        bytes32 newStr = keccak256(_str);
        hourTokens[newStr].unredeemed = false;
        return hourTokens[newStr].unredeemed;
    }

}