'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

//mongodb automatically creates an id for every document
var bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

//Book is the collection here. This collection will have objects inside it which will be of bookSchema type
exports.default = _mongoose2.default.model('Book', bookSchema);