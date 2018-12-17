import {PORT} from './lib/constants'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './app/schemas/schema'
import mongoose from './config/database'
import logger from './lib/logger'

const app = express()

mongoose.connection.once('open', ()=>{
  logger.info(`Connection to database successful`)
})

app.use('/' || '/graphql', graphqlHTTP({
  schema,
  graphiql: true //to use the graphiql tool when we reach the /graphql link
}))

app.listen(process.env.PORT || PORT,()=>{
  console.log(`App is listening on port ${PORT}`)
})
