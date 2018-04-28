pragma solidity ^0.4.11;

contract Transaction {

   
   uint public constant price = 1 finney;
   event LogTransfer(address sender, address to, uint amount, uint productId);
    
    function transfer(address to, uint amount, uint productId) payable {
        if (msg.value < (amount * price)) {
            throw;
        }
        to.transfer(amount * price);
        LogTransfer(msg.sender, to, amount, productId);
    }
    
}