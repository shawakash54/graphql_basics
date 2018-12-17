'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PORT = exports.PORT = 4000;
var BOOK_TYPE = exports.BOOK_TYPE = 'Book Type';
var AUTHOR_TYPE = exports.AUTHOR_TYPE = 'Author Type';

//MongoDB
var MONGODB_USER = exports.MONGODB_USER = process.env.GRAPHQL_MONGODB_USER;
var MONGODB_PASSWORD = exports.MONGODB_PASSWORD = process.env.GRAPHQL_MONGO_PASSWORD;
var DATABASE_CONNECTION_URL = exports.DATABASE_CONNECTION_URL = 'mongodb://' + MONGODB_USER + ':' + MONGODB_PASSWORD + '@ds231374.mlab.com:31374/gql0basics';