import mongoose from 'mongoose'

const Schema = mongoose.Schema

//mongodb automatically creates an id for every document
const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
})

//Book is the collection here. This collection will have objects inside it which will be of bookSchema type
export default mongoose.model('Book', bookSchema)