import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

// Component that shows the form to create Expenses
class ExpenseNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false
  };

  // Event that manages the creation of the expense. In case of success, reroutes
  // to the main pages, otherwise shows an error.
  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createExpense(this.state.minimumContribution).send({
        from: accounts[0]
      });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  // Draws the main form to create an Expense
  render() {
    return (
      <Layout>
        <h3> Create a expense! </h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution </label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>

          <Message
            error
            header="Something went wrong"
            content={this.state.errorMessage}
          />

          <Button loading={this.state.loading} primary>
            Create!{" "}
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default ExpenseNew;
