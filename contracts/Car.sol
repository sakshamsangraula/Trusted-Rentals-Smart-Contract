// state the compiler used

pragma solidity ^0.4.17;

// create a contract(class) called Car

contract Car{
  // declare an instance variable called ownerID

  //Note: since this has a public identifier, a public getter method, ownerID
  // will automatically be created which returns the value of ownerID
  int public ownerID;

  // create a function(constructor) that initializes the instance variables with the argument
  function Car(int firstID) public{
    ownerID = firstID;
  }

  // create a function called setOwnerID that sets the ownerID variable to the new ID passed in
  function setOwnerID (int newID) public{
    ownerID = newID;
  }
}
