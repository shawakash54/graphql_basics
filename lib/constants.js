export const PORT = 4000;
export const BOOK_TYPE = 'Book Type'
export const AUTHOR_TYPE = 'Author Type'

//MongoDB
export const MONGODB_USER = process.env.GRAPHQL_MONGODB_USER
export const MONGODB_PASSWORD = process.env.GRAPHQL_MONGO_PASSWORD
export const DATABASE_CONNECTION_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@ds231374.mlab.com:31374/gql0basics`
