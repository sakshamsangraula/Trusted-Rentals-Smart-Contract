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
.deploy({data: bytecode, arguments: [12345]})
.send({from: accounts[0], gas: '1000000'});

});

// use the describe keyword to group it statements
describe('Inbox', ()=> {
  it('deploys a contract', () => {
assert.ok(car.options.address);
  });
});
