import React, { Component } from "react";
import Layout from "../../components/Layout";
import Expense from "../../ethereum/expense";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class ExpenseShow extends Component {
  static async getInitialProps(props) {
    const expense = Expense(props.query.address);
    const summary = await expense.methods.getSummary().call();
    //console.log(summary);
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Addres of manager",
        description:
          "The manager created this expense and can create requests",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution (in wei)",
        description:
          "You must contribute at least with much wei to be a contributor"
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description: "A request triest to withdraw money from "
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Number of people who has donated"
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Expense balance (in ether)",
        description: "How much money left to spend"
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3> Expense Show </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/expenses/${this.props.address}/requests`}>
                <a>
                  <Button primary> View requests </Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ExpenseShow;
