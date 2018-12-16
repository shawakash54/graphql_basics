import mongoose from 'mongoose'

const Schema = mongoose.Schema

//creating authorSchema
const authorSchema = new Schema({
  name: String,
  age: String
})

export default mongoose.model('Author', authorSchema)