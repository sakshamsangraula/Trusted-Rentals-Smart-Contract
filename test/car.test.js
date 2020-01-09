// this will be used to see if an output is what is expected for it to be
const assert = require('assert');
// bytecode will be deployed to the ganache network
const ganache = require('ganache-cli');
// Web3 will be used to create an instance of it so that we can interact with the network where the contract is deployed
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

// get the interface and bytecode from compile.js file
const { interface, bytecode } = require('../compile');

const INITIAL_ID = 12345;
const NEW_ID = 6789;
let accounts;
let car;

// get a list of accounts and deploy the contract to the network
// each time you want to test the contract

// using async await makes sure that all the accounts
// are fetched before proceeding further
beforeEach(async () => {
  // Use web3 to get a list of all the unlocked accounts
  accounts = await web3.eth.getAccounts();

  // Use the first account in the list to deploy the contract
  // by creating an instance of the contract, sending the bytecode
  // along with the required ID parameter and using the first
  // account to send some gas to deploy the contract
car = await new web3.eth.Contract(JSON.parse(interface))
.deploy({data: bytecode, arguments: [INITIAL_ID]})
.send({from: accounts[0], gas: '1000000'});

});

// use the describe keyword to group it statements
describe('Inbox', ()=> {
  it('deploys a contract', () => {
assert.ok(car.options.address);
  });

// call the ownerID method and check if the ID that is returned
// is the same as the initial ID passed in to the constructor
  it('passed in a default message in the constructor', async() => {
    const returnedID = await car.methods.ownerID().call();
    assert.equal(returnedID, INITIAL_ID)
  });

// set a new ID to ownerID by calling the setOwnerID function and since we are changing
// data on the blockchain, we are using the first account to do this.Call the ownerID function
// again and test if the ownerID is updated with the new ID
  it('update the ownerID', async()=>{
    await car.methods.setOwnerID(NEW_ID).send({from: accounts[0]});
    const returnedID = await car.methods.ownerID().call();
    assert.equal(returnedID, NEW_ID);
  });
});
