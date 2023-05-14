// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// For this project, you will write a smart contract to create your own token on a local HardHat network.
// Once you have your contract, create a front-end that can interact with your smart contract.
// It should be able to display the balance of the connected wallet address. From the front-end,
// the contract owner should be able to mint tokens to a user provided address. Any user should be
// able to burn and transfer tokens.
contract JobCoin {
    mapping(address => uint256) balances;
    address owner;

    event Minted(address account, uint256 amount);
    event Burned(address account, uint256 amount);
    event Transfered(address fromAccount, address toAccount, uint256 amount);

    constructor(){
        owner = msg.sender;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function mint(address toAccount, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can mint tokens");
        balances[toAccount] += amount;
        emit Minted(toAccount, amount);
    }

    function burn(uint256 amount) public {
        require(
            balances[msg.sender] >= amount,
            "Cannot burn tokens more than current balance"
        );
        balances[msg.sender] -= amount;
        emit Burned(msg.sender, amount);
    }

    function transfer(address toAccount, uint256 amount) public {
        require(
            balances[msg.sender] >= amount,
            "Cannot transfer tokens more than current balance"
        );
        balances[msg.sender] -= amount;
        balances[toAccount] += amount;
        emit Transfered(msg.sender, toAccount, amount);
    }
}
