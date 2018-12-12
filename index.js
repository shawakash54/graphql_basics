import {PORT} from './lib/constants'
import express from 'express'
import graphqlHTTP from 'express-graphql'

const app = express()

app.use('/graphql', graphqlHTTP({
  
}))

app.listen(PORT,()=>{
  console.log(`App is listening on port ${PORT}`)
})
