import {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt} from 'graphql'
import _ from 'lodash'
import logger from '../../lib/logger'


//Dummy Data for graphql
var dummy_books = [
  {name: 'Learn', genre: 'cs', id: '1'},
  {name: 'practise', genre: 'hw', id: '2'},
  {name: 'All over again', genre: 'got', id: '3'}
]


//Dummy data for authors
var dummy_authors = [
  {name: 'Shaw', age: 23, id: '1'},
  {name: 'Kundra', age: 28, id: '2'},
  {name: 'Luke', age: 58, id: '3'}
]


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
})


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
})

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        //code to get data from db/ source
        var data = _.find(dummy_books, {id: args.id})
        logger.info(`Fetching Book data`, data)
        return data
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        //code to get author details
        var data = _.find(dummy_authors, {id: args.id})
        logger.info(`Fetching Author data`, data)
        return data
      }
    }
  }
})


//export the schema
export default new GraphQLSchema({
  query: RootQuery
})