'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//allow cross origin request
var allowCORS = function allowCORS(app) {
  app.use((0, _cors2.default)());
};

exports.default = allowCORS;