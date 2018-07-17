const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/ExpenseFactory.json");
const compiledExpense = require("../ethereum/build/Expense.json");

let accounts;
let factory;
let expenseAddress;
let expense;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode
    })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods
    .createExpense("100")
    .send({ from: accounts[0], gas: "1000000" });


  const addresses = await factory.methods.getDeployedExpenses().call();
  expenseAddress = addresses[0];

  // Ahora accedemos a la instancia pero ya esta desplegada! Usamos la address!
  expense = await new web3.eth.Contract(
    JSON.parse(compiledExpense.interface),
    expenseAddress
  );
});

describe("Expenses", () => {
  it("deploys a factory and a expense", () => {
    assert.ok(factory.options.address);
    assert.ok(expense.options.address);
  });

  it("marks caller as the expense manager", async () => {
    const manager = await expense.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute money and mark as approved", async () => {
    await expense.methods.contribute().send({
      value: "200",
      from: accounts[1]
    });

    const isContributor = await expense.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await expense.methods.contribute().send({
        value: "50",
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows a manager to make a payment request", async () => {
    await expense.methods
      .createRequest("Buy batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000"
      });

    const request = await expense.methods.requests(0).call();
    assert.equal("Buy batteries", request.description);
  });

  it("processes request", async () => {
    await expense.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await expense.methods
      .createRequest("description", web3.utils.toWei('5', "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await expense.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });

    await expense.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance); // standard javascript
    assert(balance > 104); // Balance account can be changed by other tests!
  });
});
