const path = require('path');
const fs = require('fs');
const solc = require('solc');

// get the path to the carcontract.sol file by going through the current directory,
// contracts directory and accessing the carcontract.sol file
 // set it to the carContractPath variable
const carPath = path.resolve(__dirname, 'contracts', 'Car.sol');

 // set source to the source code of the contract by using fs to read it from the contract
const source = fs.readFileSync(carPath, 'utf8');

// export the compiled code(that contains the bytecode and ABI) so that it can be used by other files in this project
module.exports = solc.compile(source, 1).contracts[':Car'];
