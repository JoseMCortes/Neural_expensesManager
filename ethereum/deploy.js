// Script to deploy the object in Rinkey network

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/ExpenseFactory.json');

const provider = new HDWalletProvider(
// use your BIP39 mnemonic, mine is too personal :)
'https://rinkeby.infura.io/...' // Use Infure to get the first node to enter Rinkeby
);

const web3 = new Web3(provider);

const deploy =  async() => {
    accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({gas: '1000000', from: accounts[0]});
    console.log('Contract deployed to: ', result.options.address);

};

deploy();
