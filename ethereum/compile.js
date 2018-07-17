// Script to compile the project

const path = require('path'); // Path module, Existing modules
const fs = require('fs-extra');     // File system module, community made with more than fs
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); //extra function in fs-extra in node



const expensePath = path.resolve(__dirname, 'contracts', 'Expense.sol'); // node.js current directory
const source = fs.readFileSync(expensePath, 'utf8');
const output = solc.compile(source, 1).contracts;

console.log(output);
fs.ensureDirSync(buildPath);

// Iterates over the key of the JSON object resulting (contract contains the Key of the object)
for(let contract in output){
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':','')+'.json'),
    output[contract]
  );
}
