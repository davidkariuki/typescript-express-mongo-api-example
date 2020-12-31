import express, { json } from "express"
import { connect } from "mongoose"
import { config } from "dotenv"

import routes from "./routes"

config()
const app = express()

if (process.env.NODE_ENV !== "test") {
  connect(process.env.MONGODB_URL as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}

app.use(json())
routes(app)

export default app
