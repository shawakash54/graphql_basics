# GraphQL
With GraphQL we don't need to have multiple end points for a particular resource depending on a client.
Concept used by NetFlix was to have a backends for frontends. It can now be replaced by a single endpoint - /graphql
We also don't need to make multiple requests for resources anymore. We can fetch in one request only.
Also, there's no need to fetch redundant data anymore, we can only fetch data we want to have.
Since it also exposes a documentation for the resources available and the various types available under it, it is much easier for the
frontend developers to dive in.

GraphQL is a facade infront of our databases, cache, and services. The difficulty of microservices architecture can be well hidden behind
a single interface.

#### Node version used by me: 8.11.3
#### Express version used by me: 4.16.4
#### GraphQL version used by me: 14.0.2

## We need to describe the schemas for GraphQL. Schemas are present in [app/schemas] folder

Schema is about describing types and the relationships between the types. Other task of the schema file is to define
*root queries*.
Root queries are basically how we define that the user can jump into the graph and the graph data
There will be separate root query for getting an author details, book details, all author, all book details. All of them will be defined in the schema.


## Type Relations
Type relations is bascially telling GraphQL the exact relations between the different types. It is to establish relations between different
GraphQLObject type. Like in case, a book has an author and a author has many books.


## Please create environment variables for your mongodb username and passoword. Environment variables used are:
 username: GRAPHQL_MONGODB_USER
 password: GRAPHQL_MONGO_PASSWORD

## Mutations in GraphQL
Mutation are like adding data, editing data, deleting data.

For mutations, queries will be like:

mutation{
  addAuthor(name:"Shaw", age: 23){
    name
    age
  }
}
