// require the HDWALLET provider to connect to Rinkeby network and unlock the accounts in metamask
// to deploy the contract, require Web3 so we can make an instance of it and connect to the Rinkeby
// network, and lastly import interface(ABI) and bytecode from compile.js files

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// setup the provider to unlock the account in metamask by passing in the mnemonics
// and the link to the rinkeby API
const provider = new HDWalletProvider(
  'THIS LINE SHOULD CONTAIN THE MNEMONICS CREATED IN METAMASK',
  'https://rinkeby.infura.io/v3/84a8cb5bcf2a4baa802e5eb1cd1b8162'

);

// make a new web3 object and connect it to the provider
// so that it has complete access to the Rinkeby network and has
// an account to send ether from
const web3 = new Web3(provider);

let INITIAL_ID = 12345;
// create a function so that we can use async await
const deployToRinkeby = async () =>{
  // get a list of all the accounts
  // the mnemonics from metamask can generate a lot of getAccounts
  // and print a message saying we are deploying from the 1st account followeed by the address of the first account
  const accountsMetaMask = await web3.eth.getAccounts();
  console.log('Deploying this contract from the first account', accountsMetaMask[0]);

  // create a new instance of the contract, and deploy the contract with gas of 1000000 from the first account
  const contractInstance = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments:[INITIAL_ID]})
  .send({ gas: '1000000', from: accountsMetaMask[0]});

  // Print out the address at which the contract was deployed in the Rinkeby network
  console.log('Contract deployed to the address', contractInstance.options.address);

}
// call the deployToRinkeby method
deployToRinkeby();
