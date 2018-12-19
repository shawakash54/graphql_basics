import cors from 'cors'

//allow cross origin request
const allowCORS = (app) => {
  app.use(cors)
}

export default allowCORS