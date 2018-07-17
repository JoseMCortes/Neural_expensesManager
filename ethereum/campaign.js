import web3 from './web3';
import Expense from './build/Expense.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Expense.interface), address);
};
