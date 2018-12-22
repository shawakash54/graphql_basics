'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _graphql = require('graphql');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _constants = require('../../lib/constants');

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Dummy Data for graphql
//authorId relates books to authors.
// var dummy_books = [
//   {name: 'Learn', genre: 'cs', id: '1', authorId: '2'},
//   {name: 'practise', genre: 'hw', id: '2', authorId: '3'},
//   {name: 'All over again', genre: 'got', id: '3', authorId: '1'},
//   {name: 'It\'s okay to fail', genre: 'cs', id: '4', authorId: '1'},
//   {name: 'try again', genre: 'hw', id: '5', authorId: '3'},
//   {name: 'Your time is now', genre: 'got', id: '6', authorId: '1'}
// ]


//Dummy data for authors
// var dummy_authors = [
//   {name: 'Shaw', age: 23, id: '1'},
//   {name: 'Kundra', age: 28, id: '2'},
//   {name: 'Luke', age: 58, id: '3'}
// ]


var BookType = new _graphql.GraphQLObjectType({
  name: 'Book',
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLID },
      name: { type: _graphql.GraphQLString },
      genre: { type: _graphql.GraphQLString },
      author: {
        type: AuthorType,
        resolve: function resolve(parent, args) {
          _logger2.default.info('parent for ' + _constants.BOOK_TYPE + ' : ', (0, _stringify2.default)(parent));
          //return _.find(dummy_authors, {id: parent.authorId})
          return _models.Author.findById(parent.authorId);
        }
      }
    };
  }
});

var AuthorType = new _graphql.GraphQLObjectType({
  name: 'Author',
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLID },
      name: { type: _graphql.GraphQLString },
      age: { type: _graphql.GraphQLInt },
      books: {
        type: new _graphql.GraphQLList(BookType), //the type won't be BookType, because an author has a list of BookType and BookType signifies a single book
        resolve: function resolve(parent, args) {
          _logger2.default.info('parent for ' + _constants.AUTHOR_TYPE + ': ', (0, _stringify2.default)(parent));
          //return _.filter(dummy_books, {authorId: parent.id})   //filter is for filering multiple things
          return _models.Book.find({ authorId: parent.id });
        }
      }
    };
  }
});

//Defining root queries. While defining root queries we don't take fields inside a function but only as a parameter,
// as we are not bothered about the ordering of the attributes.

/*
First root query is to get details of a book. Hence the root query is a book [name of the query.] Inside it we mention the type of query we will
be querying. For root query book, we will be querying for BookType. args is to identify what the user has passed, as in what book to query for.
In frontend, it will queried as book(id: '1234'){name, genre}

resolve(parent, args) takes two parameters, parent and args. This is the function we write code to get data from database or from some other source.
parent will come into play when we start relationships between the data. args are the arguments passed to the root query.

To get data about a book,
{
  book(id:"1"){
    name
    genre
    id
  }
}

*/

var RootQuery = new _graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: _graphql.GraphQLID } },
      resolve: function resolve(parent, args) {
        //code to get data from db/ other sources
        //var data = _.find(dummy_books, {id: args.id})
        return _models.Book.findById(args.id, function (err, bookData) {
          if (err) _logger2.default.error('Error: ' + err);
          _logger2.default.info('Fetching ' + _constants.BOOK_TYPE + ' data', (0, _stringify2.default)(bookData));
          return bookData;
        });
        // logger.info(`Fetching ${BOOK_TYPE} data`, JSON.stringify(data))
        // return data
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: _graphql.GraphQLID } },
      resolve: function resolve(parent, args) {
        //code to get author details
        //var data = _.find(dummy_authors, {id: args.id})
        return _models.Author.findById(args.id, function (err, authorData) {
          if (err) _logger2.default.error('Error: ' + err);
          _logger2.default.info('Fetching ' + _constants.AUTHOR_TYPE + ' data', (0, _stringify2.default)(authorData));
          return authorData;
        });
      }
    },
    books: {
      type: new _graphql.GraphQLList(BookType),
      resolve: function resolve(parent, args) {
        //code to get list of all books
        //return dummy_books
        return _models.Book.find({}, function (err, data) {
          if (err) _logger2.default.error('Error: ' + err);
          _logger2.default.info('Fetching all books data', (0, _stringify2.default)(data));
          return data;
        });
      }
    },
    authors: {
      type: new _graphql.GraphQLList(AuthorType),
      resolve: function resolve(parent, args) {
        //code to get list of all authors
        //return dummy_authors
        return _models.Author.find({}, function (err, data) {
          if (err) _logger2.default.error('Error: ' + err);
          _logger2.default.info('Fetching all authors data', (0, _stringify2.default)(data));
          return data;
        });
      }
    }
  }
});

//defining mutations
var Mutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        age: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
      },
      resolve: function resolve(parent, args) {
        //we will store the data in the database.
        var author = new _models.Author({
          name: args.name,
          age: args.age
        });
        _logger2.default.info('addAuthor mutation: ', (0, _stringify2.default)(author));
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        genre: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        authorId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function resolve(parent, args) {
        //we will store the data in the database
        var book = new _models.Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        _logger2.default.info('addBook mutation: ', (0, _stringify2.default)(book));
        return book.save();
      }
    }
  }
});

//export the schema
exports.default = new _graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});