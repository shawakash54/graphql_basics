import mongoose from 'mongoose'
import {DATABASE_CONNECTION_URL} from '../lib/constants'

mongoose.connect(DATABASE_CONNECTION_URL, { useNewUrlParser: true })

export default mongoose