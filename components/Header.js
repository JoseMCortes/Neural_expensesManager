import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

// Common header component to be included in the pages independently
export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">ExpensesManager</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Expenses</a>
        </Link>
        <Link route="/expenses/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
