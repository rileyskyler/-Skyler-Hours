pragma solidity ^0.4.4;

// import './zeppelin/ownership/Ownable.sol';

contract ChainHours  {

    struct user {
        mapping (bytes32 => bool) tokens;
        address owner;
        bytes32 name;
        bytes32[] tokenList;
    }

    mapping (bytes32 => user) users;

    function inventToken(bytes32 _name) public {
        require(users[_name].owner == 0);
        users[_name].owner = msg.sender;
    }

    function mintToken(bytes32 _name, bytes32 _rand) public {
        bytes32 key = keccak256(_rand);
        require(users[_name].tokens[key] == false);
        require(users[_name].owner == msg.sender);
        users[_name].tokens[key] = true;
        users[_name].tokenList.push(key);
    }
    
    function getTokenList(bytes32 _name) public view returns(bytes32[]){
        return users[_name].tokenList;
    }
    
    function checkToken(bytes32 _name, bytes32 _rand) public view returns(bool) {
      bytes32 key = keccak256(_rand);
      return users[_name].tokens[key];
    }

}