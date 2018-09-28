const Express = require('express');
const App = Express();

App.use(require('./users'));
App.use(require('./login'));

module.exports = App;