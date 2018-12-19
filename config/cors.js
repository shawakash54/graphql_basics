import cors from 'cors'

//allow cross origin request
export default allowCORS = (app) => {
  app.use(cors)
}