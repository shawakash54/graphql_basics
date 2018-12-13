#GraphQL

##We need to describe the schemas for GraphQL. Schemas are present in [app/schemas] folder

Schema is about describing types and the relationships between the types. Other task of the schema file is to define
*root queries*.
Root queries are basically how we define that the user can jump into the graph and the graph data
There will be separate root query for getting an author details, book details, all author, all book details. All of them will be defined in the schema.


##Type Relations
Type relations is bascially telling GraphQL the exact relations between the different types. It is to establish relations between different
GraphQLObject type. Like in case, a book has an author and a author has many books.
