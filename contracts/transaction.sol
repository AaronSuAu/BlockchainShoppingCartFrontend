pragma solidity ^0.4.11;

contract Transaction {

   
   uint public constant price = 1 finney;
   address owner;
   event LogTransfer(address sender, address to, uint amount, uint quantity, uint productId, uint time);
    
    function Transaction(){
        owner = msg.sender;
    }
    
    function transfer(address to, uint amount, uint quantity, uint productId) payable {
        if (msg.value < (amount * price)) {
            throw;
        }
        to.transfer(amount * price);
        LogTransfer(msg.sender, to, amount, quantity, productId, now);
    }
    
    function withdraw() {
        require(msg.sender == owner);
        msg.sender.transfer(this.balance);
    }
    
}