pragma solidity ^0.4.11;

contract Transaction {

   mapping (address => uint256) public balances;
   uint public constant price = 1 ether;
   event LogTransfer(address sender, address to, uint amount, uint productId);
    
    function deposit(uint amount) payable  {
        if (msg.value != (amount * price)) {
            throw;
        }
        balances[msg.sender] += amount;
    }

    function withdraw(uint amount) {
        if (balances[msg.sender] < amount) {
            throw;
        }
        balances[msg.sender] -= amount;
        msg.sender.transfer(amount);
    }

    function transfer(address to, uint amount, uint productId) {
        if (balances[msg.sender] < amount) {
            throw;
        }
        balances[msg.sender] -= amount;
        to.transfer(amount * price);
        LogTransfer(msg.sender, to, amount, productId);
    }
    
}