const routes = require('next-routes')();

routes.add('/expenses/new', '/expenses/new')
      .add('/expenses/:address', '/expenses/show')
      .add('/expenses/:address/requests','/expenses/requests/index')
      .add('/expenses/:address/requests/new', '/expenses/requests/new')
      ;

module.exports = routes;
