// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract lottery{
    address public manager;
    address[] public players;

    constructor(){
        manager = msg.sender;
    }

    modifier restricted(){
        require(msg.sender == manager, "You are not the Manager");
        _;
    }

    function addPlayer() public payable{
        require(msg.value > 0.01 ether, "required atleast 0.01 ether to enter in game");
        players.push(msg.sender);
    }

    function random() public view returns(uint){
        uint source = block.difficulty + block.timestamp;
        return uint(keccak256(abi.encodePacked(source)));
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function pickWinner() public restricted {
        
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }


    function getPlayers() public view returns(address[] memory){
        return players;
    }

}
