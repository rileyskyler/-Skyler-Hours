pragma solidity ^0.4.4;

// import './zeppelin/ownership/Ownable.sol';

contract SkylerHours  {

    struct user {
        address owner;
        bytes32 name;
        mapping (bytes32 => bool) tokens;
    }

    mapping (bytes32 => user) users;

    function inventToken(bytes32 _name) public {
        require(users[_name].owner == 0);
        users[_name].owner = msg.sender;
    }

    function mintToken(bytes32 _name, bytes32 _rand) public {
        require(users[_name].owner != 0);
        bytes32 key = keccak256(_rand);
        users[_name].tokens[key] = true;
    }
    
    function checkToken(bytes32 _name, bytes32 _rand) public view returns(bool) {
      bytes32 key = keccak256(_rand);
      return users[_name].tokens[key];
    }
}