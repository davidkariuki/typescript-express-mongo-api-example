import request from "supertest"
import app from "../../app"
import DriverModel from "../../models/driver"

describe("Drivers controller", () => {
  it("POST to /api/drivers creates a new driver", async () => {
    await request(app)
      .post("/api/drivers")
      .send({ email: "foo@bar.com", driving: true })

    const driver = await DriverModel.findOne({ email: "foo@bar.com" })
    expect(driver).not.toBeNull()
  })
})
