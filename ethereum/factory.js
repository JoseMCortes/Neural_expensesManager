import web3 from './web3';
import ExpenseFactory from './build/ExpenseFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(ExpenseFactory.interface),
  '...' // instance address pointing to an existing deployed contract
);

export default instance;
