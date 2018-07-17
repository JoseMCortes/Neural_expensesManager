import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";


class ExpenseIndex extends Component {
  // Esto se ejecuta en el server y devuelve los objetos en el objeto props
  static async getInitialProps() {
    const expenses = await factory.methods.getDeployedExpenses().call();
    return { expenses: expenses };  
  }
  // Esto no se ejecuta por defecto en el server!
  //async componentDidMount(){
  //
  //  }

  renderExpenses() {
    const items = this.props.expenses.map(address => {
      return {
        header: address,
        description: (<Link route={`/expenses/${address}`}><a> View expense </a></Link>),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open expenses</h3>

          <Link route="/expenses/new">
            <a>
              <Button
                floated="right"
                content="Create Expense"
                icon="add"
                primary
              />
            </a>
          </Link>

          {this.renderExpenses()}
        </div>
      </Layout>
    );
  }
}

export default ExpenseIndex;
