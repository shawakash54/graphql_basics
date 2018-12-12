const PORT = require('./lib/constants').PORT
const express = require('express')

const app = express()

app.listen(PORT,()=>{
  console.log(`App is listening on port ${PORT}`)
})
