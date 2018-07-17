import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Expense from "../ethereum/expense";

class RequestRow extends Component {
  // Tries to approve the Expense in the behalf of the first account
  onApprove = async () => {
    const expense = Expenses(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await expense.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  // Tries to finalize the request when the Expense has been approved
  onFinalize = async () => {
    const expense = Expense(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await expense.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  // Draws the table with all the requests and approval data
  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
