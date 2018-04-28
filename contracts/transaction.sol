pragma solidity ^0.4.11;

contract Transaction {

   
   uint public constant price = 1 finney;
   address owner;
   event LogTransfer(address sender, address to, uint amount, uint productId);
    
    function Transaction(){
        owner = msg.sender;
    }
    
    function transfer(address to, uint amount, uint productId) payable {
        if (msg.value < (amount * price)) {
            throw;
        }
        to.transfer(amount * price);
        LogTransfer(msg.sender, to, amount, productId);
    }
    
    function withdraw() {
        require(msg.sender == owner);
        msg.sender.transfer(this.balance);
    }
    
}