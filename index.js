import {PORT} from './lib/constants'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './app/schemas/schema'

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true //to use the graphiql tool when we reach the /graphql link
}))

app.listen(PORT,()=>{
  console.log(`App is listening on port ${PORT}`)
})
