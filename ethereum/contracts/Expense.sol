pragma solidity ^0.4.17;

// This contract allows a user to create a Main Expense, where many users
// can contribute (send ether).
// The creator of the Expense can create a Request to expend money and the
// majority of the users should approve it in order to be able to perform
// the transaction


// Factory that deployes Expenses. In case of not using a Factory the cost
// for deploying a new Expense will be charged to the "server" account owner.
// With a Factory pattern, the Expense can be charged to the user that
// invokes de creation of a new Expense
contract ExpensesFactory{
    address[] public deployedExpenses;
    function createExpenses(uint minimumContribution) public{
        // Creates and deployes!!
        address newExpense = new Expenses(minimumContribution, msg.sender);
        deployedExpenses.push(newExpense);
        // Warning: in that method msg.sender will contain the address of the
        // factory instead of the address of the user! (as the Factory is
        // the real creator)
    }

    function getDeployedExpenses() public view returns(address[]){
        return deployedExpenses;
    }
}

contract Expense{

    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; //50% approvals then request is valid
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;

    Request[] public requests;
    uint public approversCount = 0;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    // In Weis!
    // Memory data
    constructor(uint minimum, address creator) public{
        manager = creator; // msg.sender no! en ese caso seria la direccion de la factory!
        minimumContribution = minimum;
    }

    // Allows the user to contribute to the Expense
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    // Allows the user to create a Request for this Expense
    function createRequest(string description, uint value, address recipient) public payable restricted{
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    // Allows the user to approve a Request, needs to be a user that already
    // contributed and didn't approve it yet.
    function approveRequest(uint index) public{
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender]=true;
        request.approvalCount++;
    }

    // Allows a user to approve (if the number of approval reaches the minimum)
    // and completes the Expense request.

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > approversCount / 2);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    // Extra data to minimise the number of interactions, a Struct can be also used.
    function getSummary() public view returns(
        uint, uint, uint, uint, address){
      return (minimumContribution, this.balance, requests.length, approversCount, manager);
    }

    function getRequestCount() public view returns (uint){
      return requests.length;
    }
}
