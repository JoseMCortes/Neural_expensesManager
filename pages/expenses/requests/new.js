import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Expense from "../../../ethereum/expense";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

// Component to show the form to create a new Request
class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: ""
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  // Performs the execution of createRequest and redirects to the request lists in case of success
  onSubmit = async event => {
    event.preventDefault();

    const expense = Expense(this.props.address);
    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await expense.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/expenses/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  // Draws the form with form data
  render() {
    return (
      <Layout>
        <Link route={`/expenses/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label> Description </label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label> Value in Ether </label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label> Recipient </label>
            <Input
              value={this.state.recipient}
              onChange={event =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Ooops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            {" "}
            Create!{" "}
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
