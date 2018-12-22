import cors from 'cors'

var corsOptions = {
  origin: 'https://graphql-reactjs.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//allow cross origin request
const allowCORS = (app) => {
  app.use(cors(corsOptions))
}

export default allowCORS