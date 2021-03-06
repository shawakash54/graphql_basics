import {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} from 'graphql'
import _ from 'lodash'
import logger from '../../lib/logger'
import {BOOK_TYPE, AUTHOR_TYPE} from '../../lib/constants'
import {Book, Author} from '../models'


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


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        logger.info(`parent for ${BOOK_TYPE} : `, JSON.stringify(parent))
        //return _.find(dummy_authors, {id: parent.authorId})
        return Author.findById(parent.authorId)
      }
    }
  })
})


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),     //the type won't be BookType, because an author has a list of BookType and BookType signifies a single book
      resolve(parent, args){
        logger.info(`parent for ${AUTHOR_TYPE}: `, JSON.stringify(parent))
        //return _.filter(dummy_books, {authorId: parent.id})   //filter is for filering multiple things
        return Book.find({authorId: parent.id})
      }
    }
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
        //code to get data from db/ other sources
        //var data = _.find(dummy_books, {id: args.id})
        return Book.findById(args.id, (err, bookData) => {
          if (err)
            logger.error(`Error: ${err}`)
          logger.info(`Fetching ${BOOK_TYPE} data`, JSON.stringify(bookData))
          return bookData
        })
        // logger.info(`Fetching ${BOOK_TYPE} data`, JSON.stringify(data))
        // return data
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        //code to get author details
        //var data = _.find(dummy_authors, {id: args.id})
        return Author.findById(args.id, (err, authorData) => {
          if (err)
            logger.error(`Error: ${err}`)
          logger.info(`Fetching ${AUTHOR_TYPE} data`, JSON.stringify(authorData))
          return authorData
        })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //code to get list of all books
        //return dummy_books
        return Book.find({}, (err, data) => {
          if(err)
            logger.error(`Error: ${err}`)
          logger.info(`Fetching all books data`, JSON.stringify(data))
          return data
        })
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        //code to get list of all authors
        //return dummy_authors
        return Author.find({}, (err, data) => {
          if(err)
            logger.error(`Error: ${err}`)
          logger.info(`Fetching all authors data`, JSON.stringify(data))
          return data
        })
      }
    }
  }
})


//defining mutations
const Mutation =  new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        //we will store the data in the database.
        let author = new Author({
          name: args.name,
          age: args.age
        })
        logger.info(`addAuthor mutation: `, JSON.stringify(author))
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        //we will store the data in the database
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        logger.info(`addBook mutation: `, JSON.stringify(book))
        return book.save()
      }
    }
  }
})

//export the schema
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})