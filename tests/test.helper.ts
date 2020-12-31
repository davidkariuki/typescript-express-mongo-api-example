import { connect, connection } from "mongoose"

const setupDB = () => {
  beforeAll(async () => {
    const url = "mongodb://127.0.0.1/muber_test"
    await connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
  })

  afterEach(async () => {
    const { drivers } = connection.collections
    await drivers.deleteMany({})
  })

  afterAll(async () => {
    try {
      const { drivers } = connection.collections
      await drivers.drop()
    } catch {
      return
    }
  })
}

export default setupDB
