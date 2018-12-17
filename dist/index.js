'use strict';

var _constants = require('./lib/constants');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./app/schemas/schema');

var _schema2 = _interopRequireDefault(_schema);

var _database = require('./config/database');

var _database2 = _interopRequireDefault(_database);

var _logger = require('./lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_database2.default.connection.once('open', function () {
  _logger2.default.info('Connection to database successful');
});

app.use('/graphql', (0, _expressGraphql2.default)({
  schema: _schema2.default,
  graphiql: true //to use the graphiql tool when we reach the /graphql link
}));

app.listen(process.env.PORT || _constants.PORT, function () {
  console.log('App is listening on port ' + _constants.PORT);
});