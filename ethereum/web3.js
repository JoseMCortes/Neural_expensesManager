import Web3 from 'web3';

// Windows is availabe on the browser, not in NodeJS. As we use next (on server), Window
// variable is not defined.
// This will be executed the first time in the server (to optimise output) and then in the browser
//const web3 = new Web3(window.web3.currentProvider);

let web3;

// Server or browser?
if(typeof window !== 'undefined' && typeof window.web3!=='undefined'){
  //We are in the browser and Metamask is installed
  web3 = new Web3(window.web3.currentProvider);
}else{
  // We are on the server or not running Metamask. We will use infura to
  // access Rinkeby
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/LOicrBYwat91oGhNLlTO'
  );
  web3 = new Web3(provider);
}


export default web3;
