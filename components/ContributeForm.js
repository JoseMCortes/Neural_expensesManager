import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Expense from "../ethereum/expense";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false
  };

  // Retrieve the accounts and use the first one to contribute to the
  // expenses.

  onSubmit = async event => {
    event.preventDefault();

    const expense = Expense(this.props.address);

    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await expenses.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
      //Let's update the page when finished!
      Router.replaceRoute(`/expenses/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.state({ loading: false, value: "" });
  };

  // Draws the main Contribution form
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label> Amount to contribute to the Expense Manager </label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Error!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
