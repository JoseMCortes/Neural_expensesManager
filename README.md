# Neural_expensesManager
Solidity project to manage company Budgets and Expenses contributed by different departments. 
 
## Technology stack:

* Javascript: language to create some base UI and test tasks
* React: used with Javascript to create the UI to interact with Ethereum through Web3
* Web3: used to perform communication actions from/to javascript from/to Ethereum
* Solidity: Ethereum contracts language
* Metamask: Chrome plugin to manage the accounts
* Infura: used to access the first nodes of the Rinkeby network.
* Ganache: local network to launch the Unit/Integration tests of the Solidity contracts
* Mocha: framework to execute the Unit/Integration test cases
* Node: environment used to launch the Javascript tasks
* Truffle: basic usage for testing purposes
* Semantic-ui: UI Tools for React to create nice UIs
* Next-routes: routing tool to perform navigation operations in the React project and share data 

## Usage and deployment:

## Raffle notes:

* install metamask Chrome plugin to manage accounts 
* sudo npm install -g truffle (installs truffle)
* npm install --save solc  (installs solidity compiler)
* node compile.js (executes the js file)
* npm install --save ganache-cli mocha solc fs-extra web3@1.0.0-beta.26
* npm run test (executs the mocha tests in the test folder)
* npm install --save truffle-hdwallet-provider (installs provider to acces first node in Network).Note: we found an issue related to the last versions of truffle that performs a huge amount of gas and in some cases the deployment will return an "UnhandledPromiseRejectionWarning: error: the contract couldn't be stored, please check your gas limit". In that case uninstall the last version of the truffle-hdwallet-provider and use 0.0.3 with:

* npm uninstall truffle-hdwallet-provider
* npm install --save truffle-hdwallet-provider@0.0.3
* node deploy.js (executes deploy and returns the contract address)

## React:

* npm install --save next@4.1.4 react react-dom
* npm run dev  (makes the server available in http://localhost:3000/show)
* npm install --save semantic-ui-react (installs the code)
* npm install --save semantic-ui-css (installs the css, it can be also linked in each page as an alternative)
* npm install --save next-routes (includes routes.js inside the project to map the routes to URLs)
