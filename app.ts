import express, { json } from "express"
import mongoose from "mongoose"

import routes from "./routes"

const app = express()

const url = "mongodb://127.0.0.1/muber"
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})

app.use(json())
routes(app)

export default app
