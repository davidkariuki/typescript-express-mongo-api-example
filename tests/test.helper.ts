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

  beforeEach(async () => {
    const { drivers } = connection.collections
    await drivers.deleteMany({})
    await drivers.createIndex({ location: "2dsphere" })
  })

  afterAll(async () => {
    try {
      const { drivers } = connection.collections
      await drivers.drop()
      await drivers.createIndex({ location: "2dsphere" })
    } catch {
      return
    }
  })
}

export default setupDB
